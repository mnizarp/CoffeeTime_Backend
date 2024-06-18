import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


import connectDb from './config/connectDb.js'
import adminRouter from './routes/adminRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'


dotenv.config()
const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials:true 
  };

const app=express()

app.use(cors(corsOptions))
app.use(express.json({limit:'15mb'}))
app.use(express.urlencoded({extended:true}))
connectDb()

app.use('/api/admins/',adminRouter)
app.use('/api/carts/',cartRouter)
app.use('/api/orders/',orderRouter)
app.use('/api/products/',productRouter)
app.use('/api/users/',userRouter)

app.get('/',(req,res)=>{
    res.send('hi')
})

const port=process.env.PORT || 3333

app.listen(port,()=>{
    console.log(`server connected on port ${port}`)
}) 


