const {User} = require('../models');

module.exports = {
    async changeEmail(req, res)
    {
        const userID = req.params.userID;

        try
        {
            const response = await User.update({
                email: req.body.email
            }, {
                where:{
                    id: userID
                }});
        }
        catch(err)
        {
            // Possibly violate a unique constraint for email
            console.log(err);
            res.status(401).send(err);
        }
    },
    async changePassword(req, res) 
    {
        const userID = req.params.userID;

        const response = await User.update({
            password: req.body.password
        }, {
            where: {
                id: user_id
            }
        });
    },
    async getProfile(req, res)
    {
        
    },

};