import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) return true
    else return false
  })

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {!isAuth && <Outlet/>}
    </>
  )
}
