import React, {useEffect, useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import './MilestoneAlbum.css';

const {REACT_APP_PUBLISHABLE_KEY} = process.env;
const MilestoneAlbum = (props) => {
    
    const {user} = useSelector((state) => state);
    const {first_name, last_name, email} = user;
    const title = 'Your Milestone Album is on its way!';
    const message = `Hi, ${first_name}! ${<br></br>} Order Confirmation: Your Milestone Album order from YayBaby has been placed!`;

    //add price state
    const [posts, setPosts] = useState([]);
    let price = 29.95

    const {id} = user;

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

    console.log('posts[0]', posts[0])

    const onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('/api/payment', {token, amount: price*100})
        .then(response => {
            handleSend()
            props.history.push(`/orderconfirm`)
        })
        .catch(err => console.log(err))
    }

    function handleSend(){
        axios.post('/api/email', {first_name, last_name, email, title, message})
        .then(res => {
            console.log('email sent')
        })
    }

return (


    <div>
         <Link to='/myposts'>
                {user.profile_pic ?
                    <img className='user-profile-pic-order'  src={user.profile_pic} alt='profile-pic'/>
                    :
                    <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg' className='default-profile-pic'/>}
        </Link>

        <h1 className='yaybaby' >YayBaby</h1>

        <h1 className='order-a-memory-book'>Order a milestone album with all of your baby's firsts and cherish them for years to come</h1>

        <p className='preview-p'>Preview:</p>

        <section>
            
             
                <div className='preview-container'>
                    <h3>$29.95</h3>
                    <div className='preview-closed'>
                        <div className='image-container'>
                            <img className='yaybabybaby' src='https://wallpaperaccess.com/full/1411315.jpg'/>
                            <div>
                                <p>EMMA'S MILESTONE ALBUM</p>
                            </div>
                            <div className='logo-preview'>
                                <p>YayBaby</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className='preview-open'>
                        <div className='image-container'>

                            <img className='open-left' src='https://previews.dropbox.com/p/thumb/ABJd7L1bh-HeWZHFfTvj_eX64SdiZ7xlkcbNqrXJ63Ew1rvfBAacxUl4JX_C5Fpj89oA6UyeBUgUqizANh0KJ7GeGSXz-XINSZrD6HGu4UE7NYvpkke3I6iekoypI0BIlTDqwvAqAEq0-owLU2emP3FM8s5TzxvItCVR0BMdggfN5qz6LJjMTBduYU0BEyPjF9GFAzkg8xN4AfwVOvmiUB5uiSwxpRnB18HzP5ln7BQQcYQej3AYzHLkqgdA3Muouf6GnsfGsKfkIDpIjTqBjFOEcYr8ojjbGtVBUbFxTIhZ_5lx-6nRc0ixOiwRE3dnrOS4x13WiAsq1ZK5llk9Ovg-l_UdqPtoA5S2sRmKM8s9ow/p.jpeg?fv_content=true&size_mode=5'/>

                            <img className='open-right' src='https://cdn.shopify.com/s/files/1/1514/4868/products/Baby_in_bath_1_bee5017c-eadc-4a55-83cf-1e283aa3dbc2.jpg?v=1602799348'/>

                        </div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            
        </section>

        <div>
        <StripeCheckout 
            token={onToken}
            stripeKey={REACT_APP_PUBLISHABLE_KEY}
            amount={price*100}
            className='stripe'
            />
        </div>
    </div>
)
}
export default MilestoneAlbum;