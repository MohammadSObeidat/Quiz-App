import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../../redux/store/store'
import { logout } from '../../../../redux/slice/userSlice'

export default function MasterLayout() {
  const {loginData} = useSelector((state: RootState) => state.userData)

  const dispatch = useDispatch()

  const logoutt = () => {
    dispatch(logout())
  }
  return (
    <div>
      <h1>{loginData?.first_name}</h1>
      <button onClick={logoutt}>log out</button>
    </div>
  )
}
