import './Students.css'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useGetStudentsQuery } from '../../../../redux/api/apiSlice';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface studentData {
    first_name: string,
    last_name: string,
    email: string
}

export default function Students() {
  const [count, setCount] = useState(0); // Local state to track the count
  const [page, setPage] = useState(1);
  const {data, isLoading} = useGetStudentsQuery()

  const length = () => {
    console.log(count);
  };

  const handlePageChange = (event, value: number) => {
    setPage(value); // Set the page number when a user clicks on a page or the next/previous button
  };

  // Slice the data based on the current page
  const currentStudents = data?.slice((page - 1) * 20, page * 20);

  // Update count whenever data changes
  useEffect(() => {
    if (data && !isLoading) {
      setCount(data.length); // Set the count to the length of data
    }
  }, [data]); // This effect runs whenever 'data' changes

  // You can call 'length' here if you want to log the count
  useEffect(() => {
    length();
  }, [count]); // This will run whenever the count changes


  if (isLoading) return <Typography>Loading Students ...</Typography>

  return (
    <Box component="section" sx={{padding: '20px'}}>
      <Box sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '20px', marginTop: '15px'}}>
        <Typography className='pb-5'>Students list</Typography>
        {/* <Box className="grid xl:grid-cols-8 gap-2 pb-5">
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}} className='text-center'> Group 1</Typography>
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> Group 2</Typography>
          <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> Group 3</Typography>
        </Box> */}
        <Box className="items grid gap-4 xl:grid-cols-2">
            {currentStudents.map((student: studentData) => {
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
        <Stack spacing={2} sx={{paddingBlock: 4}}>
            <Pagination 
            sx={{display: 'flex', justifyContent: 'end'}} 
            count={count ? Math.ceil(count / 20) : 0}
            color="primary"
            page={page}
            onChange={handlePageChange}/>
          </Stack>
      </Box>
    </Box>
  )
}
