const jwt = require('jsonwebtoken');
const User = require("../Model/userSchema")
const bcrypt = require("bcryptjs");

const verify = (req, res, next) => {
   
    const email = req.headers.email;
    const username = req.headers.username;
    const id = req.headers.id;
    const token = req.headers.token;
    

    const decodeData= jwt.decode(token);

    

    if(!decodeData){
      return res.status(401).json({massage:"Token Expire"})
    }
    if(decodeData.user._id!=id||decodeData.user.username!=username||decodeData.user.email!=email){
      return res.status(401).json({massage:"Unauthrized Users"});

    }
    next();
};

const genrateToken = (userdata) => {
    return jwt.sign(userdata, process.env.JWT_SECRET);
};


const login = async(req,res)=>{
    const { email, password } = req.body;
   
  
    try {
      const user = await User.findOne({ email });
  
      if (!email) {
        return res.status(401).json({ message: 'email not found' });
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(401).json({message : `Invalid credentails`})
        
      }
      const payload = {
        id: user._id,
        user:user,
      
      };
      const token = genrateToken(payload);
  
     
      return res.status(200).json({
        message: 'Login successful',
        user,
        token
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Login failed' });
    }

}

module.exports = { verify, genrateToken ,login};
