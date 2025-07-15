const userRouter = require('express').Router()
const userEjsCtrl = require('./user.ejs-ctrl')
const userApiCtrl=require('./user.api-ctrl')
const { body } = require('express-validator')

// body field validation
const validateUser = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 3 }).withMessage('Password must be more than 3 characters'),
    body('first_name').trim().notEmpty().withMessage('Name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('gender').isIn(['male', 'female']).withMessage('Incorrect gender'),
    body('birthdate').isISO8601().withMessage('Date is invalid'),
]

// ejs routes
userRouter.get('/', userEjsCtrl.listUsers)
userRouter.get('/new', userEjsCtrl.newUserForm)
userRouter.get('/:id', userEjsCtrl.showUser)
userRouter.get('/edit/:id', userEjsCtrl.editUserForm)

// api routes
userRouter.post('/new', validateUser, userApiCtrl.createUser)
userRouter.post('/edit/:id', validateUser, userApiCtrl.updateUser)
userRouter.post('/delete/:id', userApiCtrl.deleteUser)

module.exports = userRouter
