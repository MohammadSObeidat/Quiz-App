import './JoinQuiz.css'
import { Box, Typography } from '@mui/material'
import logo from '../../../../assets/images/join-logo.png'
import img from '../../../../assets/images/join-quiz.png'
import DoneIcon from '@mui/icons-material/Done'; 
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useJoinQuizMutation } from '../../../../redux/api/apiSlice';
import { toast } from 'react-toastify';
import { OrbitProgress } from 'react-loading-indicators';

interface dataQuizJoin {
    code: string
}

export default function JoinQuiz() {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [joinQuiz] = useJoinQuizMutation()

  const submit = async (data: dataQuizJoin) => {
    try {
        const res = await joinQuiz(data).unwrap(); 
        console.log(res);
        toast.success(res?.message);
        const id = res?.data?.quiz
        navigate('/start-quiz', {state: {id: id}})
    } catch (error: any) {
        toast.error(error?.data?.message)
    }
  }

  return (
    <Container maxWidth="lg" sx={{minHeight:'100vh'}}>
         <Box className="join-quiz-logo pt-5 pb-10">
            <img src={logo} alt="" />
        </Box>
        <Box className="flex items-center">
            <Grid container spacing={8} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                    <Box className="text-center" sx={{marginTop: {lg: '0px', md: '0px', sm: '0px', xs: '50px'}}}>
                        <Typography variant='h4' sx={{fontWeight: 'bold', marginBottom: '45px'}}>Join Quiz</Typography>
                        <Typography variant='body1' sx={{ marginBottom: '15px'}}>Input the code received for the quiz below to join</Typography>
                        <form onSubmit={handleSubmit(submit)}>
                            <Box>
                                <Box className='name-group'>
                                    <Typography className='title-code'>Code</Typography>
                                    <input type="text"
                                    {...register('code', {
                                    required: 'Code is required'
                                    })} 
                                    />
                                </Box>
                                {errors.code && <p className='text-red-700'>{String(errors.code.message)}</p>}
                            </Box>
                            <Box className="flex gap-5 mt-10 justify-center">
                                <Link to={'/quizzes'} className='btn-cancel'><CloseIcon/> Cancel</Link>
                                <button className='btn-start' disabled={isSubmitting}>
                                    {isSubmitting ? '' : <DoneIcon/>}
                                    {isSubmitting ?  <OrbitProgress variant="spokes" color="#f2fbf2" size="small" text="" textColor="" /> : 'Start Quiz'}
                                </button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} sx={{display: {lg: 'block', md: 'block', sm: 'block', xs: 'none'}}}>
                    <Box>
                        <img src={img} alt="" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Container>
  )
}
