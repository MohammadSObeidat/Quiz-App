import './Questions.css'
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useCreateQuestionMutation, useGetQuestionQuery, useGetQuestionsQuery, useRemoveQuestionMutation, useUpdateQuestionMutation } from '../../../../redux/api/apiSlice';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeletedConfirmation from '../../../shared/components/DeletedConfirmation/DeletedConfirmation';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import { ThreeDot } from 'react-loading-indicators';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

interface questionsData {
    _id: string,
    title: string,
    description: string,
    difficulty: string,
}

interface option {
  A: string,
  B: string,
  C: string,
  D: string
}

interface questionData {
  title: string,
  description: string,
  options: option,
  answer: string,
  difficulty: string,
  type: string,
}

export default function Questions() {
  const [count, setCount] = useState(0); // Local state to track the count
  const [page, setPage] = useState(1);
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  const handleClickOpen = (id?: string) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (id: string) => {
    setId(id)
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const length = () => {
    console.log(count);
  };

  const handlePageChange = (event, value: number) => {
    setPage(value); // Set the page number when a user clicks on a page or the next/previous button
  };

  const {data: dataQuestions, isLoading: isLoadingQuestions} = useGetQuestionsQuery()
  const {data: dataQuestion, isLoading: isLoadingQuestion} = useGetQuestionQuery(id)
  const [createQuestion] = useCreateQuestionMutation()
  const [updateQuestion] = useUpdateQuestionMutation()
  const [removeQuestion] = useRemoveQuestionMutation()

  // Slice the data based on the current page
  const currentQuestions = dataQuestions?.slice((page - 1) * 20, page * 20);

  // create and update Question 
  const handleQuestion = async (data: questionData) => {
    try {
      let res;
      if (id) {
        res = await updateQuestion({ id, data }).unwrap(); // Update existing Question
      } else {
        res = await createQuestion(data).unwrap(); // Create new Question
      }
      console.log(res);
      toast.success(res.message);
      handleClose();
      
      // Reset the form fields
      reset({
        title: '',
        description: '',
        options: { A: '', B: '', C: '', D: '' },
        answer: '',
        difficulty: '',
        type: '',
      });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  }

  // Delete Question
  const deleteQuestion = async () => {
    try {
      const res = await removeQuestion(id).unwrap();
      toast.success(res.message)
      handleCloseDelete()

    } catch (error: any) {
      toast.error(error?.data?.message) 
    }
  }

  // Update count whenever data changes
  useEffect(() => {
    if (dataQuestions && !isLoadingQuestions) {
      setCount(dataQuestions.length); // Set the count to the length of data
    }
  }, [dataQuestions]); // This effect runs whenever 'data' changes

  // You can call 'length' here if you want to log the count
  useEffect(() => {
    length();
  }, [count]); // This will run whenever the count changes

  useEffect(() => {
    if (id) {
      // Fetch the question details if 'id' exists
      if (dataQuestion && !isLoadingQuestion) {
        console.log({ dataQuestion });
        setValue("title", dataQuestion.title);
        setValue("description", dataQuestion.description);
        for (const option in dataQuestion.options) {
          if (option !== '_id') {
              setValue(`options.${option}`, dataQuestion.options[option]);
          }
        }
        setValue("answer", dataQuestion.answer);
        setValue("difficulty", dataQuestion.difficulty);
        setValue("type", dataQuestion.type);
      } else if (!isLoadingQuestion) {
        // Reset the form fields
        reset({
          title: '',
          description: '',
          options: { A: '', B: '', C: '', D: '' },
          answer: '',
          difficulty: '',
          type: ''
        });
      }
    } else {
      // Reset the form fields
      reset({
        title: '',
        description: '',
        options: { A: '', B: '', C: '', D: '' },
        answer: '',
        difficulty: '',
        type: ''
      });
    }
  }, [id, isLoadingQuestion, dataQuestion]);
  
  if (isLoadingQuestions) {
    return <Typography>Loading Questions ...</Typography>; // You can use a spinner or any custom loader
  }

  return (
    <>
    {/* ============================ Create =========================== */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiDialog-paper': {
            width: '800px',  // Set the desired width of the dialog
            maxWidth: 'none', // Optional, disables maxWidth limitation
          }
        }}
      >
        <form onSubmit={handleSubmit(handleQuestion)}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {id ? 'Set up a edit question' : 'Set up a new question'}
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
            <Box className="pt-5 pb-5">
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
                <Grid size={12}>
                  <Box>
                    <Box className='name-question'>
                      <Typography className='title'>Description</Typography>
                      <textarea {...register('description')}></textarea>
                    </Box>
                  </Box>
                </Grid>
                {/* Options A, B, C, D */}
                {['A', 'B', 'C', 'D'].map((option) => (
                  <Grid size={6} key={option}>
                    <Box className="name-question">
                      <Typography className="title">{option}</Typography>
                      <input
                        type="text"
                        {...register(`options.${option}`, {
                          required: `${option} is required`,
                        })}
                      />
                    </Box>
                    {errors.options?.[option] && (
                      <p className="text-red-700">{errors.options[option]?.message}</p>
                    )}
                  </Grid>
                ))}
                <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                  <Box>
                    <Box className='name-question'>
                    <Typography className='title title-w'>Right Answer</Typography>
                    <select {...register('answer', {
                        required: 'Answer is required'
                    })}>
                        <option value="A" selected>A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    </Box>
                    {errors.answer && <p className='text-red-700'>{String(errors.answer.message)}</p>}
                  </Box>
                </Grid>
                <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                  <Box>
                    <Box className='name-question'>
                    <Typography className='title'>Difficulty</Typography>
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
              </Grid>               
              <Box sx={{display: 'flex', justifyContent: 'end', marginTop: '40px'}}>
                <button className='btn-action' disabled={isSubmitting}>
                  {id ? 'Update' : 'Create'}
                  {isSubmitting && <Typography sx={{marginLeft: '10px', display: 'inline'}}><ThreeDot color="#e9f3e9" size="small" text="" textColor="" /></Typography>}
                </button>
              </Box>
            </Box>
        </DialogContent>
        </form>
      </BootstrapDialog>

      {/* ================ Delete ========================= */}

      <DeletedConfirmation handleCloseDelete={handleCloseDelete} openDelete={openDelete} funDelete={deleteQuestion} Item={'question'}/>


      <Box component="section" sx={{padding: '20px'}}>
        <Box sx={{display: 'flex', justifyContent: 'end'}}>
          <button onClick={() => handleClickOpen()} className='add-question'>
            <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> <AddCircleIcon/> Add Question</Typography>
          </button>
        </Box>
        <Box sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '20px', marginTop: '15px'}}>
          <Typography className='pb-5'>Bank Of Questions</Typography>
          <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Question Title</StyledTableCell>
                        <StyledTableCell align="center">Question Desc</StyledTableCell>
                        <StyledTableCell align="center">Question difficulty level</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentQuestions.map((question: questionsData) => {
                            return <TableRow>
                                        <StyledTableCell>{question.title}</StyledTableCell>
                                        <StyledTableCell align="center">{question.description}</StyledTableCell>
                                        <StyledTableCell align="center">{question.difficulty}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Box sx={{display: {xs: 'flex'}}}>
                                                <button title='Edit' onClick={() => handleClickOpen(question._id)}>
                                                    <BorderColorOutlinedIcon sx={{color: '#FB7C19'}}  className='mx-4'/>
                                                </button>
                                                <button title='Delete' onClick={() => handleClickOpenDelete(question._id)}>
                                                    <DeleteOutlinedIcon sx={{color: '#FB7C19'}}/>
                                                </button>
                                            </Box>
                                        </StyledTableCell>
                                    </TableRow>
                        })}
                    </TableBody>
                </Table>
                <Stack spacing={2} sx={{paddingBlock: 4}}>
                    <Pagination 
                    sx={{display: 'flex', justifyContent: 'end'}} 
                    count={count ? Math.ceil(count / 20) : 0}
                    color="primary"
                    page={page}
                    onChange={handlePageChange}/>
                </Stack>
                </TableContainer>

            </Box>
        </Box>
      </Box>
    </>
  )
}
