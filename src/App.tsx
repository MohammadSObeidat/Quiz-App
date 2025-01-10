import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Login from './modules/authentication/components/Login/Login'
import Register from './modules/authentication/components/Register/Register'
import ForgotPassword from './modules/authentication/components/ForgotPassword/ForgotPassword'
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword'
import NotFound from './modules/shared/components/NotFound/NotFound'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';
import Groups from './modules/groups/components/Groups/Groups'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login/>},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Register/>},
        {path: 'forget-password', element: <ForgotPassword/>},
        {path: 'reset-password', element: <ResetPassword/>}
      ]
    },
    {
      path: '/',
      element:  <ProtectedRoute>
                  <MasterLayout/> 
                </ProtectedRoute>,
      children: [
        {index: true, element: <Dashboard/>},
        {path: 'dashboard', element: <Dashboard/>},
        {path: 'groups', element: <Groups/>},
      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
