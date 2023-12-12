import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"

export const Navbar = () => {
    return ( 
        <nav className={styles.navbar}>
            {/* <h1 className={styles.heading}>My movie CRUD app</h1> */}
            <div className={styles.links}>
                <Link to="/">Home </Link>
                <Link to="/movies">Movies</Link>
                <Link to="/about">About</Link>
            </div>
        </nav> 
    );
}
 

