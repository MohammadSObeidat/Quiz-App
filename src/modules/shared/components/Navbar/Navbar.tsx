import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import logo from '../../../../assets/images/Logo icon.png'
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../../redux/store/store'
import { Button } from '@mui/material';
import { removeUserData } from '../../../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const settings = ['Change password', 'Logout'];


export default function Navbar() {
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.user.loginData)
  const dispatch = useDispatch()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    dispatch(removeUserData())
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <AppBar position="static" color= 'inherit' sx={{borderBottom: '1px solid #00000033'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box sx={{display: 'flex',flexGrow: 1.05, justifyContent: 'space-around', alignItems: 'center'}}>
                    <MenuIcon sx={{fontSize:'40px'}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        >
                        <img src={logo} alt="" />
                    </Typography>
                </Box>

                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                    <Box sx={{ flexGrow: 6, display: {  md: 'flex', } ,  justifyContent: 'space-between' }}>
                        <Typography variant='body1' sx={{fontSize: '20px', fontWeight: 'bold', paddingInline: '15px'}}>Dashboard</Typography>
                        <Typography variant='body1' sx={{display: 'flex', alignItems: 'center',fontSize: '17px', fontWeight: '500', paddingInline: '15px', border: '1px solid #00000033', borderRadius: '30px', mr:'15px'}}>
                            <AddAlarmIcon/>
                            New quiz
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />

                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent:'center' }}>
                    <Tooltip title="Open settings">
                        <Box>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Typography sx={{fontWeight: 'bold'}}>{userData?.first_name} {userData?.last_name}</Typography>
                                <KeyboardArrowDownIcon/>
                            </IconButton>
                            <Typography sx={{fontSize: '16px', color: '#C5D86D'}}>{userData?.role}</Typography>
                        </Box>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Button onClick={logout}>
                                <Typography sx={{ textAlign: 'center', color: '#000', textTransform: 'capitalize' }}>{setting}</Typography>
                            </Button>
                        </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}