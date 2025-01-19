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
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../../redux/store/store'
import { Button } from '@mui/material';
import { removeUserData } from '../../../../redux/slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';


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

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
                <Box sx={{ flexGrow: 6, display: {lg: 'flex',  md: 'flex', sm: 'none', xs: 'none'} ,  justifyContent: 'space-between' }}>
                    <Typography variant='body1' sx={{fontSize: '20px', fontWeight: 'bold', paddingInline: '15px'}}>Dashboard</Typography>
                    <Link to={'/quizzes'}>
                      <Typography variant='body1' sx={{display: 'flex', alignItems: 'center',fontSize: '17px', fontWeight: '500', paddingInline: '15px', border: '1px solid #00000033', borderRadius: '30px', mr:'15px'}}>
                          <AddAlarmIcon/>
                          New quiz
                      </Typography>
                    </Link>
                </Box>
                <Divider sx={{display: {lg: 'block',  md: 'block', sm: 'none', xs: 'none'}}} orientation="vertical" variant="fullWidth" flexItem />
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                      {userData?.role !== 'Instructor' ? '' : 
                      <Link to={'/dashboard'}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
                        </MenuItem>
                      </Link> }
                      {userData?.role !== 'Instructor' ? '' : 
                      <Link to={'/students'}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography sx={{ textAlign: 'center' }}>Students</Typography>
                        </MenuItem>
                      </Link> }
                      {userData?.role !== 'Instructor' ? '' : 
                      <Link to={'/groups'}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography sx={{ textAlign: 'center' }}>Groups</Typography>
                        </MenuItem>
                      </Link> }
                      <Link to={'/quizzes'}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography sx={{ textAlign: 'center' }}>Quizzes</Typography>
                        </MenuItem>
                      </Link>
                      {userData?.role !== 'Instructor' ? '' : 
                      <Link to={'/questions'}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography sx={{ textAlign: 'center' }}>Questions</Typography>
                        </MenuItem>
                      </Link> }
                      <Link to={'/results'}>
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography sx={{ textAlign: 'center' }}>Results</Typography>
                        </MenuItem>
                      </Link>
                    </Menu>
                </Box>
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
