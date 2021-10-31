const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    return expressJwt({
        secret,
        algorithms:['HS256']
    }).unless({ //for excluding login api from jwt authentication
        path:[ 
            {url: /\/public\/uploads(.*)/,methods:['GET','OPTIONS']},
            {url:'//\api/\v1\/products(.*)/',methods:['GET','OPTIONS']},
            '/api/v1/users/login',
            '/api/v1/users/addUser',

        ]
    })
}

module.exports = authJwt