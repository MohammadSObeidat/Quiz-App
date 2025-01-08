import logo from '../../../../assets/images/Logo-white.png'
import img from '../../../../assets/images/Image.png'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useForm } from 'react-hook-form';
import { EmailValidation } from '../../../../services/Validations'
import { useForgotPasswordMutation } from '../../../../redux/api/authSlice'
import { toast } from 'react-toastify'

interface forgotData {
  email: string
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm();

  const [forgotPassword] = useForgotPasswordMutation()

  const handelForgotPassword =  async (data: forgotData) => {
    try {
      // Trigger the login mutation and wait for the response
      const res = await forgotPassword(data).unwrap(); 
      console.log(res);

      toast.success(res?.message)
      navigate('/reset-password', {state: {email: data.email}})

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
              <Typography variant='body1' sx={{fontFamily: '"Nunito", serif', fontWeight: 700, fontSize: '25px', color: '#C5D86D', marginBottom: '70px'}}>Forgot password</Typography>
              
              <form onSubmit={handleSubmit(handelForgotPassword)}>
                <label className='text-white'>Email address</label>
                <Box className="mb-5">
                  <Box className="input-container">
                    <EmailIcon className='text-white icon'/>
                    <input type="email" placeholder='Type your email'
                    {...register('email', EmailValidation)}/>
                  </Box>
                  {errors.email && <p className='text-red-600 mt-1'>{String(errors.email.message)}</p>}
                </Box>
                <Box className="mt-8 flex justify-between">
                  <Button type='submit' variant="contained" sx={{backgroundColor: '#F5F5F5', color: '#000'}} disabled={isSubmitting}>
                    {isSubmitting && <span className="spinner-border spinner-border-md mr-1 mx-1"></span>}
                    Send email <CheckCircleIcon sx={{marginLeft: '5px'}}/>
                  </Button>
                  <Link to={'/login'} className='text-white'>Login? <span style={{color:'#C5D86D'}}>click here</span></Link>
                </Box>
              </form>
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 5, xs: 12}}>
              <img style={{minHeight: '100%'}} src={img} alt="" />
            </Grid>
          </Grid>
      </Container>
    </Box>
  )
}
