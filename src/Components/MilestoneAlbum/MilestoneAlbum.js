import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useSelector } from 'react-redux';

const {REACT_APP_PUBLISHABLE_KEY} = process.env;
const MilestoneAlbum = (props) => {
    
    const {user} = useSelector((state) => state);
    const {first_name, last_name, email} = user;
    const title = 'Your Milestone Album is on its way!';
    const message = `Hi, ${first_name}! ${<br></br>} Order Confirmation: Your Milestone Album order from YayBaby has been placed!`;

    //add price state
    let price = 29.95

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
        <h1>Order a memory book with all of your baby's milestones</h1>
        <h2>preview of book</h2>
        <p>place order</p>
        <StripeCheckout 
            token={onToken}
            stripeKey={REACT_APP_PUBLISHABLE_KEY}
            amount={price*100}
        />
    </div>
)
}
export default MilestoneAlbum;