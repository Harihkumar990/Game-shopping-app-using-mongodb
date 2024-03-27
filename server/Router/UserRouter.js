const express = require("express");
const User = require("../controllers/UserController");
const JsonVerify = require("../middleware/JsonWebTOken");
const UserRouter = express.Router();

UserRouter.route("/signup").post(User.SignupControl)

UserRouter.route("/login").post(User.LoginUser);


UserRouter.route("/userdata").get(JsonVerify,User.User);

module.exports = UserRouter;