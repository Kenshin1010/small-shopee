import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { Theme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import EyeClose from '../../assets/icons-tsx/EyeClose';
import EyeOpen from '../../assets/icons-tsx/EyeOpen';
// import FacebookIcon from '../../assets/icons-tsx/FacebookIcon';
import GoogleIcon from '../../assets/icons-tsx/GoogleIcon';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isValidateEmailFormLogin, setIsValidateEmailFormLogin] =
    useState<boolean>(true);
  const [isValidatePasswordFormLogin, setIsValidatePasswordFormLogin] =
    useState<boolean>(true);
  const [isValidateFormLogin, setIsValidateFormLogin] =
    useState<boolean>(false);
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsValidateFormLogin(email !== '' && password !== '');
    } else if (location.pathname === '/register') {
      setIsValidateFormLogin(email !== '');
    }
  }, [location.pathname, email, password]);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const getInputStyles = () => ({
    height: '41px',
    padding: 0,
    '& .MuiInputBase-input': {
      padding: '.75rem',
      lineHeight: '20px',
    },
    '& .MuiInputBase-input:focus': { outline: 'none' },
    fontSize: '.875rem',
    borderRadius: '2px',
    boxShadows: 'inset 0 2px 0 rgba(0, 0, 0, .02)',
    boxSizing: 'border-box',
    overflow: 'hidden',
    '& .MuiInputBase-root': {
      height: '41px',
      borderRadius: '2px',
    },
    '& .MuiInputBase-root:focus': { outline: 'none' },
    cursor: 'text',
    '& .MuiOutlinedInput-root': { lineHeight: '20px', fontSize: '.875rem' },
    '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
        borderColor: 'rgba(0, 0, 0, 0.87)',
        borderWidth: '1px',
      },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
      borderWidth: '1px',
    },
  });

  return (
    <Box
      className="register-container"
      sx={{
        bgcolor: '#fff',
        width: '400px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        className="register-header"
        sx={{
          padding: '22px 30px',
          flexShrink: '0',
        }}
      >
        <Typography
          variant="h2"
          className="register-title"
          sx={{
            textAlign: 'left',
            fontSize: '1.25rem',
            color: '#222',
            maxWidth: '8.5rem',
          }}
        >
          {location.pathname === '/register' ? 'Register' : 'Login'}
        </Typography>
        {location.pathname === '/login' && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ marginLeft: 'auto' }}
          >
            <Button
              variant="outlined"
              sx={{
                '& .MuiButton-icon': {
                  margin: '0',
                  padding: '0',
                  border: 'none',
                },
                '&.MuiButtonBase-root': {
                  minWidth: '0',
                  padding: '0',
                  margin: '0',
                  border: 'none',
                },
              }}
            ></Button>
          </Stack>
        )}
      </Stack>

      <Box
        className="register-form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          padding: '0 30px 30px 30px',
        }}
      >
        <Box component="form" sx={{ width: '100%', fontSize: '.75rem' }}>
          <FormControl
            sx={{ width: '100%', fontSize: '.75rem', marginBottom: '.875rem' }}
          >
            <TextField
              type="tel"
              placeholder={
                location.pathname === '/register' ? 'Email' : 'Email/Username'
              }
              fullWidth // Optional: Set to true for full-width input
              sx={getInputStyles}
              onChange={(e) => {
                if (e.target.value) {
                  setEmail(e.target.value);
                  setIsValidateEmailFormLogin(true);
                } else {
                  setIsValidateEmailFormLogin(false);
                  setEmail('');
                }
              }}
            />
            {!isValidateEmailFormLogin && (
              <FormHelperText
                sx={{
                  textAlign: 'left',
                  color: 'red',
                  fontSize: '0.75rem',
                  margin: 0,
                  minHeight: '1rem',
                  padding: '0.25rem 0 0',
                }}
              >
                {location.pathname === '/register'
                  ? 'Invalid Email'
                  : 'Please enter this field.'}
              </FormHelperText>
            )}
          </FormControl>

          {location.pathname === '/login' && (
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                fontSize: '.875rem',
                marginBottom: '.875rem',
              }}
            >
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                sx={getInputStyles}
                onChange={(e) => {
                  if (e.target.value) {
                    setPassword(e.target.value);
                    setIsValidatePasswordFormLogin(true);
                  } else {
                    setIsValidatePasswordFormLogin(false);
                    setPassword('');
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ margin: '0' }}
                    >
                      {showPassword ? <EyeOpen /> : <EyeClose />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {!isValidatePasswordFormLogin && (
                <FormHelperText
                  sx={{
                    textAlign: 'left',
                    color: 'red',
                    fontSize: '0.75rem',
                    margin: 0,
                    minHeight: '1rem',
                    padding: '0.25rem 0 0',
                  }}
                >
                  Please enter this field.
                </FormHelperText>
              )}
            </FormControl>
          )}
          <Button
            variant="contained"
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
              '&.Mui-disabled': {
                pointerEvents: 'unset', // allow :hover styles to be triggered
                cursor: 'not-allowed', // and custom cursor can be defined without :hover state
                bgcolor: '#101010',
                opacity: '.7',
                color: '#fff',
              },
            }}
            onClick={() => {}}
            disabled={!isValidateFormLogin}
          >
            {location.pathname === '/register' ? 'Next' : 'Login'}
          </Button>
        </Box>
        {location.pathname === '/login' && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ width: '100%', margin: '10px 0' }}
          >
            <Link
              href="/reset-password"
              sx={{
                color: '#101',
                fontSize: '.75rem',
                '&.MuiLink-root': {
                  textDecoration: 'none',
                },
              }}
            >
              Forgot Password
            </Link>
            {/* <Link
              href="/change-password"
              sx={{
                color: '#101',
                fontSize: '.75rem',
                '&.MuiLink-root': {
                  textDecoration: 'none',
                },
              }}
            >
              Change Password
            </Link> */}
          </Stack>
        )}
        <Stack
          className="or-divider"
          width="100%"
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          position={'relative'}
          sx={{
            paddingBottom: '.875rem',
          }}
        >
          <Box
            sx={{ width: '48%', height: '1px', backgroundColor: '#dbdbdb' }}
          ></Box>
          <Typography
            textAlign={'center'}
            variant="caption"
            sx={{
              color: '#ccc',
              fontSize: '.75rem',
              padding: '0 1rem',
            }}
          >
            OR
          </Typography>
          <Box
            sx={{
              width: '48%',
              height: '1px',
              backgroundColor: '#dbdbdb',
            }}
          ></Box>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            width: '100%',
          }}
        >
          {/* <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={styleButtonSocial}
          >
            Facebook
          </Button> */}
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={styleButtonSocial}
          >
            Google
          </Button>
        </Stack>
      </Box>
      <Stack
        className="login-link-container"
        direction={'row'}
        justifyContent={'center'}
        sx={{
          marginBottom: '1.875rem',
          fontSize: '14px',
          color: 'rgba(0, 0, 0, .26)',
          paddingRight: '4px',
          whiteSpace: 'pre',
        }}
      >
        {location.pathname === '/register'
          ? 'Have an account? '
          : 'New to Store? '}
        <Link
          href={location.pathname === '/register' ? '/login' : '/register'}
          underline="none"
          sx={{
            color: '#101010',
            textDecoration: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {location.pathname === '/register' ? 'Login' : 'Register'}
        </Link>
      </Stack>
    </Box>
  );
}

export default LoginForm;

const styleButtonSocial: SxProps<Theme> = {
  bgcolor: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, .26)',
  borderRadius: '2px',
  boxSizing: 'border-box',
  color: 'rgba(0, 0, 0, .87)',
  fontSize: '.875rem',
  height: '40px',
  outline: 'none',
  padding: '0 10px',
  margin: '5px 0',
  // '&:first-child': { marginRight: '5px' },
  width: '100%',
  textTransform: 'capitalize',
  display: 'flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
