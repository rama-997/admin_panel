const jwt = require('jsonwebtoken')

class AuthController {

    // ejs login
    showLogin(req, res) {
        res.render('login')
    }

    // api login
    async login(req, res) {

        const {username, password} = req.body
        if (
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const JWT_SECRET = process.env.JWT_SECRET || ''
            const token = await jwt.sign({
                username,
                password
            }, JWT_SECRET,{expiresIn: '5m'})
            res.cookie('token', token,{maxAge: 10 * 60 * 1000})
            res.redirect('/users')
        } else {
            res.render('login', {error: 'Incorrect username or password'})
        }
    }

    // api logout
    logout(req, res) {
        res.clearCookie('token')
        res.redirect('/')
    }
}

module.exports = new AuthController()
