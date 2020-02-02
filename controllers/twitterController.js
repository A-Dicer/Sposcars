const twit = require("../config/twitAuth.js");
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'cTG2wQqlTod844vZh4KkogaAb',
  consumer_secret: 'gV6Qb3PRwtxpL6y9Nj6HNImbTpf9ah6hfBXrvVHOVNudRN5nvJ',
  access_token_key: '885224216005685251-ISjjWOj0amarhPuckHetW8xPjqqSS4X',
  access_token_secret: 'FTOtAMd18v1dG91JSk5fiJk2Jfexh8Ey5qXFdgpou2GII'
});

module.exports = {
    findAll: function (req, res) {  
        const params = {user_id: req.params.id};
        const path = "https://api.twitter.com/1.1/users/show.json?"
        client.get(path, params, function(error, user, response) {
            if (!error) {
                let data = new Object;
                data.screenName = user.screen_name
                data.img = user.profile_image_url.replace("_normal", "")          
                
            res.json({results: data, pass: req.session.passport});
            } else console.log(error)
        });  
    }
};