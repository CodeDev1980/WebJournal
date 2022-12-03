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
const homePage = require('./controllers/homePage');
const newBlog = require('./controllers/createPost');
const storePost = require('./controllers/storePost');
const blogsPage = require('./controllers/blogsPage');
const singlePost = require('./controllers/singlePost');
const deletePost = require('./controllers/deletePost');
const registerPage = require('./controllers/register');
const storeUser = require('./controllers/storeUser');
const loginPage = require('./controllers/login');
const loginUser = require('./controllers/loginUser');
const profiles = require('./controllers/profiles');
const profile = require('./controllers/profile');
const logoutUser = require('./controllers/logoutUser');

// middleware
const validateMiddleWare = require('./middleware/validate');
const authMiddleWare = require('./middleware/authProtect');
const redirect = require('./middleware/redirectIfUser');

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening')
})

app.get('/', homePage);
app.get('/create', authMiddleWare, newBlog);
app.post('/send/post', validateMiddleWare, storePost);
app.get('/blogs', blogsPage);
app.get('/post/:id', singlePost);
app.get('/delete/:id', deletePost)
app.get('/register',redirect, registerPage);
app.post('/store/user', storeUser);
app.get('/login', redirect, loginPage)
app.post('/login/user', loginUser);
app.get('/profiles', authMiddleWare, profiles);
app.get('/profile/:id', authMiddleWare, profile);
app.get('/logout', logoutUser);

app.use((req, res) => res.render('notFound'))