const jwt = require("jsonwebtoken");
const Auth = require('../model/user');

const auth = async (req) => {
  

  
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken =  jwt.verify(token, 'users');
    const user = await Auth.findOne({
      _id: decordedToken.id    });

    if(!user){
        return {isAuth:false}
    }

    return {isAuth:true, user:user._id}

    

  } catch (err) {
    return {isAuth:false}
  }
};

module.exports = auth;
