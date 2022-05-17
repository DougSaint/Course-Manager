import { v4 as uuidv4} from 'uuid'
import styles from './Course.module.css'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import CourseForm from '../course/CourseForm'
import Message from '../layout/Message'
import ModuleForm from '../modules/ModuleForm'
import ModuleCard from '../modules/ModuleCard'


export default function Course(){
	const { id } = useParams()
	const [course, setCourse] = useState([])
	const [subjects, setSubjects] = useState([])
	const [showCourseForm, setShowCourseForm] = useState(false)
	const [showModuleForm, setShowModuleForm] = useState(false)
	const [message, setMessage] = useState()
	const [type, setType] = useState()

	useEffect(() => {
		setTimeout(() =>{
			fetch(`http://localhost:5000/courses/${id}`, {
				method: 'GET',
				headers: {
				  'Content-Type': 'application/json',
				},
			  }).then((resp) => resp.json())
			  .then((data) => {
				  setCourse(data)
				  setSubjects(data.subjects)
			  }).catch(err => console.log(err))
		},1000)
	}, [id])


	function editPost(course){
		setMessage('')
	/*		if(project.modules < project.services.length){
				setMessage('A quantidade de modulos não pode ser menor que os que já foram definidos')
				setType('error')
				return false
			}*/
				fetch(`http://localhost:5000/courses/${id}`, {
				method: 'PATCH',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(course),
			})
			.then(resp => resp.json())
			.then((data) => {
				setCourse(data)
				setShowCourseForm(!showCourseForm)
				setMessage('Curso atualizado')
				setType('success')
			})
			.catch(err => console.log(err))
	}

	function removeModule(id){
		setMessage('')
		const modulesUpdate = course.subjects.filter(
			(subject) => subject.id !== id)
			const courseUpdated = course

			courseUpdated.subjects = modulesUpdate
			console.log(courseUpdated)
			fetch(`http://localhost:5000/courses/${courseUpdated.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(courseUpdated),
			})
			.then((resp) => resp.json())
			.then((data) => {
				setCourse(courseUpdated)
				setSubjects(modulesUpdate)
				setMessage('Modulo removido com sucesso!')
			})
			.catch(err => console.log(err))
	}

	function toggleCourseForm(){
		setShowCourseForm(!showCourseForm)
	}
	function toggleServiceForm(){
		setShowModuleForm(!showModuleForm)
	}

	function createModule(course) {
		setMessage('')

		const lastModule = course.subjects[course.subjects.length -1]


		const numberModules = course.subjects.length

		lastModule.id = uuidv4()
		const maxModules = parseInt(course.modules)
		if (maxModules < numberModules){
			setMessage('Erro, você incluiu mais modulos, do que o curso possui.')
			setType('error')
			course.subjects.pop()
			return (false)
			//Update modules//
		}

			fetch(`http://localhost:5000/courses/${course.id}`,{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(course)
			})
			.then((resp) => resp.json())
			.then((data) =>{
				setSubjects(data.subjects)
				setShowModuleForm(!showModuleForm)
				setMessage('Serviço adicionado!')
				setType('success')
			})
			.catch(err => console.log(err))
		}

	return (
		<>{course.name ? (
			<div className = {styles.course_details}>
				<Container customClass = "column">
					{message && <Message type={type} msg ={message}/>}
					<div className = {styles.details_container}>
						<h1>{course.name}</h1>
						<button className ={styles.btn} onClick={toggleCourseForm}>
							{!showCourseForm ? 'Editar curso' :'Fechar' }
							</button>
						{!showCourseForm ? (
							<div className= {styles.course_info}>
								<p>
									<span>Voltado para: </span>{course.category.name}
								</p>
								<p>
									<span>Plataforma: </span>{course.platform}
								</p>
								<p>
									<span>Modulos: </span>{course.modules}
								</p>
							</div>
						) : (
						<div className= {styles.course_info}>
								<CourseForm
								handleSubmit={editPost}
								btnText="Concluir edição"
								courseData={course}/>
						</div>
						)}
					</div>
						<div className={styles.modules_form_container}>
							<h2>Adicione um modulo</h2>
							<button className ={styles.btn} onClick={toggleServiceForm}>
								{!showModuleForm ? 'Adicionar Modulo' :'Fechar' }
							</button>
							<div className={styles.course_info}>
								{showModuleForm && <div>
								<ModuleForm
								handleSubmit={createModule}
								btnText="Adicionar modulo"
								courseData ={course}/></div>}
							</div>
						</div>
							<h2>Modulos</h2>
							<Container customClass ="start">
							{subjects.length > 0 && subjects.map((subject) => (
								<ModuleCard
								id = {subject.id}
								name = {subject.name}
								description = {subject.description}
								time = {subject.module_time}
								key = {subject.id}
								handleRemove={removeModule}
								/>
								))
							}


							{subjects.length === 0 && <p>Não há modulos cadastrados.</p>}
							</Container>
				</Container>
			</div>
		): (
			<Loading />)}</>
	)
}
