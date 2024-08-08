import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import goGameImage from '../../../assets/images/gogame.jpeg';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userLogin, setUserLogin] = React.useState(() => {
    // Read the value from localStorage when the component mounts
    const storedLoginStatus = localStorage.getItem('userLogin');
    return storedLoginStatus === 'true'; // Convert the value from string to boolean
  });

  const handleLogin = () => {
    setUserLogin(true);
  };
  const handleLogout = () => {
    setUserLogin(false);
  };

  React.useEffect(() => {
    // Save the userLogin state to localStorage whenever it changes
    localStorage.setItem('userLogin', userLogin.toString());
    if (userLogin) {
      console.log('User has logged in');
      // Perform actions when the user logs in
    } else {
      console.log('User has logged out');
      // Perform actions when the user logs out
    }
  }, [userLogin]); // Dependency array

  const navigate = useNavigate();
  return (
    <>
      {userLogin ? (
        <React.Fragment>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <Tooltip disableFocusListener arrow title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={goGameImage} sx={{ width: 32, height: 32 }}>
                  G
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              onClick={() => {
                navigate(`/profile`);
              }}
            >
              <Avatar /> Profile
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem> */}
            <Divider />
            <MenuItem
              onClick={() => {
                navigate(`/addnew`);
              }}
            >
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              Add new book
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(`/purchase`);
              }}
            >
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              Purchased History
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
            <MenuItem
              onClick={() => {
                navigate(`/setting`);
              }}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(`/change-password`);
              }}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              Change password
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      ) : (
        <Tooltip disableFocusListener arrow title="Login">
          <Button
            onClick={handleLogin}
            sx={{
              bgcolor: '#101010',
              color: '#fff',
              width: '100%',
              height: '40px',
              fontSize: '.875rem',
              fontWeight: '700',
              borderRadius: '2px',
              padding: '0.5rem 1.875rem',
              marginBottom:
                location.pathname === '/register' ? '1.875rem' : '0',
              '&:hover': {
                bgcolor: '#101010',
              },
            }}
          >
            Login
          </Button>
        </Tooltip>
      )}
    </>
  );
}
