 const jwt = require('jsonwebtoken');
 const User = require('../users/userModel');

 const verifyToken = async(token) => {
   let user;
   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
     if(err){
       throw err;
     }
     // console.log(payload); // { id: '6064d523724019758277be38', iat: 1617226099 }
     user = payload;
   })
   return user;
 }

 exports.authMiddleware = async (req, res, next) => {
   const { cookies } = req;
   try {
     if(!cookies || !cookies.pToken){
       res.status(403).json({ message: 'Authorization required'});
       return;
     }
     const token = cookies.pToken;
     const user = await verifyToken(token);
     const userData = await User.findById(user.id);
    //  console.log(userData);
     req.user = userData;
     next();
   } catch(err){
     res.status(403).json({ message: 'Invalid or expired token' });
   }
 }