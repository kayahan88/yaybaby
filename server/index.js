require ('dotenv').config();
const express = require('express');
const userCtrl = require('./controllers/users');
const postsCtrl = require('./controllers/posts');
const authCtrl = require('./controllers/auth');
const commentsCtrl = require('./controllers/comments');
const paymentCtrl = require('./controllers/payment');
const emailCtrl = require('./controllers/email');
const massive = require('massive');
const session = require('express-session');

const app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const path = require('path');


app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

//Auth endpoints
app.get('/api/auth/:id', authCtrl.getUser);  
app.post('/api/auth/register', authCtrl.createUser); //register
app.post('/api/auth/login', authCtrl.login); //log in
app.post('/api/auth/logout', authCtrl.logout); //log out

//User endpoints
app.put('/api/users/editprofile', userCtrl.editProfile); //edit profile
app.delete('/api/users/:id', userCtrl.deleteAccount); //delete acc
app.post('/api/sendrequest', userCtrl.sendFriendRequest); //send request
app.put('/api/sendrequest', userCtrl.acceptFriendRequest); //accept request

//Post endpoints
app.get('/api/posts', postsCtrl.getAllPosts); //get all posts
app.get('/api/posts/home', postsCtrl.getHomePosts); //get Home posts
app.get('/api/posts/:id', postsCtrl.getMyPosts); //get My posts
app.get('/api/posts/explore', postsCtrl.getExplorePosts); //get Explore posts
app.post('/api/home/post', postsCtrl.createHomePost); //create home post
app.post('/api/user/post', postsCtrl.createUserPost); //create user post
app.put('/api/home/post', postsCtrl.editHomePost); //edit home post
app.put('/api/user/post', postsCtrl.editUserPost); //edit user post
app.delete('/api/post/:id', postsCtrl.deletePost); //delete post

//Comment endpoints
app.get('/api/comments', commentsCtrl.getAllComments); //get all comments
app.get('/api/comments/:id', commentsCtrl.getPostComments); //get comments on post
app.post('/api/comment', commentsCtrl.createComment); //create comment
app.put('/api/comment/:id', commentsCtrl.editComment); //edit comment
app.delete('/api/comment/:id', commentsCtrl.deleteComment); //delete comment

//Payment endpoint
app.post('/api/payment', paymentCtrl.payment)

//Email endpoint
app.post('/api/email', emailCtrl.email);

app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => console.log(`DB connected and server running on ${SERVER_PORT}`))
})
.catch(err => console.log(err));