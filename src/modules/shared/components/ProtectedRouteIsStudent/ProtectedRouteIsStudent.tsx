import type { RootState } from '../../../../redux/store/store'
import { useSelector } from 'react-redux'
import NotFound from '../NotFound/NotFound'

interface props {
    children: React.ReactNode
}

export default function ProtectedRouteIsStudent({children}: props) {
    
  const userData = useSelector((state: RootState) => state.user.loginData)

  return (
    userData?.role === 'Student' ? children : <NotFound/>
  )
}
