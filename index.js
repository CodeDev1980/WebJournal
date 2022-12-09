const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(flash());
app.use(expressSession({
    secret: process.env.SECRET
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    autoIndex: true
})
if(mongoose){
    console.log('DB connected')
} else {
    console.log('No DB connected')
}

// routes
const homeController = require('./controllers/homePage');
const aboutController = require('./controllers/aboutPage');
const newBlogController = require('./controllers/createPost');
const storePostController = require('./controllers/storePost');
const blogsController = require('./controllers/blogsPage');
const singlePostController = require('./controllers/singlePost');
const deletePostController = require('./controllers/deletePost');
const registerController = require('./controllers/register');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const profilesController = require('./controllers/profiles');
const singleProfileController = require('./controllers/profile');
const logoutUserController = require('./controllers/logoutUser');

// middleware
const validateMiddleWare = require('./middleware/validate');
const authMiddleWare = require('./middleware/authProtect');
const redirect = require('./middleware/redirectIfUser');

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening')
})

app.get('/', homeController);
app.get('/about', aboutController);
app.get('/create', authMiddleWare, newBlogController);
app.post('/send/post', validateMiddleWare, storePostController);
app.get('/blogs', blogsController);
app.get('/post/:id', singlePostController);
app.get('/delete/:id', deletePostController)
app.get('/register',redirect, registerController);
app.post('/store/user', storeUserController);
app.get('/login', redirect, loginController)
app.post('/login/user', loginUserController);
app.get('/profiles', authMiddleWare, profilesController);
app.get('/profile/:id', authMiddleWare, singleProfileController);
app.get('/logout', logoutUserController);

app.use((req, res) => res.render('notFound'))
