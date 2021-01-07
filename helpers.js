var helpers = {
    getLoggedInUser: req => {
        if (typeof req.session.sessionToken !== 'undefined') {
            try {
                return req.app.locals.db.get('users').find({
                    id: req.app.locals.db.get('sessions').find({
                        id: req.session.sessionToken
                    }).value().userId
                }).value().username;
            } catch (err) {
                console.log("user tried to log in with an expired or forged session", err);
                this.addNotification(req, "Invalid session ID, you've been logged out, please log in again.");
            }
            
        } else {
            return false
        }
    },
    
    getNotifications: req => {
        if (typeof req.session.notification !== 'undefined' && !req.session.notification.shown){
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
        if (typeof req.session.notification !== 'undefined' && !req.session.notification.shown) {
            req.session.notification.shown = false;
            req.session.notification.items.push(text);
        } else {
            req.session.notification = {
                shown: false,
                items: [text]
            }
        }
    }
}

module.exports = helpers;