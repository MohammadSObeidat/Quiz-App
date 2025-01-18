import { DialogContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useGetQuizQuery, useRemoveQuizMutation, useUpdateQuizMutation } from '../../../../redux/api/apiSlice';
import { toast } from 'react-toastify';
import DeletedConfirmation from '../../../shared/components/DeletedConfirmation/DeletedConfirmation';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface updateData {
  title: string
}

export default function QuizDetails() {
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    register: registerEdit,
    formState: { errors: errorsEdit },
    handleSubmit,
    setValue: setValueEdit
  } = useForm();
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const {data, isLoading} = useGetQuizQuery(id)
  const [removeQuiz] = useRemoveQuizMutation()
  const [updateQuiz] = useUpdateQuizMutation()

  const editQuiz = async (data: updateData) => {
    try {
      const res = await updateQuiz({id, data}).unwrap();
      toast.success(res?.message);
      navigate('/quizzes')
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  // Delete Quiz
  const deleteQuiz = async () => {
    try {
      const res = await removeQuiz(id).unwrap();
      toast.success(res.message)
      handleCloseDelete()
      navigate('/quizzes')
    } catch (error: any) {
      toast.error(error?.data?.message) 
    }
  }

  useEffect(() => {
    if (id) {
      // Fetch the question details if 'id' exists
      if (data && !isLoading) {
        console.log({ data });
        setValueEdit("title", data.title);
        setValue("questions_number", data.questions_number);
        setValue("score_per_question", data.score_per_question);
        setValue("description", data.description);
        setValue("duration", data.duration);
        setValue("difficulty", data.difficulty);
        setValue("type", data.type);
        setValue("code", data.code);
      } 
    } 
  }, [id, isLoading, data]);

  if (isLoading) return <Typography>Loading Quiz</Typography>

  return (
    <>
      {/* ========================== Update =========================== */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
            '& .MuiDialog-paper': {
                width: '400px',  // Set the desired width of the dialog
                maxWidth: 'none', // Optional, disables maxWidth limitation
            }
            }}
      >
        <DialogContent dividers >
            <Typography sx={{fontSize: '20px', marginBlock: '15px', fontWeight: 'bold'}}>Update Quiz Title</Typography>
            <form onSubmit={handleSubmit(editQuiz)}>
              <Box className='name-question'>
                  <Typography className='title'>Title</Typography>
                  <Box className="input-code">
                      <input type="text" 
                      {...registerEdit('title', {
                        required: 'Title is required'
                      })}/>
                  </Box>
              </Box>
                      {errorsEdit.title && <p className='text-red-700'>{String(errorsEdit.title.message)}</p>}
              <Box sx={{textAlign: 'center'}}>
                <button className='btn-edit'>Edit Quiz</button>
              </Box>
            </form>
        </DialogContent>
      </BootstrapDialog>
        {/* ================ Delete ========================= */}
        
        <DeletedConfirmation handleCloseDelete={handleCloseDelete} openDelete={openDelete} funDelete={deleteQuiz} Item={'quiz'}/>
        
        <Link to={'/quizzes'}>
            <Typography sx={{margin: '15px 0 0 15px'}}>Quizzes <DoubleArrowIcon sx={{color: '#C5D86D'}}/> {data.title}</Typography>
        </Link>
        <Box component="section" sx={{minHeight: '90vh', display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{maxWidth: '450px', border: '1px solid #0000004D', borderRadius: '10px', padding: {lg: '20px 35px', md: '20px 35px', sm: '20px 55px' ,xs:'20px 55px'}}}>
                <Typography variant='h3' sx={{fontSize: '24px', fontWeight: 'bold'}}>{data.title}</Typography>
                <Box sx={{display: 'flex', gap: '25px', marginBlock: '10px'}}>
                    <Typography sx={{display: 'flex', alignItems: 'center', gap: '10px'}}><EventAvailableOutlinedIcon/> {new Date(data.schadule).toISOString().split('T')[0]}</Typography>
                    <Typography sx={{display: 'flex', alignItems: 'center', gap: '10px'}}><AccessTimeOutlinedIcon/> {new Date(data.schadule).toISOString().split('T')[1].replace(':00.000Z', '')}</Typography>
                </Box>
                <Grid container spacing={2}>
                        
                        <Grid size={12}>
                            <Box>
                                <Box className='name-question'>
                                <Typography className='title title-w'>Duration (minutes)</Typography>
                                <input type="text" disabled
                                {...register('duration', {
                                    required: 'Duration is required'
                                })} />
                                </Box>
                                {errors.duration && <p className='text-red-700'>{String(errors.duration.message)}</p>}
                            </Box>
                        </Grid>
                        <Grid size={12}>
                            <Box>
                                <Box className='name-question'>
                                <Typography className='title title-w'>Question number</Typography>
                                <input type="text" disabled
                                {...register('questions_number', {
                                    required: 'Questions number is required'
                                })} />
                                </Box>
                                {errors.questions_number && <p className='text-red-700'>{String(errors.questions_number.message)}</p>}
                            </Box>
                        </Grid>
                        <Grid size={12}>
                            <Box>
                                <Box className='name-question'>
                                <Typography className='title title-w'>Score per question</Typography>
                                <input type="text" disabled
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
                                <textarea {...register('description')} disabled></textarea>
                                </Box>
                            </Box>
                        </Grid>
                        
                        <Grid size={12}>
                            <Box>
                                <Box className='name-question'>
                                <Typography className='title title-w'>Difficulty level</Typography>
                                <select {...register('difficulty', {
                                    required: 'Difficulty is required'
                                })} disabled>
                                    <option value="easy" selected>Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                </Box>
                                {errors.difficulty && <p className='text-red-700'>{String(errors.difficulty.message)}</p>}
                            </Box>
                        </Grid>
                        <Grid size={12}>
                            <Box>
                                <Box className='name-question'>
                                <Typography className='title title-w'>Category type</Typography>
                                <select {...register('type', {
                                    required: 'Type is required'
                                })} disabled>
                                    <option value="FE" selected>FE</option>
                                    <option value="BE">BE</option>
                                </select>
                                </Box>
                                {errors.type && <p className='text-red-700'>{String(errors.type.message)}</p>}
                            </Box>
                        </Grid>
                        <Grid size={12}>
                            <Box>
                                <Box className='name-question'>
                                <Typography className='title title-w'>Code</Typography>
                                <input type="text" disabled
                                {...register('code', {
                                    required: 'Code is required'
                                })} />
                                </Box>
                                {errors.code && <p className='text-red-700'>{String(errors.code.message)}</p>}
                            </Box>
                        </Grid>
                        
                    </Grid> 
                    <Box sx={{marginTop: '15px', display: 'flex', justifyContent: 'space-between'}}>
                        <button onClick={handleClickOpenDelete} className='bg-red-500 px-8 py-2 rounded-lg text-red-50 flex items-center'><DeleteOutlineOutlinedIcon/> Delete</button>
                        <button onClick={handleClickOpen} className='bg-black px-8 py-2 rounded-lg text-red-50 flex items-center gap-1'><EditOutlinedIcon/> Edit</button>
                    </Box>
            </Box>
        </Box>
    </>
  )
}
