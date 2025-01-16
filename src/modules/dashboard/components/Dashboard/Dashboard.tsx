import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import img from '../../../../assets/images/img.png'
import user from '../../../../assets/images/user img.png'
import Divider from '@mui/material/Divider';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useQuizIncommingQuery, useTopFiveStudentQuery } from '../../../../redux/api/apiSlice';
import { Link } from 'react-router-dom';

interface quizData {
  _id: string,
  title: string,
  schadule: string
}

interface studentData {
  first_name: string,
  last_name: string,
  avg_score: number
}

export default function Dashboard() {
  const {data: quizzes, isLoading: isLoadingQuiz} = useQuizIncommingQuery()
  const {data: students, isLoading: isLoadingStudent} = useTopFiveStudentQuery()

  if (isLoadingQuiz) return <Typography>Loading quizzes and students...</Typography>;
  if (isLoadingStudent) return <Typography>Loading students...</Typography>;

  return (
    <Box component="section" sx={{padding: '30px'}}>
       <Grid container spacing={4}>
        <Grid size={{lg: 6, md: 6, sm:6, xs: 12}}>
          <Box className="quizzes" sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '15px'}}>
            <Box className="flex items-center justify-between pb-4">
              <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: '20px'}}>Upcoming 5 quizzes</Typography>
              <Link to={'/quizzes'}>
                <Typography className='flex items-center gap-1' variant='body1' sx={{fontSize: '12px'}}>Quiz directory <ArrowRightAltIcon sx={{color: '#C5D86D', fontSize: '30px'}}/></Typography>
              </Link>
            </Box>
            <Box className="cards flex flex-col gap-4">
              {quizzes.map((quiz: quizData) => {
                return  <Box className="card flex items-center gap-5" sx={{border: '1px solid #00000033', borderRadius: '10px'}}>
                          <Box sx={{backgroundColor: '#FFEDDF', p: 2, borderRadius: '10px'}}>
                            <img style={{minWidth: '92px', maxWidth: '92px', minHeight: '92px', maxHeight: '92px'}} src={img} alt="" />
                          </Box>
                          <Box className="w-full">
                            <Typography variant='body1' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: '18px'}}>{quiz.title}</Typography>
                            <Box sx={{display: 'flex', marginBottom: '20px'}}>
                              <Typography className='pr-4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: '14px'}}>{new Date(quiz.schadule).toISOString().split('T')[0]}</Typography>
                              <Divider orientation="vertical" variant="fullWidth" flexItem />
                              <Typography className='pl-4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: '14px'}}>{new Date(quiz.schadule).toISOString().split('T')[1].replace('00.000Z', '')} AM</Typography>
                            </Box>
                            <Box className="flex justify-between">
                              <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px'}}>No. of student’s enrolled: 32</Typography>
                              <Link to={`/quiz-details/${quiz._id}`}>
                                <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: '14px', marginRight: '20px'}}>Open <ArrowCircleRightIcon sx={{color: '#C5D86D'}}/></Typography>
                              </Link>
                            </Box>
                          </Box>
                        </Box>
              })}
              
            </Box>
          </Box>
        </Grid>

        <Grid size={{lg: 6, md: 6, sm:6, xs: 12}}>
          <Box className="students" sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '15px'}}>
            <Box className="flex items-center justify-between pb-4">
              <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: '20px'}}>Top 5 Students</Typography>
              <Link to={'/students'}>
                <Typography className='flex items-center gap-1' variant='body1' sx={{fontSize: '12px'}}>All Students  <ArrowRightAltIcon sx={{color: '#C5D86D', fontSize: '30px'}}/></Typography>
              </Link>
            </Box>
            <Box className="cards flex flex-col gap-4">
              {students.map((student: studentData) => {
                return  <Box className="card flex items-center gap-5" sx={{border: '1px solid #00000033', borderRadius: '10px'}}>
                          <Box sx={{ borderRadius: '10px'}}>
                            <img style={{minWidth: '70px', maxWidth: '70px', minHeight: '70px', maxHeight: '70px'}} src={user} alt="" />
                          </Box>
                          <Box>
                            <Typography variant='body1' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: '18px'}}>{student.first_name} {student.last_name}</Typography>
                            <Box sx={{display: 'flex'}}>
                              <Typography className='pr-4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: '14px'}}>Class rank: 2nd</Typography>
                              <Divider orientation="vertical" variant="fullWidth" flexItem />
                              <Typography className='pl-4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: '14px'}}>Average score: {student.avg_score}%</Typography>
                            </Box>
                          </Box>
                        </Box>
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
