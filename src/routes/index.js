const express = require('express')
const shirtsRouter = require('./shirts.routes')
const categoriesRouter = require('./categories.routes')
const ordersRouter = require('./orders.routes')
const usersRouter = require('./users.routes')

const authRouter = require("./authRouter")

function routerApi(app){
    const router = express.Router()

    app.use('/', router)
    
    router.use("/auth", authRouter);
    router.use('/admin/shirts', shirtsRouter)
    router.use('/admin/categories', categoriesRouter)
    router.use('/admin/orders', ordersRouter)
    router.use('/admin/users', usersRouter)

}

module.exports = routerApi