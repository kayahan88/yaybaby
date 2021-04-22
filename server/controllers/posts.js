module.exports = {
    getAllPosts: (req, res) => {

    },
    getHomePosts: async (req, res) => {
        const db = await req.app.get('db')
        db.posts.get_home_posts()
        .then(posts => res.status(200).send(posts))
    },
    getMyPosts: async (req, res) => {
        console.log("posts controller!")
        console.log('req.params.id =', req.params.id)
        const {id} = req.params;
        
        const db = await req.app.get('db')
        db.posts.get_my_posts(id)
        .then(posts => res.status(200).send(posts))
    },
    getExplorePosts: (req, res) => {

    },
    createHomePost: async (req, res) => {
        const {id, title, body, img, isPrivate} = req.body;
        const db = await req.app.get('db');
        console.log('createPost hit in postsCtrl')
        db.posts.create_home_post(id, title, body, img, isPrivate)
        .then(post => {
            // console.log('post from createHomePost:', post)
            res.status(200).send(post)
        })
    },
    createUserPost: async (req, res) => {
        const {id, title, body, image, isPrivate} = req.body;
        const db = await req.app.get('db');
        console.log('createPost hit in postsCtrl')
        console.log('image=', image)
        db.posts.create_user_post(id, title, body, image, isPrivate)
        .then(post => {
            // console.log('post from createUserPost:', post)
            res.status(200).send(post)
        })
    },
    
    editHomePost: async (req, res) => {
        const {postId} = req.params;
        const db = await req.app.get('db');
        db.posts.edit_home_post(postId)
        .then(result => {
            res.status(200).send(result)
        })
    },
    editUserPost: async (req, res) => {
        // const {id} = req.session.user;
        const {editedTitle, editedBody, editedImg, editedPrivacy, id, editedPostId} = req.body;
        const db = await req.app.get('db');
        console.log('editUserPost!')
        console.log('id=', id)
        db.posts.edit_user_post(editedTitle, editedBody, editedImg, editedPrivacy, id, editedPostId)
        .then(result => {
            console.log('id=', id)
            console.log('editUserPost result=', result)
            console.log('title=', editedTitle)
            res.status(200).send(result)
        })
    },
    deletePost: async (req, res) => {
        const {id} = req.params;
        const db = await req.app.get('db');
        console.log('deletePost hit in postsCtrl');
        db.posts.delete_post(id)
        .then(result => {
            res.status(200).send(result)
        })
    }
}