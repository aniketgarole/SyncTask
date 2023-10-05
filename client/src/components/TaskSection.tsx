
import { FormEventHandler, useState } from "react"
import styles from "../styles/TaskSection.module.css"
import TaskCard from "./TaskCard"
import Modal from "./Modal"


const TaskSection = () => {

  const [currentStatus, setCurrentStatus] = useState<string>("all")
  const [ismodal, setIsmodal] = useState<boolean>(false)
  
  // let tasksection_container = ismodal ? "tasksection_container_gray" : "tasksection_container_white"

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

  const handleCreateTask = (e: FormEventHandler<HTMLFormElement>): void => {
    e.preventDefault()
    
  }



  return (
    <div className={styles.tasksection_container}>
      <button className={styles.create_task_btn} onClick={() => {setIsmodal(true)}}>Create a new task</button>
      <div className={styles.tasks_div}>
        <div className={styles.filter_day_header}>
          <h2>Today's Tasks</h2>
          <select name="" id="">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {ismodal ? <Modal handleCreateTask={handleCreateTask}/>: null}
        
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
      <div className={styles.pagination_div}>
          <button>Prev</button>
          <span>2</span>
          <button>Next</button>
      </div>
    </div>
  )
}

export default TaskSection