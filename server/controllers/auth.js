const bcrypt = require('bcryptjs');

module.exports = {
    getUser: (req, res) => {
        if(!req.session.user){
            return res.status(404);
        }
        res.status(200).send(req.session.user);
    },
    createUser: async(req, res) => {
        console.log('create user!')
        const {email, password, firstName, lastName} = req.body;
        const db = req.app.get('db');
        const profile_pic = null;
        // console.log(`email: ${email}, password: ${password}, first_name: ${firstName}, last_name: ${lastName}`)
        const result = await db.user.find_user_by_email([email]);
        const existingUser = result[0];
        
            if(existingUser){
                return res.status(409).send('Email address already exists');
            }

            
        const salt = await bcrypt.genSaltSync(10);
        console.log('we got to here');
        const hash = await bcrypt.hashSync(password, salt);

        
        const registeredUser = await db.user.create_user([email, hash, firstName, lastName, profile_pic]);
        const user = registeredUser[0];

        console.log("this is the registeredUser", registeredUser)
        console.log("this is the firstname", user.firstName)

        req.session.user = {email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName, profile_pic: null};
        res.status(200).send(req.session.user);
    },
    login: async(req, res) => {
        console.log('logging in authCtrl');
        console.log('req.body =', req.body);
        const {email, password} = req.body;
        
        const db = req.app.get('db');

        const foundUser = await db.user.find_user_by_email([email]);
        const user = foundUser[0];
        // props.history.push('/home')

        console.log('foundUser =', foundUser);
            if(!user){
                return (res.status(401).send('User not found. Please register as a new user before logging in.'));
            }
        const isAuthenticated = bcrypt.compareSync(password, user.password);
            if(!isAuthenticated){
                return res.status(403).send('Incorrect password');
            }
        delete user.password;
        req.session.user = {email: user.email, id: user.id, first_name: user.first_name, last_name: user.last_name, profile_pic: user.profile_pic};
        res.status(200).send(req.session.user);
    },
    logout: async(req, res) => {
        req.session.destroy();
        res.status(200).send(`You've been logged out.`);
    }
}