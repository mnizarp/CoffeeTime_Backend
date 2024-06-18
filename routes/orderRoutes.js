import express from "express";
import { cancel_order, create_order, delete_order, get_orders, update_order_status } from "../controllers/orderController.js";
import { userProtect } from "../middlewares/userAuthMiddleware.js";
import { adminProtect } from "../middlewares/adminAuthMiddleware.js";

const orderRouter=express.Router()

orderRouter.post('/createorder',userProtect,create_order)
orderRouter.get('/getorders',get_orders)
orderRouter.patch('/cancelorder',cancel_order)
orderRouter.patch('/updatestatus',adminProtect,update_order_status)
orderRouter.delete('/deleteorder/:orderid',adminProtect,delete_order)

export default orderRouter    