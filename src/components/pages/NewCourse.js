import { useNavigate } from 'react-router-dom';

import styles from './NewCourse.module.css'

import CourseForm from '../course/CourseForm'

function NewCourse() {

	const navigate = useNavigate()

	function createPost(course) {
		// initialize cost and services
		course.subjects = []

		fetch('http://localhost:5000/courses', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(course),
		})
		  .then((resp) => resp.json())
		  .then((data) => {
			  //redirect
			navigate('/courses', { state: {message: 'Curso adicionado com sucesso!'} })
		  })
	  }

	return (
		<div className={styles.newcourse_container}>
			<h1>Adicione o curso</h1>
			<p>Adicione e gerencie as matérias estudadas!</p>
			<CourseForm handleSubmit={createPost} btnText="Adicionar curso"/>
		</div>
	)
}

export default NewCourse
