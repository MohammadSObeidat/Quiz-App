import React from "react"
import { Navigate } from "react-router-dom"

type props = {
    children: React.ReactNode
}

export default function ProtectedRoute({children}: props) {
    const token = localStorage.getItem('token')
  return (
    <div>
      {token ? children : <Navigate to={'/login'}/>}
    </div>
  )
}
