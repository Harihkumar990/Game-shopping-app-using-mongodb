const {Schema,model} = require("mongoose");
const jwt = require("jsonwebtoken");
const SignupSchema = new Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    phonenumber:{type:String,require:true},
    password:{type:String,require:true}
}) 


SignupSchema.methods.ComparePassword = async function(password){

    if(password === this.password){
        return true
    }
    return false

}

SignupSchema.methods.genratejsonwebtoken = async function(){
    try {

        return jwt.sign({
            email:this.email,
            userId:this._id.toString()
        },process.env.JWT_SECRET_CODE,{
            expiresIn:'1d'
        })

    } catch (error) {
        console.log(error)
    }
}




const SignupModel = new model("user",SignupSchema);

module.exports = {SignupModel};