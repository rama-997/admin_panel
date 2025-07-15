const jwt=require('jsonwebtoken')

class Middlewares{
    async isAdmin(req, res, next){
        const {token}=req.cookies
        if(!token){
            return res.render('login',{error:'The cookie is expired. Please, confirm your identify'})
        }
        try{
            await jwt.verify(token, process.env.JWT_SECRET)
        }catch (e) {
            res.render('login',{error:' Your token is expired. Please, sign in again.'})
        }
        next()
    }
}

module.exports=new Middlewares()