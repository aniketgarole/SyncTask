
import { useState } from "react"
import styles from "../styles/TaskSection.module.css"
import TaskCard from "./TaskCard"


const TaskSection = () => {

  const [currentStatus, setCurrentStatus] = useState<string>("all")
  

  const tasks = [
    {
      title: "Task 1",
      description: "Task 1 description",
      status: true,
      due_date: "22 sep 15:40",
      created_at: "21 sep 13:15",
      
    },
    {
      title: "Task 2",
      description: "Task 2 description",
      status: true,
      due_date: "22 sep 15:40",
      created_at: "21 sep 13:15",
      
    },
    {
      title: "Task 3",
      description: "Task 3 description",
      status: false,
      due_date: "22 sep 15:40",
      created_at: "21 sep 13:15",
      
    },
    {
      title: "Task 4",
      description: "Task 4 description",
      status: true,
      due_date: "22 sep 15:40",
      created_at: "21 sep 13:15",
      
    },
    {
      title: "Task 5",
      description: "Task 5 description",
      status: false,
      due_date: "22 sep 15:40",
      created_at: "21 sep 13:15",
      
    }
  ]

  const filterTasks = () => {

    const completedTasks = tasks.map((task) => {
      return task.status === true
    })

    const pendingTasks = tasks.map((task) => {
      return task.status === false
    })
  }



  return (
    <div className={styles.tasksection_container}>
      <button className={styles.create_task_btn}>Create a new task</button>
      <div className={styles.tasks_div}>
        <div className={styles.filter_day_header}>
          <h2>Today's Tasks</h2>
          <select name="" id="">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className={styles.all_tasks}>
          {
            tasks?.map((task) => {
              const taskProps = {
                title: task.title,
                created_at: task.created_at,
                due_date: task.due_date,
                status: task.status
              }
              return <TaskCard {...taskProps}/>
            })
            
          }
        </div>
      </div>
    </div>
  )
}

export default TaskSection