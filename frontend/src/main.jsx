import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import App from './App.jsx'

import Home from './pages/Home'
import DetailsPost from './components/blog/DetailsPost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute'
import Anonymous from './components/AnonymousRoute.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Outlet/></PrivateRoute>,
                children: [
                    {
                        path: '',
                        element: <Home/>,
                    },
                    {
                        path: 'post/:id',
                        element: <DetailsPost/>,
                    },
                    {
                        path: 'post/create',
                        element: <CreatePost/>
                    },
                    {
                        path: 'post/:id/edit',
                        element: <EditPost/>
                    },
                ]
            },
            {
                path: 'iniciar-sesion',
                element: <Anonymous><Outlet/></Anonymous>,
                children: [
                    {
                        path: '',
                        element: <Login/>
                    },
                ]
            },
            {
                path: 'registrarse',
                element: <Anonymous><Outlet/></Anonymous>,
                children: [
                    {
                        path: '',
                        element: <Register/>
                    }
                ]
            }
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    
        <RouterProvider router={router} />
    
)
