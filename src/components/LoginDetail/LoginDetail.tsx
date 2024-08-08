import { Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Logo from '../../layouts/components/icons-tsx/Logo/Logo';
import LoginForm from './LoginForm';

function LoginDetail() {
  const location = useLocation();
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Logo />
        <Typography
          sx={{
            color: '#222',
            fontSize: '1.5rem',
            fontWeight: 500,
            letterSpacing: '1px',
            bottom: 0,
            transform: 'translateX(0px)',
            lineHeight: 1.8,
          }}
        >
          {location.pathname === '/login' ? 'Login' : 'Register'}
        </Typography>
      </Stack>
      <LoginForm />
    </>
  );
}

export default LoginDetail;
