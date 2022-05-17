import styles from '../course/CourseForm.module.css'
import {useState} from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


export default function ModuleForm({handleSubmit, btnText, courseData}){

	const [module, setModule] = useState({})


	function submit(e){
		e.preventDefault()
		courseData.subjects.push(module)
		handleSubmit(courseData)
	}
	function handleChange(e){

		setModule({ ...module, [e.target.name]: e.target.value})
	}

	return (
		<form onSubmit={submit} className ={styles.form}>
			<Input
			type ="text"
			text="Nome do modulo:"
			name ="name"
			placeholder="Insira o nome do modulo"
			 handleOnChange={handleChange}
			 />
			<Input
			type ="number"
			text="Tempo do modulo em horas:"
			name ="module_time"
			placeholder="Tempo do modulo em horas..."
			 handleOnChange={handleChange}
			 />
			<Input
			type ="text"
			text="Tecnologias usadas:"
			name ="description"
			placeholder="Temas abordados..."
			handleOnChange={handleChange}
			 />
			<SubmitButton text={btnText}/>
		</form>
	)
}
