module.exports =  (req, res) => {
    if (typeof req.session.sessionToken === 'undefined') {
        res.render('pages/register');
    } else {
        res.redirect('/');
    }
}