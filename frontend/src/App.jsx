import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'
import Post from './components/blog/Post'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <>
            <Header/>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/post' element={<Post />} />
                <Route path='/iniciar-sesion' element={<Login />} />
                <Route path='/registrarse' element={<Register />} />
            </Routes>

            <Footer/>
        </>
    )
}

export default App