import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Home from './pages/Home'
import DetailsPost from './components/blog/DetailsPost'
import CreatePost from './pages/CreatePost'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <>
            <ScrollToTop/>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/post/:id' element={<DetailsPost />} />
                <Route path='/post/create' element={<CreatePost />} />
                <Route path='/iniciar-sesion' element={<Login />} />
                <Route path='/registrarse' element={<Register />} />
            </Routes>
            <Footer/>
        </>
    )
}

export default App