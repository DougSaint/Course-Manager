import styles from './CourseForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton.js'
import { useEffect, useState } from 'react'

function CourseForm({ handleSubmit, courseData, btnText }) {

	const [course, setCourse] = useState(courseData || {})
	const [categories, setCategories] = useState([])

	useEffect(() =>{
		fetch("http://localhost:5000/categories",{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then((resp) => resp.json())
	.then((data) => {
		setCategories(data)
	})
	.catch((err) => console.log(err))
	}, [])

	const submit = (e) => {
		e.preventDefault()
		handleSubmit(course)
	  }

	  function handleChange(e) {
		setCourse({ ...course, [e.target.name]: e.target.value })
	  }

	  function handleCategory(e) {
		setCourse({
		  ...course,
		  category: {
			id: e.target.value,
			name: e.target.options[e.target.selectedIndex].text,
		  },
		})
	  }

	return (
		<form onSubmit ={submit} className={styles.form}>
			<div>
			<Input
				type="text"
				text="Defina um nome"
				name="name"
				placeholder="Insira o nome"
				handleOnChange={handleChange}
				value={course.name ?? ''}
				/>
			</div>
			<div>
			<Input
				type="text"
				text="Em qual plataforma pretende fazer?"
				name="platform"
				placeholder="ex: Dio,Udemy,rocketseat..."
				handleOnChange={handleChange}
				value={course.platform ?? ''}
				/>
			</div>
			<div>
			<Input
				type="number"
				text="Quantos modulos?"
				name="modules"
				placeholder="Quantidade de modulos."
				handleOnChange={handleChange}
				value={course.modules ?? ''}
				/>
			</div>
			<div>
				<Select
				name ="category_id"
				text ="Selecione a categoria: "
				options={categories}
				handleOnchange={handleCategory}
				value = {course.category ? course.category.id : ''}
				/>
			</div>
			<div>
				<SubmitButton text={btnText}/>
			</div>
		</form>
	)
}

export default CourseForm
