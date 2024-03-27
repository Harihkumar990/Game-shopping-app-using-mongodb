const express = require("express");
const Gamecontroller = require("../controllers/GameController");
const JsonVerify = require("../middleware/JsonWebTOken");
const GameRouter = express.Router();


GameRouter.route("/data").post(Gamecontroller.Senddata);
GameRouter.route("/order").post(Gamecontroller.OrderSend);
GameRouter.route("/count").get(Gamecontroller.CountMostProfitableProduct);
GameRouter.route("/countuser").post(Gamecontroller.ProfitableUser);
GameRouter.route("/cart").post(Gamecontroller.Cart);
GameRouter.route("/cartdata/:id").get(Gamecontroller.GetCart);
GameRouter.route("/update").patch(Gamecontroller.updatecartitem);
GameRouter.route("/remove/:id").post(Gamecontroller.RemoveItem);
GameRouter.route("/empty").post(Gamecontroller.EmptyCart);

module.exports = GameRouter;