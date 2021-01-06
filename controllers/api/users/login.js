module.exports = (req, res) => {
    var shasum = req.app.locals.crypto.createHash('sha1');
    shasum.update(req.body.password);
    var encryptedPassword = shasum.digest('hex');

    var userData = {
        username: req.body.username,
        password: encryptedPassword
    }

    var user = req.app.locals.db.get('users').find({
        username: userData.username,
        password: userData.password
    }).value();

    if (typeof user !== 'undefined') {
        var sessionId = req.app.locals.nanoid(8);
        var sessionExpiry = Date.now() + 3*60*60*24*30;
        req.app.locals.db.get('sessions').push({
            id: sessionId,
            userId: user.id,
            expiry: sessionExpiry
        }).write().id;

        res.json({
            status: 'Success',
            sessionToken: sessionId,
            expiry: sessionExpiry
        });
    } else {
        res.status(401);
        res.json({
            status: 'Wrong username or password'
        });
    }
}