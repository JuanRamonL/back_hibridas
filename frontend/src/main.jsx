import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home'
import DetailsPost from './components/blog/DetailsPost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Anonymous from './components/AnonymousRoute'
import RoleBasedRoute from './components/RoleBasedRoute'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import DashboardPosts from './pages/DashboardPosts.jsx'
import DashboardUsers from './pages/DashboardUsers.jsx'
import EditUser from './pages/EditUser.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import CreatePostIA from './pages/CreatePostIA.jsx'


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
                        path: 'perfil/:id',
                        element: <Profile/>,
                    },
                    {
                        path: 'perfil/:id/editar',
                        element: <EditProfile/>
                    },
                    {
                        path: 'post/:id',
                        element: <DetailsPost/>,
                    },
                    {
                        path: 'post',
                        element: <RoleBasedRoute><Outlet/></RoleBasedRoute>,
                        children: [
                            {
                                path: 'crear',
                                element: <CreatePost/>
                            },
                            {
                                path: 'crearIA',
                                element: <CreatePostIA/>
                            },
                            {
                                path: ':id/editar',
                                element: <EditPost/>
                            },
                            {
                                path: ':id/eliminar',
                                element: <DeletePost/>
                            }
                        ]
                    },
                    {
                        path: 'dashboard',
                        element: <RoleBasedRoute><Outlet/></RoleBasedRoute>,
                        children: [
                            {
                                path: 'posteos',
                                element: <DashboardPosts/>
                            },
                            {
                                path: 'usuarios',
                                element: <DashboardUsers/>
                            }
                        ]
                    },
                    {
                        path: 'usuario/:id',
                        element: <RoleBasedRoute><Outlet/></RoleBasedRoute>,
                        children: [
                            {
                                path: 'editar',
                                element: <EditUser/>
                            }
                        ]
                    }
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
            },
            {
                path: 'recuperar-contraseña',
                element: <Anonymous><Outlet/></Anonymous>,
                children: [
                    {
                        path: '',
                        element: <ForgotPassword/>
                    }
                ]
            },
            {
                path: 'recuperar-clave/:id/:token',
                element: <Anonymous><Outlet/></Anonymous>,
                children: [
                    {
                        path: '',
                        element: <ResetPassword/>
                    }
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
