require("dotenv").config()
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

// Initializing the router
const Auth_Route = require("./router/auth")


app.use(express.json())

app.use("/api/backend", Auth_Route)

app.use((err, req, res, next) => {
    const status = err.status || 500 ;
    const message = err.message;
    return res.status(status).json({
        statusCode: status, 
        message
    })
})

mongoose.connect(process.env.MONGO_DB)
.then(data => {
    app.listen(process.env.PORT)
    console.log(`Server is connected to port ${process.env.PORT}`)
})
.catch(err => {
    console.log(err)
})