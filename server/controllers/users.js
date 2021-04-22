module.exports = {
    editProfile: async (req, res) => {
        const db = await req.app.get('db');
        const {firstName, lastName, profilePic, id} = req.body;
        console.log('got to here')
        db.user.update_profile(firstName, lastName, profilePic, id)
        .then(result => res.sendStatus(200))
    },
    deleteAccount: (req, res) => {
        
    },
    sendFriendRequest: async (req, res) => {
        const db = await req.app.get('db');
        const {id, friendId} = req.body;
        db.friends.send_friend_request(id, friendId, false)
        .then(result => {
            res.status(200).send(result);
        })
    },
    acceptFriendRequest: async (req, res) => {

    }
}