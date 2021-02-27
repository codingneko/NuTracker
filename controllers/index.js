//Register controllers

module.exports = {
    api: {
        users: {
            user: require('./api/users/user'),
            register: require('./api/users/register'),
            login: require('./api/users/login'),
            logout: require('./api/users/logout')
        },
        nuts: {
            create: require('./api/nuts/create')
        }
    },
    front: {
        index: require('./front/index'),
        users: {
            user: require('./front/users/user'),
            nut: require('./front/users/submitNut'),
            register: require('./front/users/register'),
            registerSubmit: require('./front/users/registerSubmit'),
            login: require('./front/users/login'),
            loginSubmit: require('./front/users/loginSubmit'),
            settings: require('./front/users/settings'),
            settingsSubmit: require('./front/users/settingsSubmit'),
            customNut: require('./front/users/customNut'),
            customNutSubmit: require('./front/users/customNutSubmit')
        }
    }
}