import styles from './Courses.module.css'
import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import LinkButton from '../layout/LinkButton.js'
import Container from '../layout/Container'
import CourseCard from '../course/CourseCard'
import Loading from '../layout/Loading'




function Courses() {

const [courses, setCourses] = useState([])
const [removeLoading, setRemoveLoading] = useState(false)
const [courseMessage, setCourseMessage] = useState('')


const location = useLocation()
let message = ''
if(location.state) {
	message = location.state.message
}

useEffect(() => {
	setTimeout(
		() => {
			fetch('http://localhost:5000/courses',{
				method: 'Get',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(resp => resp.json())
			.then(data => {
				setCourses(data)
				setRemoveLoading(true)
			})
			.catch(err => console.log(err))
		},300)
}, [])



function removeCourse (id) {

	fetch(`http://localhost:5000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(resp => resp.json())
	.then(data =>{
		setCourses(courses.filter((course) => course.id !== id))
		setCourseMessage('Projeto removido com sucesso!')
	})
	.catch(err => console.log(err))
}

	return (
	<div className ={styles.course_container}>
		<div className ={styles.title_container}>
			<h1>Cursos</h1>
			<LinkButton to="/newcourse" text="Adicionar curso" />
		</div>
			{message && <Message type ="success" msg ={message} />}
			{courseMessage && <Message type ="success" msg ={courseMessage} />}
			<Container customClass ="start">
				{courses.length > 0 &&
				courses.map((course) => <CourseCard
				name ={course.name}
				id = {course.id}
				platform = {course.platform}
				modules = {course.modules}
				category = {course.category.name}
				key = {course.id}
				handleRemove={removeCourse}
				/> )}
				{!removeLoading && <Loading />}
				{removeLoading && courses.length === 0 && (
					<p>Ainda não há Cursos</p>
				)}
			</Container>
	</div>
	)
}

export default Courses

