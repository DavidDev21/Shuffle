const {User} = require('../models');
const {verificationtoken} = require('../models');
module.exports = {
    async verify(req, res){
        try{
            // check if the token we received from user actually exists
            // token should be unique to an user, so there is no need to verify who this token belongs to
            const foundToken = await verificationtoken.findOne({
                where: { 
                    token: req.params.userToken 
                }
            });
            if(foundToken !== undefined)
            {
                console.log(foundToken.dataValues);
                const userID = foundToken.dataValues.userID;
                console.log(userID);

                // Get the User entry that corresponds with the userID found in the token table
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
                    // update the verify status for the user
                    User.update({
                        isVerified: true
                    }, {
                        where: {
                            id: userID
                        }
                    });

                    // delete the token since we no longer need it
                    verificationtoken.destroy({
                        where:{
                            userID: userID
                        }
                    });
                    // ideally, server will force the redirect
                    // res.status(200).redirect('http:\/\/'+ req.headers.host + '/').send('Account is now verified');

                    // dev mode
                    // note: frontend and backend are running on two different ports at the moment
                    // response is sent back to localhost:5000 cause that is where the req came from
                    // this is an issue for development since frontend is running on 8080 at the moment
                    res.status(200).redirect('http:\/\/localhost:8080/');
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