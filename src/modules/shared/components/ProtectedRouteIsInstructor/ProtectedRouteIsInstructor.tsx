import type { RootState } from '../../../../redux/store/store'
import { useSelector } from 'react-redux'
import React from 'react'
import Quizzes from '../../../quizzes/components/Quizzes/Quizzes'

interface props {
    children: React.ReactNode
}

export default function ProtectedRouteIsInstructor({children}: props) {
  const userData = useSelector((state: RootState) => state.user.loginData)

  return (
    userData?.role === 'Instructor' ? children : <Quizzes/>
  )
}
