require("dotenv").config();
const express = require("express");
const Error = require("./middleware/error-middleware");
const Connect = require("./mongooseconnetion/MongoConnect");
const cors = require("cors");
const UserRouter = require("./Router/UserRouter")
const GameRouter = require("./Router/Datarouter");
const app = express();
app.use(express.json())
var corsOptions = {
    origin:'http://localhost:3000',
    methods:"GET,POST, PUT, DELETE, PATCH , HEAD",
    credentials:true,
};
app.use(cors(corsOptions));



app.use("/Game",GameRouter);
app.use("/user",UserRouter);
app.use(Error)




const port = 5000;



Connect().then(()=>{app.listen(port,()=>{
        console.log("Server Connect Successfully");
    })
})