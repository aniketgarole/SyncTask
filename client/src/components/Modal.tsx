import styles from "../styles/Modal.module.css"

interface ModalProps {
    handleCreateTask: (e: FormEventhandler<HTMLFormElement>) => void
}

const Modal = ({handleCreateTask}: ModalProps) => {
  return (
    <div className={styles.modal_container_outer}>
        <div className={styles.modal_container}>
        <form className={styles.task_form} onSubmit={handleCreateTask}>
            <label htmlFor="title" className={styles.task_label}>Title</label>
            <br />
            <input type="text" id="title" placeholder="Title"/>
            <br />
            <br />
            <label htmlFor="description" className={styles.task_label}>Description</label>
            <br />
            <textarea  id="Description"  className={styles.task_desc}>Enter description...</textarea>
            <br />
            <br />
            <label htmlFor="due_date"  className={styles.task_label}>Due date</label>
            <br />
            <input type="date" className={styles.task_due_date}/>
            <br />
            <br />
            <button className={styles.task_submit_btn}>Create Task</button>
        </form>
        </div>
    </div>
  )
}

export default Modal