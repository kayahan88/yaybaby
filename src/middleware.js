module.exports = {
    checkLoggedIn: (req, res, next) => {
        if(req.session.user){
            next();
        } else {
            res.status(400).send({error: "Not logged in!"})
        }
    }
}