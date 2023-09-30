import styles from "../styles/TaskCard.module.css"

interface TaksCardProps {
    title: string,
    due_date: string,
    created_at: string,
    status: boolean
}

const TaskCard = ({title, due_date, created_at, status}: TaksCardProps) => {
  return (
    <div className={styles.taskcard}>
        <div className={styles.card_title_status}>
            <h3 className={styles.task_title}>{title}</h3>
            <span className={styles.show_status}>{status ? "Completed" : "Pending"}</span>
        </div>
        

        <span className={styles.left_span}>Created on : {created_at}</span>
        <span className={styles.right_span}>Due date : {due_date}</span>
        <br />
        
        <button className={styles.mark_btn}>{status ? "Mark as pending" : "Mark as completed"}</button>
        <button className={styles.edit_btn}>Edit</button>
        <button className={styles.delete_btn}>Delete</button>
    </div>
  )
}

export default TaskCard