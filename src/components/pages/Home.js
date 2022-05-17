import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton.js'


function Home() {
	return (
		<section className={styles.home_container}>
			<h1> Bem vindo ao <span>Course Manager</span></h1>
			<p>Aqui você pode registrar os seus cursos!</p>
			<LinkButton to="/newcourse" text="Adicionar curso" />
		</section>
	)
}

export default Home
