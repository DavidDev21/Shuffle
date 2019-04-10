module.exports = {
    async upload (req, res) {
        try 
        {
            
            res.json({
                type: req.body.type,
                file: req.file
            })
        }
        catch(err)
        {
            console.log(err)
        }
        res.send(
            req.body
        )
    },
}