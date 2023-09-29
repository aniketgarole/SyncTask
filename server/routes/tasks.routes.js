const express = require("express")
const { TaskModel } = require("../models/tasks.model")

const tasksRouter = express.Router()


tasksRouter.get("/", async (req, res) => {
    try {
        const {userId} = req.body
        const tasks = await TaskModel.find({userId})
        res.status(200).json({"tasks": tasks})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"mssg": error.message})
    }
})



tasksRouter.post("/create", async (req, res) => {
    try {
        const newTask = new TaskModel({...req.body})
        await newTask.save()
        res.status(201).json({"msg": "New task has been created!"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"msg": error.message})
    }
})



tasksRouter.patch("/update/:taskId", async (req, res) => {
    try {
        const {taskId} = req.params
        const update = req.body
        console.log(taskId)
        const taskFromDb = await TaskModel.findOne({_id: taskId})
        console.log(taskFromDb)
        if (taskFromDb) {
            const userIdFromDbTask = taskFromDb.userId
            const userIdFromReq = req.body.userId
            if (userIdFromDbTask == userIdFromReq) {
                try {
                    await TaskModel.findByIdAndUpdate({_id: taskId}, update)
                    res.status(200).json({"msg": "Task updated successfully!"})
                } catch (error) {
                    console.log(error.message)
                    res.status(400).json({"msg": error.message})
                }
                
            } else {
                res.status(401).json({"msg": "You are not authorized!"})
            }
            
        } else {
            res.status(401).json({"msg": "You are not authorized!"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"msg": error.message})
    }
})


tasksRouter.delete("/delete/:taskId", async (req, res) => {
    try {
        const {taskId} = req.params
        const update = req.body
        const taskFromDb = await TaskModel.findOne({_id: taskId})
        
        if (taskFromDb) {
            const userIdFromDbTask = taskFromDb.userId
            const userIdFromReq = req.body.userId
            if (userIdFromDbTask == userIdFromReq) {
                try {
                    await TaskModel.findByIdAndDelete({_id: taskId})
                    res.status(200).json({"msg": "Task deleted successfully!"})
                } catch (error) {
                    console.log(error.message)
                    res.status(400).json({"msg": error.message})
                }
                
            } else {
                res.status(401).json({"msg": "You are not authorized!"})
            }
            
        } else {
            res.status(401).json({"msg": "You are not authorized!"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"msg": error.message})
    }
})



module.exports = {tasksRouter}