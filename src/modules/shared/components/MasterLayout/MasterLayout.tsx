import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MasterLayout() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) return true
    else return false
  })

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])
  
  return (
    isAuth && <Box component="section">
                <Box className="navbar">
                  <Navbar/>
                </Box>
                <Box className="container flex">
                  <Box>
                    <SideBar/>
                  </Box>
                  <Box className="bg-white w-full">
                    <Outlet/>
                  </Box>
                </Box>
              </Box>
  )
}
