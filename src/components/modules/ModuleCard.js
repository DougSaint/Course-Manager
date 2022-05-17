import styles from '../course/CourseCard.module.css'

import {BsFillTrashFill} from 'react-icons/bs'



export default function ModuleCard({id,name,time,description,handleRemove}) {
	const remove = (e) => {
		e.preventDefault()
		handleRemove(id)
	 }


	return (
		<div className ={styles.course_card}>
			<div>
			<h4>{name}</h4>
			<p>
				<span>Total de horas: </span>{time}
			</p>
			<p>{description}</p>
		</div>
			<div className={styles.actions}>
				<button onClick ={remove}>
					<BsFillTrashFill /> Remove
				</button>
			</div>
		</div>
	)
}
