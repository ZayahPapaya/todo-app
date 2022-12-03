const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const verifyUser = (request, response, next) => {
  const valid = (error, user) => {
    request.user = user;
    next();
  }
  try {
    const token = request.headers.authorization.split(' ')[1];
    console.log('Token: ', token);
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    response.status(403).send('Forbidden');
  }
}

// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}



module.exports = verifyUser;