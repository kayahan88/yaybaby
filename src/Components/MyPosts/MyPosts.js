import React, {useEffect, useState} from 'react';
import ImageUploader from 'react-images-upload';
import {useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './MyPosts.css';

const MyPosts = (props) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [isPrivate, setIsPrivate] = useState('true');
    const [posts, setPosts] = useState([]);

    const [editPostView, setEditPostView] = useState('hide');
    const [createPostView, setCreatePostView] = useState('hide');

    const [editingPost, setEditingPost] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedBody, setEditedBody] = useState('');
    const [editedImg, setEditedImg] = useState('');
    const [editedPrivacy, setEditedPrivacy] = useState('');

    const {user} = useSelector((state) => state);
    const {id} = user;
    const editedPostId = editingPost.post_id;


    useEffect(() => {
        if(id){
            axios.get(`/api/posts/${id}`)
                .then(res => {
                    console.log('res.data =', res.data);
                    console.log('this is the user=', user);
                    // dispatch(getUser(res.data))
                    setPosts(res.data)
                })
                .catch(error => {
                    console.log(error) 
                })
        }
    }, [id])

    const toggleEditPostView = () => {
        
        if(editPostView === 'hide'){
            setEditPostView('show')
            
        } else {
            setEditPostView('hide')
            
        }
    };

    const togglePrivacy = () => {
        if(isPrivate === 'true'){
            setIsPrivate('false')
        } else {
            setIsPrivate('true')
        }
    }

    const toggleCreatePostView = () => {
        if(createPostView === 'hide'){
            setCreatePostView('show')
        } else {
            setCreatePostView('hide')
        }
    }

    const cancel = () => {
        setTitle('');
        setBody('');
        setImage('');
        setIsPrivate('true');
        toggleCreatePostView()
        toggleEditPostView()
    }

    function createPost(){
        axios.post('/api/user/post', {id, title, body, image, isPrivate})
        .then(res => {
            console.log('image=', image)
            setPosts(res.data)
        })
    }

    function editPost(editedPostId){
        axios.put('/api/user/post', {editedTitle, editedBody, editedImg, editedPrivacy, id, editedPostId})
        
        .then(res => {
            setPosts(res.data)
            toggleEditPostView()
            console.log('editedTitle=', editedTitle)
            console.log('editedBody=', editedBody)
            console.log('editedImg=', editedImg)
            console.log('editedPrivacy=', editedPrivacy)
            console.log('id=', id)
            console.log('postId=', editedPostId)
            
        })
        .catch(error => {
            console.log(error)
        })
    };

    function handleEdit(postToEdit){
        console.log('postToEdit', postToEdit)
        toggleEditPostView()
        setEditingPost(postToEdit)
    };

    function deletePost(postId){
        axios.delete(`/api/post/${postId}`)
        .then(res => {
            setPosts(res.data)
            
        })
    };

    function logoutUser(){
        axios.post('/api/auth/logout')
        .then(res => {
            console.log('loggin out')
            props.history.push('/')
        })
    }

    return (
        <div id='my-posts-home'>
            {/* <img id='background-image-myposts' src='https://media.istockphoto.com/photos/blurred-home-interior-background-with-couch-picture-id1161472693?k=6&m=1161472693&s=612x612&w=0&h=7HkvWdR81aqkoJOs9-ajSo26CwIvBAWH8mW3rPpxwcs='/> */}
            <div id='edit-post'>
                {editPostView === 'show' ?
                    <div className='edit-a-post'>
                        <button className='cancel' onClick={toggleEditPostView}>Cancel</button>
                        <p className='create-post-title'>Editing: {editingPost.title}</p>
                        <div className='my-posts-new-entry'>
                            <p className='new-entry-title'>Milestone:</p>
                            <p className='new-entry-detail'>Choose one of ours, or create your own!</p>
                            <input defaultValue={editingPost.title} onChange={e => setEditedTitle(e.target.value)}></input>
                        </div>
                        <div className='my-posts-new-entry'>
                            <p className='new-entry-title'>Details:</p>
                            <p className='new-entry-detail'>Include any details you want to remember</p>
                            <input className='big-input' defaultValue={editingPost.body} onChange={e => setEditedBody(e.target.value)}/>
                        </div>
                        <div className='my-posts-new-entry'>
                            <p className='new-entry-title'>Enter an image URL:</p>
                            <input defaultValue={editingPost.img} onChange={e => setEditedImg(e.target.value)}/>
                        </div>
                        <div className='my-posts-new-entry-2'>
                            <p className='new-entry-title'>Public:</p>
                            <p className='new-entry-detail'>Check this box to make your <br></br>post available publicly.</p>
                            <input className='checkbox' type='checkbox' onClick={togglePrivacy}/>
                        </div>
                        <button id='publish-button' onClick={() => editPost(editedPostId)}>Save Changes</button>
                    </div>
                : null}
            </div>
            
        <div className='my-posts-home'> 
            <nav id='my-posts-nav'>
                <div className='profile-box'>
                    <div className='profile-box-links'>
                        
                        <Link to='/editmyprofile'>
                            {user.profile_pic ?
                            <img className='user-profile-pic' src={user.profile_pic} alt='profile-pic'/>
                            :
                            <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg' className='default-profile-pic'/>}
                        </Link>
                        <Link to='/editmyprofile'>
                            <div>
                                <button className='edit-my-profile'>Edit Profile</button>
                            </div>
                        </Link>
                    </div>
                    <p id='current-user'>{user.first_name} {user.last_name}</p>
                    <p className='user-name'>{user.first_name} {user.last_name}</p>
                </div>
            <header className='home-header'>
                <h1 className='yaybaby' >YayBaby</h1>
                {/* <div className='spacer'></div> */}
                <h2 className='page-title'>My Posts</h2>
            </header>
            <div className='link' className='explore'>
                <div className='order-container-2'>
                    
                    
                    <br></br>
                    <Link to='/home'>
                    <span className='milestone-album'>Milestone Album</span>
                    <span className='go-back-home'>Home</span>
                        <img className='album-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm8mpm6yjWzKu2NbFTlbDhrTWjaYsb7K80g&usqp=CAU'/>
                    </Link>
                    
                </div>
                <div className='logout' onClick={() => logoutUser()}>Log Out</div>
            </div>
        </nav>
        
            <div className='order-container-og'>
                <p>Want to save these forever?</p>
                <p>Click below to order a 
                <br></br>
                <span className='milestone-album-og'>Milestone Album</span>
                <br></br> 
                of all your memories and milestones</p>              
                <Link to='/milestonealbum'>
                    <img className='album-img-og' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm8mpm6yjWzKu2NbFTlbDhrTWjaYsb7K80g&usqp=CAU'/>
                </Link>
            </div>
            <div className='order-container'>
                <p>Want to save these forever?</p>
                <p>Click below to order a 
                <br></br>
                <span className='milestone-album'>Milestone Album</span>
                <br></br> 
                of all your memories and milestones</p>              
                <Link to='/milestonealbum'>
                    <img className='album-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm8mpm6yjWzKu2NbFTlbDhrTWjaYsb7K80g&usqp=CAU'/>
                </Link>
            </div>
            {/* <div className='order-container-2'>
                
                <span className='milestone-album'>Milestone Album</span>
                <br></br>
                <Link to='/milestonealbum'>
                    <img className='album-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm8mpm6yjWzKu2NbFTlbDhrTWjaYsb7K80g&usqp=CAU'/>
                </Link>
            </div> */}

        {createPostView === 'hide'
        ?
        <section >
            <div className='add-milestone' onClick={toggleCreatePostView}>
                <p>Add A New Milestone</p>
                <div className='plus'></div>
            </div>
        </section>
        : null}

        {createPostView === 'show'
        ?
        <div className='create-a-post'>
            <button className='cancel' onClick={toggleCreatePostView}>Cancel</button>
            <p className='create-post-title'>Add A New Milestone</p>
            <div className='my-posts-new-entry'>
                <p className='new-entry-title'>Milestone:</p>
                <p className='new-entry-detail'></p>
                <input onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className='my-posts-new-entry'>
                <p className='new-entry-title'>Details:</p>
                <p className='new-entry-detail'>Include any details you want to remember</p>
                <input className='big-input' onChange={e => setBody(e.target.value)}/>
            </div>
            <div className='my-posts-new-entry'>
                <p className='new-entry-title'>Enter an image URL:</p>
                <input onChange={e => setImage(e.target.value)}/>
            </div>
            <div className='my-posts-new-entry-2'>
                <p className='new-entry-title'>Public:</p>
                <p className='new-entry-detail'>Check this box to make your <br></br>post available publicly.</p>
                <input className='checkbox' type='checkbox' onClick={togglePrivacy}/>
            </div>

            <button id='publish-button'onClick={createPost}>Save</button>
        </div>
        : null
    }

{/* 
            <ImageUploader 
            withIcon={true}
            withPreview={true}
            buttonText='Choose images'
            onChange={handleImages}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withLabel={true}
            accept={''}
            /> */}

            <div>
                {id ? 
                posts.map((posts, index) => {
                    const {title, body, image, id} = posts;
                    
                    return(
                        

                        <div id='mapped-post' key={index}>
                            <div id='mapped-post-top'>
                                <section className='top'>
                                    
                                    {posts.profile_pic ?
                                    <img className='user-profile-pic' src={posts.profile_pic} alt='profile-pic'/>
                                    :
                                    <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg' className='default-profile-pic'/>}
                                    <p className='name'>{posts.first_name} {posts.last_name}</p>
                                    <div className='spacer'></div>
                                    <p className='is-private'>{posts.is_private === true ? <p>Private</p> : <p>Public</p>}</p>
                                    <img className='edit-button' src='https://www.clipartkey.com/mpngs/m/208-2084880_pencil-draw-edit-pen-icon-pencil-png-transparent.png' onClick={() => handleEdit(posts)} />
                                    <img className='delete-button' src='https://www.clipartkey.com/mpngs/m/141-1417578_trash-can-png-transparent-images-delete-icon-png.png' onClick={() => deletePost(posts.post_id)}/>
                                </section>
                                    <img className='post-img' src={posts.image} alt='post image'/>
                                    </div>
                                        <section id='caption-container'>
                                        <div className='post-title-home'>
                                        <span className='milestone'>Milestone: {posts.title}</span>
                                        <br></br>
                                        {posts.body}
                                    </div>
                        
                       
                                </section>
                        </div>


                        
                    )
                    
                })
                
                : null}
                
            </div>
        </div>
        </div>
    )

}
export default MyPosts
