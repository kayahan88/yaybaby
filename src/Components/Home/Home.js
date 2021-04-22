import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {getUser} from '../../redux/reducer';
import './Home.css';

const Home = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [img, setImg] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [posts, setPosts] = useState([]);

    const [editingPost, setEditingPost] = useState({});
    const [editedTitle, setEditedTitle] = useState('');
    const [editedBody, setEditedBody] = useState('');
    const [editedImg, setEditedImg] = useState('');
    const [editedPrivacy, setEditedPrivacy] = useState('');

    const [newPostView, setNewPostView] = useState('hide');
    const [editPostView, setEditPostView] = useState('hide');
    const [friendRequestView, setFriendRequestView] = useState('hide');

    const {user} = useSelector((state) => state);
    console.log('this is the user', user)
    const {id} = user;
    const editedPostId = editingPost.post_id;
    // const userProfilePic = user.profile_pic;
    const dispatch = useDispatch();
    const history = useHistory();

    
    useEffect(() => {
        if(id){
            axios.get(`/api/posts/home`)
                .then(res => {
                    console.log('res.data =', res.data)
                    // dispatch(getUser(res.data))
                    setPosts(res.data)
                })
                .catch(error => {
                    console.log(error) 
                })
        }
            
    }, [id])
    
    const toggleNewPostView = () => {
        if(newPostView === 'hide'){
            setNewPostView('show')
        } else {
            setNewPostView('hide')
        }
    };

    const toggleEditPostView = () => {
        if(editPostView === 'hide'){
            setEditPostView('show')
        } else {
            setEditPostView('hide')
        }
    };

    const toggleFriendRequestView = () => {
        if(friendRequestView === 'hide'){
            setFriendRequestView('show')
        } else {
            setFriendRequestView('hide')
        }
    }

    const togglePrivacy = () => {
        if(isPrivate === 'true'){
            setIsPrivate('false')
        } else {
            setIsPrivate('true')
        }
    }

    function post(){
        axios.post('/api/home/post', {id, title, body, img, isPrivate})
        .then(res => {
            console.log("post function res.data", res.data)
            setPosts(res.data)
            toggleNewPostView()
        })
    }

    function editPost(editedPostId){
        axios.put('/api/user/post', {editedTitle, editedBody, editedImg, editedPrivacy, id, editedPostId})
        
        .then(res => {
            setPosts(res.data)
            toggleEditPostView()
            // console.log('editedTitle=', editedTitle)
            // console.log('editedBody=', editedBody)
            // console.log('editedImg=', editedImg)
            // console.log('editedPrivacy=', editedPrivacy)
            // console.log('id=', id)
            // console.log('postId=', editedPostId)
            
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
    }

    function sendFriendRequest(friendId){
        axios.post('/api/sendrequest', {id, friendId})
        .then(res => {
            console.log('sent request')
        })
    }
    // onClick={sendFriendRequest(posts.user_id)}

return (
    <div id='home'>
        <div id='edit-post'>
                {editPostView === 'show' ?
                    <div className='edit-a-post'>
                        <button className='cancel-home' onClick={toggleEditPostView}>Cancel</button>
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
                        <button id='publish-button-home' onClick={() => editPost(editedPostId)}>Save Changes</button>
                    </div>
                : null}
            </div>
        {console.log('posts =', posts)}
        <nav >
            <Link to='/myposts'>
                {user.profile_pic ?
                    <img className='user-profile-pic-nav-home' src={user.profile_pic} alt='profile-pic'/>
                    :
                    <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg' className='default-profile-pic'/>}
            </Link> 
            <header className='home-header'>
                <h1 className='yaybaby'>YayBaby</h1>
                <p className='page-title'>Home</p>
            </header>
            <div className='link'>Explore</div>
        </nav>
        {/* <div className='post'> */}
            {/* {newPostView === 'show' ?
                <section>
                    <p>create a new post</p>
                    <input placeholder='title' value={title} onChange={e => setTitle(e.target.value)}/>
                    <input placeholder='body' value={body} onChange={e => setBody(e.target.value)}/>
                    <input placeholder='img' value={img} onChange={e => setImg(e.target.value)}/>
                    <input placeholder='isPrivate' value={isPrivate} onChange={e => setIsPrivate(e.target.value)}/>
                    <button type='button' onClick={post} >Post</button>
                </section>

            : 
            null} */}
             {/* <button onClick={toggleNewPostView}>Create A Post</button>  */}
        {/* </div> */}
        {id ?
        posts.map((posts, index) => {
            return(
                <div id='mapped-post' key={index}>
                    <div id='mapped-post-top-home'>
                        <section className='top-home'>
                            {posts.profile_pic ?
                            <img className='user-profile-pic' src={posts.profile_pic} alt='profile-pic'/>
                            :
                            <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg' className='default-profile-pic'/>}
                            <p className='name' onClick={toggleFriendRequestView}>{posts.first_name} {posts.last_name}</p>
                            {friendRequestView === 'show' ? 
                                
                                    <div className='send-friend-request' onClick={sendFriendRequest(posts.user_id)}>
                                        <p>Send Friend Request</p>
                                    </div>
                                
                            : null
                            }
                            <div id='spacer-top'></div>
                            <p className='is-private'>{posts.is_private === true ? <p>Private</p> : <p>Public</p>}</p>
                            {posts.user_id === id ?
                            <div className='buttons-home'>
                                <img className='edit-button-home' src='https://www.clipartkey.com/mpngs/m/208-2084880_pencil-draw-edit-pen-icon-pencil-png-transparent.png' onClick={() => handleEdit(posts)}/>
                                <img className='delete-button' src='https://www.clipartkey.com/mpngs/m/141-1417578_trash-can-png-transparent-images-delete-icon-png.png' onClick={() => deletePost(posts.post_id)}/>
                            </div>
                            : null}
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
        : <h2>Nothing to show yet</h2>}
        

    </div>
)
}
export default Home