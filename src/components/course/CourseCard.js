import styles from './CourseCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

import { Link } from 'react-router-dom'

function CourseCard({id, name, platform, category, handleRemove, modules}) {

	const remove = (e) =>{
		e.preventDefault()
		handleRemove(id)
	}

	return (
	<div className ={styles.course_card}>
		<h4>{name}</h4>
		<p>
			<span>Plataforma:</span> {platform}
		</p>
		<p className={styles.category_text}>
			<span className={`${styles[category.toLowerCase()]}`}></span>{category}
		</p>
		<p>
			<span>Quantidade de modulos:</span> {modules}
		</p>
		<div className={styles.actions}>
			<Link to ={`/course/${id}`}>
				<BsPencil /> Edit
			</Link>
			<button onClick ={remove}>
				<BsFillTrashFill /> Remove
			</button>
		</div>
	</div>
	)
}


export default CourseCard
