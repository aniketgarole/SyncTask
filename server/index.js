const express = require("express")
const cors = require("cors")
const { connection } = require("./connect")
const { userRouter } = require("./routes/user.routes")
const { auth } = require("./middlewares/auth.middlewares")
const { tasksRouter } = require("./routes/tasks.routes")
require("dotenv").config()
const PORT = process.env.PORT || 3000



const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.status(200).send("Welcome to backend")

})




app.use("/users", userRouter)


app.use(auth)


app.use("/tasks", tasksRouter)



;(async ()=> {
    try {
        
        await connection
        console.log("Server is connected to Database")
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
})()