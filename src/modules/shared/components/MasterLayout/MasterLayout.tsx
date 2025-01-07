import { useSelector } from 'react-redux'
import type { RootState } from '../../../../redux/store/store'

export default function MasterLayout() {
  const loginData = useSelector((state: RootState) => state.auth.loginData)
  console.log(loginData);
  
  return (
    <div>
      <h1>{loginData?.first_name}</h1>
    </div>
  )
}
