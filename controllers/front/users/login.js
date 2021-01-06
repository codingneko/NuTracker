module.exports = (req, res) => {
    if (typeof req.session.sessionToken === 'undefined') {
        res.render('pages/login');
    } else {
        res.redirect('/');
    }
}