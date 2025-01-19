import './SideBar.css'
import { Box, Typography } from '@mui/material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import homeImg from '../../../../assets/images/Icon-home.png'
import groupImg from '../../../../assets/images/Icon-group.png'
import quizImg from '../../../../assets/images/Icon-quiz.png'
import resultImg from '../../../../assets/images/Icon-result.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../../assets/images/Logo icon.png'
import type { RootState } from '../../../../redux/store/store'
import { useSelector } from 'react-redux'


export default function SideBar() {
  const userData = useSelector((state: RootState) => state.user.loginData)
  const [activeItem, setActiveItem] = useState('dashboard');  // Store the active item
  return (
    <Box className="sidebar-container" sx={{display: {lg: 'block', md: 'block', sm: 'block', xs: 'none'}}}>
        <Sidebar>
            <Menu>
                <MenuItem icon={<MenuIcon sx={{fontSize:'40px'}}/>}> 
                  <Typography
                      variant="h6"
                      noWrap
                      >
                      <img src={logo} alt="" />
                  </Typography>
                </MenuItem>
                {userData?.role !== 'Instructor' ? '' : 
                <MenuItem icon={<img src={homeImg} alt="" />}  component={<Link to="/dashboard" />}
                  active={activeItem === 'dashboard'}  // Conditional active state
                  onClick={() => setActiveItem('dashboard')}  // Set active item on click
                > Dashboard </MenuItem> }
                {userData?.role !== 'Instructor' ? '' :
                <MenuItem icon={<img src={groupImg} alt="" />} component={<Link to="/students" />}
                  active={activeItem === 'students'}  // Conditional active state
                  onClick={() => setActiveItem('students')}  // Set active item on click
                > Students </MenuItem> }
                {userData?.role !== 'Instructor' ? '' :
                <MenuItem icon={<img src={groupImg} alt="" />} component={<Link to="/groups" />}
                  active={activeItem === 'groups'}  // Conditional active state
                  onClick={() => setActiveItem('groups')}  // Set active item on click
                > Groups </MenuItem> }
                <MenuItem icon={<img src={quizImg} alt="" />} component={<Link to="/quizzes" />}
                  active={activeItem === 'quizzes'}  // Conditional active state
                  onClick={() => setActiveItem('quizzes')}  // Set active item on click
                > Quizzes </MenuItem>
                {userData?.role !== 'Instructor' ? '' :
                <MenuItem icon={<img src={quizImg} alt="" />} component={<Link to="/questions" />}
                  active={activeItem === 'questions'}  // Conditional active state
                  onClick={() => setActiveItem('questions')}  // Set active item on click
                > Questions </MenuItem> }
                <MenuItem icon={<img src={resultImg} alt="" />} component={<Link to="/results" />}
                  active={activeItem === 'results'}  // Conditional active state
                  onClick={() => setActiveItem('results')}  // Set active item on click
                > Results </MenuItem>
            </Menu>
        </Sidebar>
    </Box>
  )
}
