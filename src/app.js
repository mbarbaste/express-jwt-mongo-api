// Requirements
const express = require('express')
const dbConnect = require('./db.connection')
const app = express()

//const db = require('./db.connection')

const routerUsers = require("./routes/users.routes")

//console.log("PORT CONFIGURADO:", process.env.PORT)
console.log("MONGO_DB_URL:", process.env.MONGO_DB_URL)

dbConnect()

// Settings
app.set("name", "rest-api-node-express-jwt")
//app.set("port", process.env.PORT || 3000)

// Middlewares
app.use( express.json() )

// Routes
app.use(express.static("public"))
app.use("/api/users", routerUsers)


module.exports = app