const {Schema,model} = require("mongoose");


const GameSchema = new Schema({
    "id":{type:Number,require:true},
    "Name":{type:String,require:true},
    "quantity":{type:Number,require:true},
   
    "image":{type:String,require:true},
    "Title":{type:String,require:true},
    "Genre": {type:String,require:true},
    "Release": {type:String,require:true},
    "Price":{type:String,require:true},
    "DiscoutedPrice":{type:String,require:true}
})




const OrderSchema = new Schema({
    id : {type:String,require:true},
    Name:{type:String,require:true},
    email:{type:String,require:true},
    DiscoutedPrice:{type:Number,require:true},
    quantity:{type:Number,require:true},
})

const ProfitableUserSchema = new Schema({
    _id:{type:Object,require:true},
    totalamount:{type:Number,require:true},
    count:{type:Number,require:true}
})

const CartSchema = new Schema({
    "id":{type:String,require:true},
    
    "email":{type:String,require:true},
    "image":{type:String,require:true},
    "Name":{type:String,require:true},
    "quantity":{type:Number,require:true},
    "DiscoutedPrice":{type:String,require:true}
})

const CartModel = new model("cart",CartSchema);
const OrderModel = new model("order",OrderSchema);
const GameModel = new model("game",GameSchema);
const GoodUser = new model("gooduser",ProfitableUserSchema)

module.exports = {GameModel,OrderModel,GoodUser,CartModel}