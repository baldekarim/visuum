// Importations
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'a8k0siyj5yss96ygf9mkrx99andfw0x4uqxb2mp62ettiw4e73hhgp8sq27rm8oe';

// Fonctions exportées
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
        userId: userData.user_id,
        isAdmin: userData.is_admin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}