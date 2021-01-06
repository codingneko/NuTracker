//Register controllers

module.exports = {
    api: {
        users: {
            user: require('./api/users/user'),
            register: require('./api/users/register'),
            login: require('./api/users/login'),
            logout: require('./api/users/logout')
        },
        faps: {
            create: require('./api/faps/create')
        }
    },
    front: {
        index: require('./front/index'),
        users: {
            user: require('./front/users/user'),
            fap: require('./front/users/submitFap'),
            register: require('./front/users/register'),
            registerSubmit: require('./front/users/registerSubmit'),
            login: require('./front/users/login'),
            loginSubmit: require('./front/users/loginSubmit')
        }
    }
}