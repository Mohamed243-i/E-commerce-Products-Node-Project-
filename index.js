const express = require('express');
var app = express();
const cors=require('cors');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const sellersRouter = require('./routes/sellers');
const ordersRoutes=require('./routes/orders')

app.use(cors())
app.use(express.json())


app.use("/products",productsRouter)
app.use("/sellers",sellersRouter)
app.use("/users",usersRouter)
app.use("/orders",ordersRoutes)

app.use((err,req,res,next)=>{

res.status(500).json({message:err.message})

})

app.listen(3000);






