import logo from '../../../../assets/images/Logo-white.png'
import img from '../../../../assets/images/Image.png'
import signin from'../../../../assets/images/sign in light.png'
import signup from'../../../../assets/images/sign up.png'
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
import { useCreateUserMutation } from '../../../../redux/api/authSlice'
import { toast } from 'react-toastify'
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { OrbitProgress } from 'react-loading-indicators';

interface registerData {
  first_name:string,
  last_name:string,
  email: string,
  role: string,
  password: string
}

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm();

  const [createUser] = useCreateUserMutation()

  const handelRegister =  async (data: registerData) => {
    try {
      // Trigger the login mutation and wait for the response
      const res = await createUser(data).unwrap(); 
      console.log(res);

      toast.success(res?.message)
      navigate('/login')

    } catch (error: any) {
      const errors = error?.data?.message
      for (const error of errors) {
        toast.error(error)   
      }
      // console.log(error);
    }
  }

  return (
    <Box component="section" sx={{backgroundColor: '#0D1321'}}>
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
          <Grid container spacing={2} sx={{width: '100%', padding: '20px 0'}}>
            <Grid size={{lg: 6, md: 6, sm: 7, xs: 12}}>
              <img className='my-12' src={logo} alt="" />
              <Typography variant='body1' sx={{fontFamily: '"Nunito", serif', fontWeight: 700, fontSize: '25px', color: '#C5D86D'}}>Create your account and start using QuizWiz!</Typography>
              <Box className="flex my-8">
                <Link to={'/login'}>
                  <img src={signin} alt="" />
                </Link>
                <Link to={'/register'}>
                  <img src={signup} alt="" />
                </Link>
              </Box>
              <form onSubmit={handleSubmit(handelRegister)}>
                <Grid container spacing={2} sx={{marginBottom: '20px'}}>
                  <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                    <label className='text-white'>Your first name</label>
                    <Box className="input-container">
                      <PersonIcon className='text-white icon'/>
                      <input type="text" placeholder='Type your first name'
                      {...register('first_name', {
                        required: 'First name is required'
                      })}/>
                    </Box>
                    {errors.first_name && <p className='text-red-600 mt-1'>{String(errors.first_name.message)}</p>}
                  </Grid>
                  <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                    <label className='text-white'>Your last name</label>
                    <Box className="input-container">
                      <PersonIcon className='text-white icon'/>
                      <input type="text" placeholder='Type your last name'
                      {...register('last_name', {
                        required: 'Last name is required'
                      })}/>
                    </Box>
                    {errors.last_name && <p className='text-red-600 mt-1'>{String(errors.last_name.message)}</p>}
                  </Grid>
                </Grid>
                <label className='text-white'>Your email address</label>
                <Box className="mb-5">
                  <Box className="input-container">
                    <EmailIcon className='text-white icon'/>
                    <input type="email" placeholder='Type your email'
                    {...register('email', EmailValidation)}/>
                  </Box>
                  {errors.email && <p className='text-red-600 mt-1'>{String(errors.email.message)}</p>}
                </Box>
                <label className='text-white'>Your role</label>
                <Box className="mb-5">
                  <Box className="input-container">
                    <AccountCircleIcon className='text-white icon'/>
                    <select className='select' {...register('role', {
                      required: 'role is required'
                    })}>
                      <option value="Instructor">Instructor</option>
                      <option value="Student" selected>Student</option>
                    </select>
                  </Box>
                  {errors.role && <p className='text-red-600 mt-1'>{String(errors.role.message)}</p>}
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
                <Box className="mt-8">
                  <Button type='submit' variant="contained" sx={{backgroundColor: '#F5F5F5', color: '#000'}} disabled={isSubmitting}>
                    {/* {isSubmitting && <span className="spinner-border spinner-border-md mr-1 mx-1"></span>} */}
                    {isSubmitting && <OrbitProgress variant="spokes" color="#f2fbf2" size="small" text="" textColor="" />}
                    Sign Up <CheckCircleIcon sx={{marginLeft: '5px'}}/>
                  </Button>
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
