import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className="navigation">
        <NavLink to="/" className={({ isActive }) => `${isActive ? styles.active : ""}`}>Все котики</NavLink>
        <NavLink to="/favourites" className={({ isActive }) => `${isActive ? styles.active : ""}`}>Любимые котики</NavLink>
      </nav>
    </header>
  )
}

export default Header;
