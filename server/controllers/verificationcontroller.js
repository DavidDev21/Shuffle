const {User} = require('../models');
const {verificationtoken} = require('../models');
module.exports = {
    async verify(req, res){
        try{
            const foundToken = await verificationtoken.findOne({
                where: { 
                    token: req.params.userToken 
                }
            });
            if(foundToken !== undefined)
            {
                console.log(foundToken.dataValues);
                const userID = foundToken.dataValues.userId;
                console.log(userID);
                const user = await User.findOne({
                    where: {
                        id: userID
                    }
                });

                if(user.dataValues.isVerified === true)
                {
                    res.status(202).send('Email Already Verified');
                }
                else
                {
                    const response = User.update({
                        isVerified: true
                    }, {
                        where: {
                            id: userID
                        }
                    });
                    res.status(200).send('Account is now verified');
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