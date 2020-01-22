module.exports =  { 
        //live ------------------------------------------------------------------------
        // 'proxy': '',
        // 'start': 'node server.js',
        // 'callbackURL': 'https://sposcars.herokuapp.com/api/auth/twitter/callback',
        // 'redirect': 'https://sposcars.herokuapp.com/Main',
        // 'login': '/api/auth/twitter/'

        //dev -------------------------------------------------------------------------
        'proxy': 'http://localhost:3001/',
        'start': 'concurrently \"nodemon server.js\" \"npm run client\"',
        'callbackURL': 'https://127.0.0.1:3001/api/auth/twitter/callback',
        'redirect': 'http://127.0.0.1:3001/Main',
        'login': 'http://127.0.0.1:3001/api/auth/twitter/'
};