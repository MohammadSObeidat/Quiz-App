import logo from '../../../../assets/images/Logo-white.png'
import img from '../../../../assets/images/Image.png'
import signin from'../../../../assets/images/sign in.png'
import signup from'../../../../assets/images/sing up light.png'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm } from 'react-hook-form';
import { EmailValidation } from '../../../../services/Validations'
import { useLoginMutation } from '../../../../redux/api/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../../redux/slice/userSlice'
import { OrbitProgress } from 'react-loading-indicators'

interface loginData {
  email: string,
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm();

  const dispatch = useDispatch()

  const [login] = useLoginMutation()

  const handelLogin =  async (data: loginData) => {
    try {
      // Trigger the login mutation and wait for the response
      const res = await login(data).unwrap(); 
      console.log(res);

      const token = res?.data?.accessToken
      localStorage.setItem('token', token)

      const userData = JSON.stringify(res?.data?.profile)
      localStorage.setItem('userData', userData)

      dispatch(setUserData(res?.data?.profile))

      toast.success(res?.message)
      navigate(res?.data?.profile?.role === 'Instructor' ? '/dashboard' : '/quizzes')

    } catch (error: any) {
      toast.error(error?.data?.message)      
    }
  }

  return (
    <Box component="section" sx={{backgroundColor: '#0D1321'}}>
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
          <Grid container spacing={2} sx={{width: '100%', padding: '20px 0'}}>
            <Grid size={{lg: 6, md: 6, sm: 7, xs: 12}}>
              <img className='my-12' src={logo} alt="" />
              <Typography variant='body1' sx={{fontFamily: '"Nunito", serif', fontWeight: 700, fontSize: '25px', color: '#C5D86D'}}>Continue your learning journey with QuizWiz!</Typography>
              <Box className="flex my-8">
                <Link to={'/login'}>
                  <img src={signin} alt="" />
                </Link>
                <Link to={'/register'}>
                  <img src={signup} alt="" />
                </Link>
              </Box>
              <form onSubmit={handleSubmit(handelLogin)}>
                <label className='text-white'>Registered email address</label>
                <Box className="mb-5">
                  <Box className="input-container">
                    <EmailIcon className='text-white icon'/>
                    <input type="email" placeholder='Type your email'
                    {...register('email', EmailValidation)}/>
                  </Box>
                  {errors.email && <p className='text-red-600 mt-1'>{String(errors.email.message)}</p>}
                </Box>
                <label className='text-white'>Password</label>
                <Box className="input-container">
                  <LockIcon className='text-white icon'/>
                  <input type="password" placeholder='Type your password'
                  {...register('password', {
                    required: 'Password is required'
                  })}/>
                </Box>
                {errors.password && <p className='text-red-600 mt-1'>{String(errors.password.message)}</p>}
                <Box className="mt-8 flex justify-between items-center">
                  <Button type='submit' variant="contained" sx={{backgroundColor: '#F5F5F5', color: '#000'}} disabled={isSubmitting}>
                    {/* {isSubmitting && <span className="spinner-border spinner-border-md mr-1 mx-1"></span>} */}
                    {isSubmitting && <OrbitProgress variant="spokes" color="#f2fbf2" size="small" text="" textColor="" />}
                    Sign In <CheckCircleIcon sx={{marginLeft: '5px'}}/>
                  </Button>
                  <Link to={'/forget-password'} className='text-white'>Forgot password? <span style={{color:'#C5D86D'}}>click here</span></Link>
                </Box>
              </form>
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 5, xs: 12}} sx={{display: {lg: 'block', md: 'block', sm: 'block', xs: 'none'}}}>
              <img style={{minHeight: '100%'}} src={img} alt="" />
            </Grid>
          </Grid>
      </Container>
    </Box>
  )
}
