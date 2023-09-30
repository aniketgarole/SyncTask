
import styles from "../styles/Sidebar.module.css"

const Sidebar = () => {
  return (
    <div className={styles.sidebar_container}>
      <ul>
        <li>Due Today</li>
        <li>Due Tommorrow</li>
        <li>Due This Week</li>
        {/* <li></li> */}
      </ul>
    </div>
  )
}

export default Sidebar