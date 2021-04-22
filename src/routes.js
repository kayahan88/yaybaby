import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import MyPosts from './Components/MyPosts/MyPosts'
import EditMyProfile from './Components/EditMyProfile/EditMyProfile'
import MilestoneAlbum from './Components/MilestoneAlbum/MilestoneAlbum'
import OrderConfirm from './Components/OrderConfirm/OrderConfirm';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/home' component={Home} />
        <Route path='/myposts' component={MyPosts} />
        <Route path='/editmyprofile' component={EditMyProfile} />
        <Route path='/milestonealbum' component={MilestoneAlbum} />
        <Route path='/orderconfirm' component={OrderConfirm} />
    </Switch>
)