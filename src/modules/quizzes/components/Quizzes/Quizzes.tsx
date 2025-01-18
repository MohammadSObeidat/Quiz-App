import './Quizzes.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import { Typography } from '@mui/material';
import CommentBankOutlinedIcon from '@mui/icons-material/CommentBankOutlined';
import Divider from '@mui/material/Divider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import img from '../../../../assets/images/img.png'
import { useCreateQuizMutation, useGetGroupsQuery, useGetQuizzesQuery, useQuizCompletedQuery } from '../../../../redux/api/apiSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ThreeDot } from 'react-loading-indicators';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface quizzesData {
    title: string,
    description: string,
    duration: string,
    questions_number: number,
    score_per_question: string,
    schadule: string,
    difficulty: string,
    type: string,
    group: string,
}

interface groupData {
    _id: string,
    name: string
}

interface quizData {
    _id: string,
    title: string,
    schadule: string
}

interface quizCompletedData {
    title: string,
    status: string,
    schadule: string,
    closed_at: string
}

export default function Quizzes() {
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [code, setCode] = useState(null);
  const [id, setId] = useState<string | null>(null);
  const inputRef = useRef(null);
  
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm();

  const {data: dataQuizCompleted, isLoading: isLoadingQuizCompleted} = useQuizCompletedQuery()  
  const {data: dataGroups, isLoading: isLoadingGroups} = useGetGroupsQuery()
  const {data: dataQuizzes, isLoading: isLoadingQuizzes} = useGetQuizzesQuery()

  const [createQuiz] = useCreateQuizMutation()
  
  const handleClickOpen = (id?: string) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //  Create new Quiz
    const handleQuizzes = async (data: quizzesData) => {
      try {
        const res = await createQuiz(data).unwrap(); 
        setIsShow(true)
        console.log(res);
        setCode(res?.data?.code)
        toast.success(res?.message);
        handleClose();
        
        // Reset the form fields
        reset({
          title: '',
          description: '',
          duration: '',
          questions_number: '',
          score_per_question: '',
          schadule: ''
        });
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }

    const copyCode = () => {
        inputRef.current.select(); // Select the input value
        // document.execCommand('copy');
        // or 
        navigator.clipboard.writeText(inputRef.current.value)
    }


  if (isLoadingQuizCompleted) return <Typography>Loading Quiz Completed ...</Typography>
  if (isLoadingGroups) return <Typography>Loading Quiz Completed ...</Typography>
  if (isLoadingQuizzes) return <Typography>Loading Quiz Completed ...</Typography>

  return (
    <>
    {/* ========================== Create Quiz ======================== */}
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{
            '& .MuiDialog-paper': {
                width: '900px',  // Set the desired width of the dialog
                maxWidth: 'none', // Optional, disables maxWidth limitation
            }
            }}
        >
            <form onSubmit={handleSubmit(handleQuizzes)}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {id ? 'Set up a edit quiz' : 'Set up a new quiz'}
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
            >
            <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Box className="pt-5 pb-10">
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title'>Title</Typography>
                            <input type="text"
                            {...register('title', {
                                required: 'Title is required'
                            })} />
                            </Box>
                            {errors.title && <p className='text-red-700'>{String(errors.title.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title title-w'>Duration (minutes)</Typography>
                            <input type="text"
                            {...register('duration', {
                                required: 'Duration is required'
                            })} />
                            </Box>
                            {errors.duration && <p className='text-red-700'>{String(errors.duration.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title title-w'>Question number</Typography>
                            <input type="text"
                            {...register('questions_number', {
                                required: 'Questions number is required'
                            })} />
                            </Box>
                            {errors.questions_number && <p className='text-red-700'>{String(errors.questions_number.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title title-w'>Score per question</Typography>
                            <input type="text"
                            {...register('score_per_question', {
                                required: 'Score per question is required'
                            })} />
                            </Box>
                            {errors.score_per_question && <p className='text-red-700'>{String(errors.score_per_question.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title'>Description</Typography>
                            <textarea {...register('description')}></textarea>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{lg: 9, md:9, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title'>Schedule</Typography>
                            <input type="datetime-local"
                            {...register('schadule', {
                                required: 'Schadule is required'
                            })} />
                            </Box>
                            {errors.schadule && <p className='text-red-700'>{String(errors.schadule.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title title-w'>Difficulty level</Typography>
                            <select {...register('difficulty', {
                                required: 'Difficulty is required'
                            })}>
                                <option value="easy" selected>Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            </Box>
                            {errors.difficulty && <p className='text-red-700'>{String(errors.difficulty.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title title-w'>Category type</Typography>
                            <select {...register('type', {
                                required: 'Type is required'
                            })}>
                                <option value="FE" selected>FE</option>
                                <option value="BE">BE</option>
                            </select>
                            </Box>
                            {errors.type && <p className='text-red-700'>{String(errors.type.message)}</p>}
                        </Box>
                    </Grid>
                    <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                        <Box>
                            <Box className='name-question'>
                            <Typography className='title title-w'>Group name</Typography>
                            <select {...register('group', {
                                required: 'group is required'
                            })}>
                                {dataGroups.map((group: groupData) => {
                                    return <option value={group._id}>{group.name}</option>
                                })}
                            </select>
                            </Box>
                            {errors.group && <p className='text-red-700'>{String(errors.group.message)}</p>}
                        </Box>
                    </Grid>
                </Grid>               
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'end', marginTop: '10px'}}>
                    <button className='btn-action' disabled={isSubmitting}>
                    {id ? 'Update' : 'Create'}
                    {isSubmitting && <Typography sx={{marginLeft: '10px', display: 'inline'}}><ThreeDot color="#e9f3e9" size="small" text="" textColor="" /></Typography>}
                    </button>
                </Box>
            </DialogContent>
            </form>
        </BootstrapDialog>

    {/* ========================== Code =========================== */}
      <BootstrapDialog
        onClose={() => setIsShow(false)}
        aria-labelledby="customized-dialog-title"
        open={isShow}
        sx={{
            '& .MuiDialog-paper': {
                width: '400px',  // Set the desired width of the dialog
                maxWidth: 'none', // Optional, disables maxWidth limitation
            }
            }}
      >
        <DialogContent dividers sx={{textAlign: 'center'}}>
            <CheckCircleIcon sx={{fontSize: '50px'}}/>
            <Typography sx={{fontSize: '20px', marginBlock: '15px', fontWeight: 'bold'}}>Quiz was successfully created</Typography>
            <Box className='name-question w-60 mx-16'>
                <Typography className='title'>CODE</Typography>
                <Box className="input-code">
                    <input type="text" value={code} ref={inputRef} disabled/>
                    <button onClick={copyCode}>
                        <ContentCopyIcon className='copy-icon'/>
                    </button>
                </Box>
            </Box>
            <button className='btn-code' onClick={() => setIsShow(false)}>Close</button>
        </DialogContent>
      </BootstrapDialog>

        <Box sx={{padding: {lg: '20px', md: '20px', sm: '15px', xs:'15px'}}}>
        <Grid container spacing={2}>
            <Grid size={{lg: 6, md: 6, sm: 6, xs: 12}}>
                <Box className="grid-one-container">
                    <button className='grid-one-link' onClick={() => handleClickOpen()}>
                        <Box className="grid-one">
                            <AddAlarmIcon sx={{fontSize: '60px'}}/>
                            <Typography className='grid-one-title'>Set up a new quiz</Typography>
                        </Box>
                    </button>
                    <Link to={'/questions'} className='grid-one-link'>
                        <Box className="grid-one">
                            <CommentBankOutlinedIcon sx={{fontSize: '60px'}}/>
                            <Typography className='grid-one-title'>Question Bank</Typography>
                        </Box>
                    </Link>
                </Box>
            </Grid>

            <Grid size={{lg: 6, md: 6, sm: 6, xs: 12}}>
                <Box className="quizzes" sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '15px'}}>
                    <Box className="flex items-center justify-between pb-4">
                    <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: {lg: '20px', md: '20px', sm: '15px', xs: '15px'}}}>Upcoming quizzes</Typography>
                    </Box>
                    <Box className="cards flex flex-col gap-4">
                    {dataQuizzes.map((quiz: quizData) => {
                        return  <Box className="card flex items-center gap-5" sx={{border: '1px solid #00000033', borderRadius: '10px'}}>
                                <Box sx={{backgroundColor: '#FFEDDF', p: 2, borderRadius: '10px'}}>
                                    <img style={{minWidth: '92px', maxWidth: '92px', minHeight: '92px', maxHeight: '92px'}} src={img} alt="" />
                                </Box>
                                <Box className="w-full">
                                    <Typography variant='body1' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: {lg: '18px', md:'18px', sm: '15px', xs: '15px'}}}>{quiz.title}</Typography>
                                    <Box sx={{display: 'flex', marginBottom: '20px'}}>
                                    <Typography className='pr-4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: {lg: '14px', md: '12px', sm: '12px', xs: '12px'}}}>{new Date(quiz.schadule).toISOString().split('T')[0]}</Typography>
                                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                                    <Typography className='pl-4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: {lg: '14px', md: '12px', sm: '12px', xs: '12px'}}}>{new Date(quiz.schadule).toISOString().split('T')[1].replace('00.000Z', '')} AM</Typography>
                                    </Box>
                                    <Box className="flex justify-between">
                                        <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 700, fontSize: {lg: '14px', md: '12px', sm: '12px', xs: '12px'}}}>No. of student’s enrolled: 32</Typography>
                                        <Link to={`/quiz-details/${quiz._id}`}>
                                            <Typography variant='h4' sx={{fontFamily: 'Nunito', fontWeight: 400, fontSize: {lg: '14px', md: '12px', sm: '12px', xs: '12px'}, marginRight: '20px'}}>Open <ArrowCircleRightIcon sx={{color: '#C5D86D'}}/></Typography>
                                        </Link>
                                    </Box>
                                </Box>
                                </Box>
                    })}
                </Box>
                </Box>
                <Box component="section" sx={{padding: {lg: '20px', md: '20px', sm: '15px', xs:'10px'}}}>
                    <Box sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '20px', marginTop: '15px'}}>
                        <Box className="flex justify-between">
                            <Typography className='pb-5'>Completed Quizzes</Typography>
                            <Link to={'/results'}>
                                <Typography className='pb-5' variant='body1'>Results <ArrowRightAltIcon sx={{color: '#C5D86D'}}/></Typography>
                            </Link>
                        </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table  aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell>Title</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">Schadule</StyledTableCell>
                                    <StyledTableCell align="center">Closed</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataQuizCompleted.map((quizCompleted: quizCompletedData) => {
                                        return <TableRow>
                                                    <StyledTableCell>{quizCompleted.title}</StyledTableCell>
                                                    <StyledTableCell align="center">{quizCompleted.status}</StyledTableCell>
                                                    <StyledTableCell align="center">{new Date(quizCompleted.schadule).toISOString().split('T')[0]}</StyledTableCell>
                                                    <StyledTableCell align="center">{new Date(quizCompleted.closed_at).toISOString().split('T')[1].replace('Z', '').replace('.728', '')}</StyledTableCell>
                                                </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                            </TableContainer>

                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </Box>
    </>
  )
}
