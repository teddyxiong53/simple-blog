module.exports = {
    checkLogin (req, res, next) {
        if (!req.session.user) {
            return res.redirect('/signin')
        }
        next()
    },
    checkNotLogin (req, res, next) {
        if (req.session.user) {
            return res.redirect('back')
        }
        next()
    }
}