const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  
  // decodificar token
  if (token) {
    // verifica segredo e verifica exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    // se não houver token
    // retorna um erro
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}