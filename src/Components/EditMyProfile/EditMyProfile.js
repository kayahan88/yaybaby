import axios from 'axios';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import './EditMyProfile.css'

const EditMyProfile = () => {

    const {user} = useSelector((state) => state);
    const {id} = user;

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [profilePic, setProfilePic] = useState(user.profile_pic);

    function updateProfile(){
        axios.put('/api/users/editprofile', {firstName, lastName, profilePic, id})
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    return(
        <div className='home'>
             <header className='home-header' className='centered'>
                 
                <h1 className='yaybaby' >YayBaby</h1>
                {/* <div className='spacer'></div> */}
                <h2 className='page-title'>Edit My Profile</h2>
                
            </header>
            {/* <h1>EditMyProfile</h1> */}
            <div className='edit-profile-container'>
                <section className='new-entry-container'>
                    <div className='new-entry'>
                        <p>First Name</p>
                        <input defaultValue={user.first_name} onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className='new-entry'>
                        <p>Last Name</p>
                        <input defaultValue={user.last_name} onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className='new-entry'>
                        <p>Profile Picture</p>
                        <input defaultValue={user.profile_pic} onChange={e => setProfilePic(e.target.value)}/>
                    </div>
                </section>
                <br></br>
                <button onClick={updateProfile}>Save Changes</button>
                <br></br>
                <button>Delete My Account</button>
                <p>Note: this is permanent and cannot be undone</p>
            </div>
        </div>
    )
}
export default EditMyProfile;