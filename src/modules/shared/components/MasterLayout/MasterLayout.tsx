import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../../redux/store/store'
import { removeUserData } from '../../../../redux/slice/userSlice'

export default function MasterLayout() {
  const {loginData} = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeUserData())
    localStorage.removeItem('token')
    localStorage.removeItem('userData');
  }
  return (
    <div>
      <h1>{loginData?.first_name}</h1>
      <button onClick={logout}>log out</button>
    </div>
  )
}
