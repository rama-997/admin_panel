const { validationResult } = require('express-validator')
const bcryptjs=require('bcryptjs')
const User = require('./user.model')

class UserApiCtrl{

    async createUser(req, res){

        // body validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('user-form', {
                user: req.body,
                action: '/users/new',
                errors: errors.array()
            })
        }

        // checking user
        const existing = await User.findOne({ username: req.body.username })
        if (existing) {
            return res.render('user-form', {
                user: req.body,
                action: '/users/new',
                errors: [{ msg: 'This username is already exists' }]
            })
        }

        // hashing pass
        const hashedPass=await bcryptjs.hash(req.body.password, 3)

        // saving user
        await User.create({...req.body,password:hashedPass})

        res.redirect('/users')
    }

    async updateUser(req, res) {

        // body validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('user-form', {
                user: { ...req.body, _id: req.params.id },
                action: `/users/edit/${req.params.id}`,
                errors: errors.array()
            })
        }

        // hashing pass
        const hashedPass=await bcryptjs.hash(req.body.password, 3)

        await User.findByIdAndUpdate(req.params.id, {...req.body,password:hashedPass})
        res.redirect('/users')
    }

    async deleteUser(req, res) {
        await User.findByIdAndDelete(req.params.id)
        res.redirect('/users')
    }
}

module.exports = new UserApiCtrl()