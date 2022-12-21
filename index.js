/**
 * express-session
 * Express session allows us to use sessions to 'sign-in' users
 * Creating a user session allows us to authenticate a user, and keep track of what they do 
 * while logged in, as well as serve user specific data. This information is stored
 * in the browser cookies. 
 * 
 * in our middleware, we specify a 'secret string' that signs and encrpyts the session ID cookie shared
 * with the browser 
 * 
 * In the loginUser controller, we set the req.session.userId = user._id, the id of the user
 */

/** npm packages */
const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const validateMiddleware = require('./middleware/postValidation');
const refreshedPage = require('./middleware/refreshedPage');
const expressSession = require('express-session');

/** npm middleware */
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
const app = new express();
app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(expressSession({secret:'keyboard cat'}));
/** Custom Middleware */
app.use(refreshedPage);
app.use('/posts/store', validateMiddleware);

/** Controller */
const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/homePage');
const getPostController = require('./controllers/getPost');
const searchPostController = require('./controllers/searchPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

/** Route Handling */    
app.get('/', homePageController);

app.get('/search', searchPostController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);

app.get('/auth/register', newUserController);

app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);

app.post('/users/login', loginUserController);

app.listen(4000, ()=>{
    console.log("Listening on port 4000...");
});

