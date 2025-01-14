import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import removeImg from '../../../../assets/images/images-removebg-preview.png'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

interface props {
    handleCloseDelete: () => void,
    openDelete: boolean,
    funDelete: () => Promise<void>,
    Item: string
}

export default function DeletedConfirmation({handleCloseDelete, openDelete, funDelete, Item}: props) {
  return (
    <BootstrapDialog
        onClose={handleCloseDelete}
        aria-labelledby="customized-dialog-title"
        open={openDelete}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete Group
        </DialogTitle>
        <button onClick={funDelete}>
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
          onClick={handleCloseDelete}
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
          <Box className="text-center">
            <Box className='flex justify-center mb-5'>
              <img src={removeImg} alt="" />
            </Box>
            <Typography sx={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Delete This {Item} ?</Typography>
            <Typography sx={{fontSize: '16px', color: '#49494999'}}>are you sure you want to delete this item ? if you are sure just <br/> click on delete it</Typography>
        
          </Box>
        </DialogContent>
      </BootstrapDialog>
  )
}