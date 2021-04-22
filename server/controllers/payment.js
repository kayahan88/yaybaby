const {STRIPE_SECRET_KEY} = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

module.exports = {
    payment: async function(req, res, next){
        const {amount, token} = req.body;
        const db = req.app.get('db');
        const {id} = req.session.user;

        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token.id,
            description: 'Test charge from react app'
        })

        if(charge){
            res.status(200).send({message: "Charge successful."})
        }
    }
}