import styles from "../styles/Signuppage.module.css"


const Signuppage = () => {
  return (
    <div className={styles.signup_container}>
        <h3>Signup</h3>
        <form className={styles.signup_form}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name"/>
            <br />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Enter your email"/>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password"/>
            <br />
            <button type="submit">Signup</button>
        </form>
        <span>Already have an account, <a href="">sign in</a></span>
    </div>
  )
}

export default Signuppage