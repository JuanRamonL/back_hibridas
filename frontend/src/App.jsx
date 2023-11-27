import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
    return (
        <>
            <ScrollToTop/>
            <Header/>
            <Outlet />
            <Footer/>
        </>
    )
}

export default App