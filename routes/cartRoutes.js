import express from "express";
import { userProtect } from "../middlewares/userAuthMiddleware.js";
import { add_to_cart, get_cart_items, minus_quantity, plus_quantity, remove_cart_item } from "../controllers/cartController.js";
const cartRouter=express.Router()

cartRouter.post('/addtocart',userProtect,add_to_cart)
cartRouter.get('/getcartitems',userProtect,get_cart_items)
cartRouter.patch('/plusquantity',userProtect,plus_quantity)
cartRouter.patch('/minusquantity',userProtect,minus_quantity)
cartRouter.delete('/removecartitem/:cartid',userProtect,remove_cart_item)

export default cartRouter