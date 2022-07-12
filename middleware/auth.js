const jwt = require("jsonwebtoken");

const config = process.env;
const authorization = {'admin':['GET','POST','PUT','DELETE'],'user':['GET']}
const verifyToken = (req, res, next) => {
  // AUTHENTICATION
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers.authorization?(req.headers.authorization).replace('Bearer ',''):'');

  if (!token) {
    return res.status(403).send({status:false,message:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(403).send({status:false,message:"Invalid Token"});
  }
  // AUTHORIZAITION
  console.log(req.user.role)
  if(!authorization[req.user.role]){
    return res.status(403).send({status:false,message:"Invalid Token"});
  }
  if(!authorization[req.user.role].includes(req.method)){
    return res.status(403).send({status:false,message:"Un-Authorized"});
  }
  return next();
};


module.exports = verifyToken;