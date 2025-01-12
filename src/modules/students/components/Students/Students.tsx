import './Students.css'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useGetStudentsQuery } from '../../../../redux/api/apiSlice';

interface studentData {
    first_name: string,
    last_name: string,
    email: string
}

export default function Students() {
    const {data, isLoading} = useGetStudentsQuery()

    if (isLoading) return <Typography>Loading Students ...</Typography>

  return (
    <Box component="section" sx={{padding: '20px'}}>
      {/* <Box sx={{display: 'flex', justifyContent: 'end'}}>
        <button>
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> <AddCircleIcon/>Add Student</Typography>
        </button>
      </Box> */}
      <Box sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '20px', marginTop: '15px'}}>
        <Typography className='pb-5'>Students list</Typography>
        <Box className="grid xl:grid-cols-8 gap-2 pb-5">
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}} className='text-center'> Group 1</Typography>
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> Group 2</Typography>
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> Group 3</Typography>
        </Box>
        <Box className="items grid gap-4 xl:grid-cols-2">
            {data.map((student: studentData) => {
                return <Box className="item flex justify-between" sx={{border: '1px solid #00000033', borderRadius: '5px', padding: '10px'}}>
                            <Box>
                            <Typography sx={{fontFamily: 'Nunito', fontWeight: 600, fontSize: '18px'}}>{student.first_name} {student.last_name}</Typography>
                            <Typography sx={{fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px', color: '#0D1321CC'}}>{student.email}</Typography>
                            </Box>
                            <Box>
                            <ArrowCircleRightIcon/>
                            </Box>
                        </Box>
            })}
        </Box>
      </Box>
    </Box>
  )
}
