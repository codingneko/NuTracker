module.exports = (req, res) => {
    var shasum = req.app.locals.crypto.createHash('sha1');
    shasum.update(req.body.password);
    var encryptedPassword = shasum.digest('hex');

    var userData = {
        username: req.body.username,
        password: encryptedPassword
    }

    if (typeof req.app.locals.db.get('users').find({
        username: userData.username
    }).value() === 'undefined') {
        req.app.locals.db.get('users').upsert(userData).write();
        res.json({
            status: 'Success',
            newUser: userData.username
        });

    } else {
        res.status(422);
        res.json({
            status: 'Error, user already exists'
        });
    }
}