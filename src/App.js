import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from 'react-router-dom'


  import Home from './components/pages/Home'
  import NewCourse from './components/pages/NewCourse'
  import Courses from './components/pages/Courses'
  import Course from './components/pages/Course'
  import Company from './components/pages/Company'
  import Contact from './components/pages/Contact'

  import Navbar from './components/layout/Navbar'
  import Footer from './components/layout/Footer'
  import Container from './components/layout/Container'

  function App() {
	return (
	  <Router>
		  <Navbar />
		  <Container customClass="min-height">
			  <Routes>
				  <Route path="/" element={<Home />} />
				  <Route path="/contact" element={<Contact />} />
				  <Route path="/company" element={<Company />} />
				  <Route path="/courses" element={<Courses />} />
				  <Route path="/newcourse" element={<NewCourse />} />
				  <Route path="/course/:id" element={<Course />} />
			  </Routes>
		  </Container>
		  <Footer />
	  </Router>
	)
  }

  export default App
