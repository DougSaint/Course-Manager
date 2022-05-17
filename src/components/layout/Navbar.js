import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import Container from './Container'
import logo from '../../img/logo.png'

function Navbar() {
  return (
    <nav className={styles.navbar}>
		<Container customClass ="min-height">
			<Link to ="/"><img src ={logo} alt="Daily"></img></Link>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link to="/">Home</Link>
				</li>
				<li className={styles.item}>
					<Link to="/courses">Cursos</Link>
				</li>
				<li className={styles.item}>
					<Link to="/company">About-me</Link>
				</li>
				<li className={styles.item}>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
		</Container >
	</nav>
  )
}

export default Navbar
