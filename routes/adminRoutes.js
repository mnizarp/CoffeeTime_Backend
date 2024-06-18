import express from "express";
import { adminLogin } from "../controllers/adminControllers.js";
const adminRouter=express.Router()

adminRouter.post('/adminlogin',adminLogin)

export default adminRouter