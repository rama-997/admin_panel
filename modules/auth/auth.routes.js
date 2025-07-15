const authRouter = require('express').Router()
const authController = require('./auth.controller')

// ejs routes
authRouter.get('/', authController.showLogin)

// api routes
authRouter.post('/login', authController.login)
authRouter.get('/logout', authController.logout)

module.exports = authRouter
