import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../../redux/store/store'
import { removeUserData } from '../../../../redux/slice/userSlice'
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
  // const {loginData} = useSelector((state: RootState) => state.user)

  // const dispatch = useDispatch()

  // const logout = () => {
  //   dispatch(removeUserData())
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('userData');
  // }
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
