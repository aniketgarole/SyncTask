import { useState } from 'react'
import styles from "../styles/Homepage.module.css"
import Sidebar from '../components/Sidebar'
import TaskSection from '../components/TaskSection'

const Homepage = () => {

    const [tasks, setTasks] = useState<[]>([])
    const [ham, setHam] = useState<boolean>(false)

    const menu2: string = ham ? "transition_menu" : "no_transition"
    // const logout_btn: string = ham ? "logout_btn_hidden" : "logout_btn_visible"
    

    console.log(menu2)

  return (
    <>
        <header>
            <nav className={styles.navbar}>
                <span className={styles.logo}>SyncTask</span>
                <div className={styles.right_nav}>
                    <span className={styles.welcome_note}>Welcome, User</span>
                    {/* <button className={styles.logout_btn}>Logout</button> */}
                    
                    <button className={styles.hamburger_icon} onClick={()=>{setHam(!ham)}}>
                        &#9776;
                    </button>
                    {(
                        <div className={`${styles.menu} ${styles[menu2]}`}>
                        <ul>
                            <li>Due Today</li>
                            <li>Due Tommorow</li>
                            <li>Due This Week</li>
                            <li>Logout</li>
                        </ul>
                        </div>
                    )}

                    <button className={styles.logout_btn}>Logout</button>
                </div>
                
    
            </nav>
        </header>
        <main>
            <div className={styles.sidebar}>
                <Sidebar/>
            </div>
            <div className={styles.tasksection}>
                <TaskSection/>
            </div>
            
        </main>
        <footer>

        </footer>
    </>
  )
}

export default Homepage