const User = require('./user.model')

class UserEjsCtrl {

    async listUsers(req, res) {

        const page = parseInt(req.query.page) || 1
        const limit = 5

        const sortField = req.query.sort || 'username'
        const sortOrder = req.query.order === 'desc' ? -1 : 1

        const skip = (page - 1) * limit

        const total = await User.countDocuments()
        const totalPages = Math.ceil(total / limit)

        const users = await User.find()
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit)

        res.render('users', {
            users,
            currentPage: page,
            totalPages,
            sortField,
            sortOrder: sortOrder === 1 ? 'asc' : 'desc'
        })
    }

    async showUser(req, res){
        const user = await User.findById(req.params.id)
        res.render('user-detail', { user })
    }

    newUserForm(req, res){
        res.render('user-form', { user: {}, action: '/users/new', errors: [] })
    }

    async editUserForm(req, res){
        const user = await User.findById(req.params.id)
        res.render('user-form', {
            user,
            action: `/users/edit/${user._id}`,
            errors: []
        })
    }
}
module.exports = new UserEjsCtrl()