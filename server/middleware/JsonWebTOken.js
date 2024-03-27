const jwt = require("jsonwebtoken");
const Schema = require("../Schemas/User");

const JsonVerify = async (req,res,next) => {

    const token = req.header("Authorization");
    if(!token){
        return res.status(500).json({msg:"Some Error Occured"})
    }

    try {
        
        let verify = jwt.verify(token,process.env.JWT_SECRET_CODE);
        let data = await Schema.SignupModel.findOne({email:verify.email}).select({password:0})

        req.user = data;
        req.token = token;
        req.userid = data._id
        next() 



    } catch (error) {
        
        next()
    }
    next()
}

module.exports = JsonVerify