import './StartQuiz.css'
import { Box, Typography } from '@mui/material'
import logo from '../../../../assets/images/Logo-white.png'
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useQuestionsWithoutAnswersQuery, useSubmitQuizMutation } from '../../../../redux/api/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface questions {
    question: string,
    answer: string
}

interface dataQuiz {
    answers: questions[]
}

interface questionData {
    _id: string
}

interface options {
    A: string,
    B: string,
    C: string,
    D: string
}

interface questionsData {
    _id: string,
    title: string,
    options: options
}

export default function StartQuiz() {
    const location = useLocation()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue 
      } = useForm();

    const {id} = location.state
    const {data, isLoading} = useQuestionsWithoutAnswersQuery(id)

    const [submitQuiz] = useSubmitQuizMutation()

    const submit = async (data: dataQuiz) => {
        try {
            const res = await submitQuiz({id, data}).unwrap(); 
            console.log(res);
            toast.success(res?.message);
            navigate('/quizzes')
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
        
    }

    useEffect(() => {
        if (data) {
          // Dynamically register the answers for each question
          data.data.questions.forEach((question: questionData, index: number) => {
            setValue(`answers[${index}].question`, question._id); // Set question ID
            setValue(`answers[${index}].answer`, ''); // Initialize with empty answer
          });          
        }
      }, [data, setValue]);

    if (isLoading) return <Typography>Loading Data ...</Typography>

  return (
    <Box sx={{backgroundColor: '#000', minHeight: '100vh', padding: {lg: '20px', md: '20px', sm: '10px', xs: '0px'}}}>
        <Box>
            <img src={logo} alt="" />
        </Box>
        <Container maxWidth="lg">
            <Box sx={{ bgcolor: '#fff', minHeight: '100vh', borderRadius: '15px',padding: '20px'}}>
                <Typography sx={{fontSize: '20px', fontWeight: 'bold',marginBottom: '20px'}}>{data?.data?.title}</Typography>
                <form onSubmit={handleSubmit(submit)}>
                    <Box className="cards-start-quiz grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5">
                        {data.data.questions.map((data: questionsData, index: number) => {
                            return  <Box className="card-start-quiz p-5">
                                        <Typography sx={{fontSize: '16px', fontWeight: 'bold',marginBottom: '20px'}}>01</Typography>
                                        <Typography sx={{fontSize: '16px', fontWeight: 'bold',marginBottom: '20px'}}>{data?.title} ?</Typography>
                                        <Typography sx={{fontSize: '12px', color: '#6F7881',marginBottom: '10px'}}>Choose the correct Answer</Typography>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    value={undefined} // Initially no value is selected
                                                    onChange={(e) => setValue(`answers[${index}].answer`, e.target.value)} // Update the answer value
                                                    >
                                                    {/* Register hidden question ID */}
                                                    <input type="text" value={data._id}  {...register(`answers[${index}].question`)}  style={{display: 'none'}}/>
                                                    <FormControlLabel value='A' control={<Radio />} label={data.options.A} />
                                                    <FormControlLabel value='B' control={<Radio />} label={data.options.B} />
                                                    <FormControlLabel value='C' control={<Radio />} label={data.options.C} />
                                                    <FormControlLabel value='D' control={<Radio />} label={data.options.D} />
                                                </RadioGroup>
                                            </FormControl>
                                    </Box>
                        })}
                    </Box>
                    <Box className="text-center">
                        <button className='btn-end-quiz'>Submit</button>
                    </Box>
                </form>
            </Box>
        </Container>
    </Box>
  )
}
