const {User} = require('../models');
module.exports = {
    async verify(req, res){
        try{
            const user = User.findOne({
                where: { 
                    email: req.body.email 
                }
            });
            if(user !== null){
                if (user.isVerified) {
                    res.status(202).send('Email Already Verified');
                } 
                else {
                    const foundToken= models.verificationtoken.findOne({
                        where: { 
                            token: req.query.verificationtoken 
                        }
                    });
                    if(foundToken){
                        user.isVerified = true;
                    } 
                    else {
                        res.status(404).send('Token expired');
                    }
                }
            }
            else{
                res.status(404).send('Email not found');
            }
        }
        catch(err){
            console.log(err);
            res.status(400).send('Bad Request')
        }   
    }
}