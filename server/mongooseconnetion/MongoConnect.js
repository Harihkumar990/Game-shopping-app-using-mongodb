const mongoose = require("mongoose");
const requirelink = process.env.MONGO_URI;

const Connect = async () =>{
    try {
        mongoose.connect(requirelink);
    } catch (error) {
        console.log(error)
    }
}

module.exports = Connect