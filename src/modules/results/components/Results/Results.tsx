import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import { useGetQuizResultQuery } from '../../../../redux/api/apiSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));


export default function Results() {
  const {data, isLoading} = useGetQuizResultQuery()

  if (isLoading) return <Typography>Loading Quiz Result ...</Typography>
  return (
    <>
      <Box component="section" sx={{padding: '20px'}}>
        {/* <Box sx={{display: 'flex', justifyContent: 'end'}}>
          <button onClick={() => handleClickOpen()} className='add-question'>
            <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> <AddCircleIcon/> Add Question</Typography>
          </button>
        </Box> */}
        <Box sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '20px', marginTop: '15px'}}>
          <Typography sx={{fontSize: '20px', fontWeight: '700', fontFamily: 'Nunito'}} className='pb-5'>Completed Quizzes</Typography>
          <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">Duration</StyledTableCell>
                        <StyledTableCell align="center">Difficulty level</StyledTableCell>
                        <StyledTableCell align="center">Participants</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((result: questionsData) => {
                            return <TableRow>
                                        <StyledTableCell>{result.quiz.title}</StyledTableCell>
                                        <StyledTableCell align="center">{result.quiz.duration}</StyledTableCell>
                                        <StyledTableCell align="center">{result.quiz.difficulty}</StyledTableCell>
                                        <StyledTableCell align="center">{result.participants.length}</StyledTableCell>
                                        <StyledTableCell align="center">{new Date(result.quiz.schadule).toISOString().split('T')[0]}</StyledTableCell>
                                        {/* <StyledTableCell align="center">
                                            <Box>
                                                <button title='Edit' onClick={() => handleClickOpen(question._id)}>
                                                    <BorderColorOutlinedIcon sx={{color: '#FB7C19'}}  className='mx-4'/>
                                                </button>
                                                <button title='Delete' onClick={() => handleClickOpenDelete(question._id)}>
                                                    <DeleteOutlinedIcon sx={{color: '#FB7C19'}}/>
                                                </button>
                                            </Box>
                                        </StyledTableCell> */}
                                    </TableRow>
                        })}
                    </TableBody>
                </Table>
                {/* <Stack spacing={2} sx={{paddingBlock: 4}}>
                    <Pagination 
                    sx={{display: 'flex', justifyContent: 'end'}} 
                    count={count ? Math.ceil(count / 20) : 0}
                    color="primary"
                    page={page}
                    onChange={handlePageChange}/>
                </Stack> */}
                </TableContainer>

            </Box>
        </Box>
      </Box>
    </>
  )
}
