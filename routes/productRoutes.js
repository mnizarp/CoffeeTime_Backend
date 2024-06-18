import express from "express";
import { add_product, delete_product, get_product_details, get_products, searchProducts, update_product } from "../controllers/productController.js";
import {adminProtect} from '../middlewares/adminAuthMiddleware.js'
const productRouter=express.Router()

productRouter.post('/addproduct',adminProtect,add_product)
productRouter.put('/updateproduct',adminProtect,update_product)
productRouter.get('/searchproducts',searchProducts)
productRouter.get('/getproductdetails/:productid',get_product_details)
productRouter.get('/getallproducts',get_products)
productRouter.delete('/deleteproduct/:productid',adminProtect,delete_product)

export default productRouter