const express = require("express")
const cors = require("cors")
const { connection } = require("./connect")
require("dotenv").config()
const PORT = process.env.PORT || 3000



const app = express()
app.use(express.json())
app.use(cors())








;(async ()=> {
    try {
        await connection
        console.log("Server is connected to Database")
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
        })
    } catch (error) {
        
    }
})()