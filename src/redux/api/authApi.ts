import { toast } from "react-toastify";
import { AUTH_URL, axiosInstanceURL } from "../../services/Endpoints";
import {login} from '../slice/authSlice'
import { useNavigate } from "react-router-dom"; 

interface loginData {
  email: string,
  password: string
}

export function loginUser(data: loginData, navigate: any) {
    return async (dispatch: any) => {
        try {
          const res = await axiosInstanceURL.post(AUTH_URL.LOGIN, data)
          console.log(res);
          // Get the user profile from the response
          const userProfile = res?.data?.data?.profile;
          dispatch(login(userProfile)); // Update state with user profile

          // Get and store the token in localStorage
          const token = res?.data?.data?.accessToken;
          localStorage.setItem('token', token);

          toast.success(res?.data?.message)

          navigate('/dashboard');
        } catch (error: any) {
          toast.error(error?.response?.data?.message)
        }
    }
}