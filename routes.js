const router=require('express').Router()
const middlewares=require('./middlewares')
const userRoutes=require('./modules/user/user.routes')
const authRoutes=require('./modules/auth/auth.routes')

router.use('/users',middlewares.isAdmin,userRoutes)
router.use('/',authRoutes)

module.exports=router