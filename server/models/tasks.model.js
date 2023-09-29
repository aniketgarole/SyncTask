const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: Boolean, required: true},
    due_date: {type: Date},
    created_at: {type: Date, required: true},
    userId: {type: String, required: true}

}, {
    versionKey: false
})


const TaskModel = mongoose.model("task", taskSchema)


module.exports = {TaskModel}