const game = require("../games")
const Game = require("../Schemas/GameSchema");
const Senddata =async (req,res) =>{ 
    try {
        
    const requiredata = game.data;
    Game.GameModel.deleteMany({});
    const DataSend = await Game.GameModel.insertMany(requiredata);

    DataSend ? res.status(201).json({msg:DataSend}) : res.status(500).json({msg:"Failed To load"}); 

    } catch (error) {
        console.log(error)
    }
} 


const OrderSend = async (req,res) =>{
    try {
        const data = req.body;
        const SendOrder = await Game.OrderModel.insertMany(data);
        SendOrder ? res.status(201).json({msg:"Order Successfully"}):res.status(500).json({msg:"Order not placed"});
  

    } catch (error) {
        console.log(error)
    }




}


const CountMostProfitableProduct = async(req,res) =>{
    const GroupData = await Game.OrderModel.aggregate([{$group:{_id:{Name:"$Name"},totalamount:{$sum:{$multiply:["$DiscoutedPrice","$quantity"]}},  count:{$sum:1}}}]);
    
    GroupData ? res.status(201).json({msg:GroupData}): res.status(500).json({msg:"Order not found"});

    
}

const ProfitableUser  = async(req,res)=>{
    const GroupUser = await Game.OrderModel.aggregate([{
        $group:{_id:{email:"$email"},totalamount:{$sum:{$multiply:["$DiscoutedPrice","$quantity"]}},count:{$sum:1}}
    }])
    await Game.GoodUser.deleteMany({})
    const SendGoodUser = await Game.GoodUser.insertMany(GroupUser);
    SendGoodUser ? res.status(201).json({msg:SendGoodUser}): res.status(500).json({msg:"No data found!"});  
}

const Cart = async(req,res,next) =>{
    try {
        const {id,email,Name,image,quantity,DiscoutedPrice} = req.body;
        const checkproduct = await Game.CartModel.find({id:id});
    
        if(checkproduct.length>0){
            const erro = {
                message:"Already added please visit to cart to purchase"
                
            }
            return next(erro)
        }        
        const insertdata= await Game.CartModel.create({id,email,Name,quantity,DiscoutedPrice,image});

        if(!insertdata){
            const error = {
                message:"Not Inserted Server Error"
            }
            next(error);
        }
        res.status(201).json({msg:"Added"})

        } catch (error) {
            console.log(error)
        }
}

const GetCart = async (req,res,next) =>{
    try {
        const email = req.params.id;
        const cartdata = await Game.CartModel.find({email:email});
        if(cartdata.length>0){
            return res.status(201).json({msg:cartdata})
        }else{
            return res.status(500).json({msg:"Cart Empty"})
        }
    } catch (erro) {
        const error = {
            message:"Server Error"
        }
        return next(error)
    }
}

const updatecartitem = async(req,res,next) =>{
    try {
        const {id,quantity,email} = req.body;
       
        const findemail = await Game.CartModel.find({email:email});
       
        if(findemail.length===0){ 
            return res.status(201).json({msg:"Error Email Not Found"});
        } 
        const updateitem = await Game.CartModel.updateOne({id:id},{$set:{quantity:quantity}});    
        updateitem ? res.status(201).json({msg:"Item Increase"}) : res.status(201).json({msg:"Something Error"})


    } catch (erro) {
        const error = {
            message:"Sorry Something Wrong"
        }
        next(error)
    }
    
}

const RemoveItem = async(req,res,next) =>{
    try {
        const id = req.params.id;
        const response = await Game.CartModel.deleteOne({id:id});
        
        return res.status(201).json({msg:"Remove from Cart"});
        
    } catch (error) {
        const erro  = {
            message:"Servor Error"
        }
        next(erro)
    }
}

const EmptyCart = async(req,res,next) =>{
    try {
        
        await Game.CartModel.deleteMany({});


    } catch (error) {
        const err = {
            message:"SOmething Wrong!!"
        }
        next(err)
    }
}

module.exports = {Senddata,OrderSend,EmptyCart,CountMostProfitableProduct,ProfitableUser,Cart,GetCart,updatecartitem,RemoveItem}