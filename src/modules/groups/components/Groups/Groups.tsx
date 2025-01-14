import './Groups.css'
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useCreateGroupMutation, useGetGroupQuery, useGetGroupsQuery, useGetStudentsWithOutGroupQuery, useRemoveGroupMutation, useUpdateGroupMutation } from '../../../../redux/api/apiSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';
import DeletedConfirmation from '../../../shared/components/DeletedConfirmation/DeletedConfirmation';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface groupsData {
  name: string,
  students: string[]
}

interface dataStudent {
  _id: string,
  first_name: string,
  last_name: string
}

interface data {
  _id: string,
  name: string,
  students: string[]
}
interface student {
 first_name: string,
 last_name: string
}

// interface dataGroup {
//   _id: string,
//   name: string,
//   students: student[],
// }

export default function Groups() {
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const [students, setStudents] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStudents(event.target.value as string[]);
  };

  const {data: dataGroups, isLoading: isLoadingGroups} = useGetGroupsQuery()
  const {data: dataStudents, isLoading: isLoadingStudents} = useGetStudentsWithOutGroupQuery()
  const {data: dataGroup, isLoading: isLoadingGroup} = useGetGroupQuery(id)

  const [createGroup] = useCreateGroupMutation()
  const [removeGroup] = useRemoveGroupMutation()
  const [updateGroup] = useUpdateGroupMutation()

  // create and update group 
  const handleGroup = async (data: groupsData) => {
    try {
      let res;
      if (id) {
        res = await updateGroup({ id, data }).unwrap(); // Update existing group
      } else {
        res = await createGroup(data).unwrap(); // Create new group
      }
      console.log(res);
      toast.success(res.message);
      handleClose();
      
      // Reset the form fields
      reset({
        name: '',
        students: [], // Reset the students array as well
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }
  }

  // delete group
  const deleteGroup = async () => {
    try {
      const res = await removeGroup(id).unwrap();
      toast.success(res.message)
      handleCloseDelete()

    } catch (error: any) {
      toast.error(error?.data?.message) 
    }
  }

  useEffect(() => {
    if (id) {
      // Fetch the group details if id exists
      if (dataGroup && !isLoadingGroup) {
        console.log({ dataGroup });
        setValue("name", dataGroup.name);
        setValue("students", dataGroup.students);
      } else if (!isLoadingGroup) {
        // Reset only if data is not loading and no data found
        reset({
          name: "",
          students: [], // Reset the students array as well
        });
      }
    } else {
      reset({
        name: "",
        students: [], // Reset the students array as well
      });
    }
  }, [id, isLoadingGroup, dataGroup]);
  
  if (isLoadingGroups || isLoadingStudents || isLoadingGroup) {
    return <Typography>Loading Groups ...</Typography>; // You can use a spinner or any custom loader
  }

  return (
    <>
    {/* ============================ Crete =========================== */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(handleGroup)}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Set up a new Group
        </DialogTitle>
        <button>
          <IconButton
            aria-label="close"
            // onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 60,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <DoneIcon />
          </IconButton>
        </button>
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
            <Box className="grid gap-5 pt-5 pb-10">
              <Box>
                <Box className='name-group'>
                  <Typography className='title'>Group Name</Typography>
                  <input type="text"
                  {...register('name', {
                    required: 'Name is required'
                  })} />
                </Box>
                {errors.name && <p className='text-red-700'>{String(errors.name.message)}</p>}
              </Box>
              <Box>
                <Box className='select-student'>
                  {/* <select {...register('students', {
                    required: 'Students is required'
                  })} onChange={(event) => handleChange(event)} multiple>
                    <option value="" style={{backgroundColor: '#FFEDDF'}}>List Students</option>
                    {dataStudents.map((student: dataStudent) => {
                      return <option value={student._id}>{student.first_name} {student.last_name}</option>
                    })}
                  </select> */}

                  <select
                    {...register("students", {
                      required: "Students is required",
                    })}
                    onChange={(event) => handleChange(event)}
                    multiple
                  >
                    <option value="" style={{ backgroundColor: "#FFEDDF" }}>
                      List Students
                    </option>
                    {/* The options are populated by combining two arrays: [...dataStudents, ...(dataGroup?.students || [])]*/}
                    {[...dataStudents, ...(dataGroup?.students || [])].map(
                      (student: dataStudent) => {
                        return (
                          <option value={student._id}>
                            {student.first_name} {student.last_name}
                          </option>
                        );
                      }
                    )}
                  </select>
                </Box> 
                {errors.students && <p className='text-red-700'>{String(errors.students.message)}</p>}
              </Box>
               {/* <TextField id="outlined-basic" 
               label="Group Name" 
               variant="outlined" sx={{width: '500px'}} 
               helperText={errors?.name?.message}
               error={!!errors?.name}
               {...register('name', {
                required: 'Name is required'
              })}/>

               <FormControl error={!!errors?.students}>
                <InputLabel  id="demo-simple-select-error-label">List Students</InputLabel>
                <Select
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  value={students}
                  label="List Students"
                  multiple
                  helperText={errors?.students?.message}
                  error={!!errors?.students}
                  {...register('students', {
                    required: 'Students is required'
                  })}
                  onChange={(event) => handleChange(event)}
                >
                  {dataStudents.map((student: dataStudent) => {
                    return <MenuItem value={student._id}>{student.first_name} {student.last_name}</MenuItem>
                  })}
                </Select>
              </FormControl> */}

            </Box>
        </DialogContent>
        </form>
      </BootstrapDialog>

      {/* ================ Delete ========================= */}

      <DeletedConfirmation handleCloseDelete={handleCloseDelete} openDelete={openDelete} funDelete={deleteGroup} Item={'group'}/>


      <Box component="section" sx={{padding: '20px'}}>
        <Box sx={{display: 'flex', justifyContent: 'end'}}>
          <button onClick={() => handleClickOpen()} className='add-group'>
            <Typography sx={{border: '1px solid #00000033', borderRadius: '30px',padding: '5px 10px', fontFamily: 'Nunito', fontWeight: 500, fontSize: '16px'}}> <AddCircleIcon/> Add Group</Typography>
          </button>
        </Box>
        <Box sx={{border: '1px solid #00000033', borderRadius: '10px', padding: '20px', marginTop: '15px'}}>
          <Typography className='pb-5'>Groups list</Typography>
          <Box className="items grid gap-4 xl:grid-cols-2">
            {dataGroups.map((group: data) => {
              return  <Box className="item flex justify-between" sx={{border: '1px solid #00000033', borderRadius: '5px', padding: '10px'}}>
                        <Box>
                          <Typography sx={{fontFamily: 'Nunito', fontWeight: 600, fontSize: '18px'}}>Group : {group.name}</Typography>
                          <Typography sx={{fontFamily: 'Nunito', fontWeight: 500, fontSize: '13px', color: '#0D1321CC'}}>No. of students : {group.students.length}</Typography>
                        </Box>
                        <Box>
                          <button title='Edit' onClick={() => handleClickOpen(group._id)}>
                            <BorderColorOutlinedIcon  className='mx-4'/>
                          </button>
                          <button title='Delete' onClick={() => handleClickOpenDelete(group._id)}>
                            <DeleteOutlinedIcon/>
                          </button>
                        </Box>
                      </Box>
            })}
          </Box>
        </Box>
      </Box>
    </>
  )
}
