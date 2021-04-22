import React from 'react';

const OrderConfirm = (props) => {

    function back(){
        props.history.push('/myposts')
    }
    return (
        <div>
            <p>Your order has been placed! A confirmation email was sent to the email address associated with your account. You'll receive another email once your Milestone Album has been shipped.</p>
            <p>Click here to go back to your posts: </p>
            <button onClick={back}>Back to Posts</button>
        </div>
    )
}
export default OrderConfirm;