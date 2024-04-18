const UserSchema = require("../Schemas/User");
const GameSchema = require("../Schemas/GameSchema");
const SignupControl = async (req,res,next) =>{
    try {
                
            const {username,email,phonenumber,password} = req.body;

            const isUserExist = await UserSchema.SignupModel.find({email:email})


           
            if(isUserExist?.length>0){
               const error = {
                message:"Email Exist please login"
               }
               next(error)
            }
            const NewUserData = await UserSchema.SignupModel.create({username,email,phonenumber,password});
            if(!NewUserData){
                const err = {
                    message:"Some Error Occurred"
                }
                next(err)
            }
            return res.status(200).json({msg:"User Added",idToken:await NewUserData.genratejsonwebtoken(),ID:NewUserData._id.toString()});

           



    } catch (error) {
      next(error)
    }

}


const LoginUser = async (req,res,next) =>{

    try {
        const {email,password} = req.body
    
        const isUserExist = await UserSchema.SignupModel.find({email:email});
        let user = await GameSchema.OrderModel.find({email:email});
        let purchase;
        if(!user){
            purchase = 0;
        }else{
            purchase = user.reduce((acc,curr)=>{
                return acc + (Number(curr.DiscoutedPrice) * Number(curr.quantity))
            },0)
        }
        
      
        if(isUserExist.length<=0){
            const error = {
                message:"Email is not exist please signup"
            }
            next(error)
        }
        
        const checkPassword = await isUserExist[0].ComparePassword(password)
        
        if(checkPassword){
            return res.status(200).json({totalpurchased:purchase,msg:"login Successfull",idToken:await isUserExist[0].genratejsonwebtoken(),ID:isUserExist[0]._id.toString()})
        }

        const error = {
            message:"Email and Password is invalid"
        }

        next(error)
    } catch (error) {
        const err = {
            message:"Server Error"
        }
        next(err)
    }
}

const User = async (req,res,next) =>{
    try {

        const userdata = req.user;
       
        
        if(!userdata.email){
            return res.status(500).json({msg:"User have to login again"});
        }else{
           
            return res.status(201).json({userdata});
    
        }
       
        
    } catch (err) {
        const error = {
            message:"User Have to Login Again"
        }
        next(error)
    }
}



module.exports = {SignupControl,LoginUser,User};
