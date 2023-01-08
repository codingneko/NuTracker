const UserRepo = require('./controllers/repository/UserRepo');
const SessionRepo = require('./controllers/repository/SessionRepo');

var helpers = {
    getLoggedInUser: async (req) => {
        if (typeof req.session.sessionToken !== 'undefined') {
            try {
                var session = await SessionRepo.findById(
                    req.session.sessionToken
                );
                var user = await UserRepo.findById(session.userId);

                return user.username;
            } catch (err) {
                console.log(
                    'User tried to log in with an expired or forged session',
                    err
                );
                req.session.destroy();
                helpers.addNotification(
                    req,
                    "Invalid session ID, you've been logged out, please log in again."
                );
            }
        } else {
            return false;
        }
    },

    getNotifications: (req) => {
        if (
            typeof req.session.notification !== 'undefined' &&
            !req.session.notification.shown
        ) {
            req.session.notification.shown = true;

            if (req.session.notification.items.length > 0) {
                return req.session.notification.items;
            } else {
                return [];
            }
        } else {
            return [];
        }
    },

    addNotification: (req, text) => {
        if (
            typeof req.session !== 'undefined' &&
            typeof req.session.notification !== 'undefined' &&
            !req.session.notification.shown
        ) {
            req.session.notification.shown = false;
            req.session.notification.items.push(text);
        } else {
            req.session.notification = {
                shown: false,
                items: [text],
            };
        }
    },
};

module.exports = helpers;
