const express = require("express")
const {format} = require("date-fns")
const { TaskModel } = require("../models/tasks.model")
const { formatter } = require("../utils/TimezoneConverter")

const tasksRouter = express.Router()


tasksRouter.get("/", async (req, res) => {
    try {
        const {userId} = req.body
        const {page} = req.body
        const tasks =  page ? await TaskModel.find({userId}).limit(5).skip(5*(page-1)) : await TaskModel.find({userId})
        // console.log(tasks)
        const totalTasks = await TaskModel.countDocuments({userId})
        const totalPages = Math.ceil(totalTasks/5)
        const regularTasks = tasks.map((task) => Object.assign({}, task._doc))
        const formatted_tasks = regularTasks.map((task) => {
            formatted_due_date = format(task.due_date, "PPpp")
            formatted_created_task = format(task.created_at, "PPpp")
            let {userId, ...rest} = task
            // console.log(rest)
            return {...rest, created_at: formatted_created_task, due_date: formatted_due_date}
        })
        res.status(200).json({"tasks": formatted_tasks, totalTasks, totalPages})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"mssg": error.message})
    }
})


tasksRouter.get("/duetoday", async(req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const query = {
            due_date: {
              $gte: today,
              $lt: tomorrow,
            },
          };

          const tasksDueToday = await TaskModel.find(query);

          res.status(200).json({tasks: tasksDueToday})

      } catch (error) {
        
        res.status(400).json({"msg": error.message})

        
      }
})


tasksRouter.post("/create", async (req, res) => {
    try {
       
        let timeOfCreation = new Date()

        const formattedDate = formatter.format(timeOfCreation)
        const newTask = new TaskModel({...req.body, created_at: formattedDate})
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