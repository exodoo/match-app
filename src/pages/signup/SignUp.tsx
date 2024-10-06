import React, { useState } from 'react';
import { TextField, Button, Box, Typography, ThemeProvider, createTheme } from '@mui/material';

import Logo from '../../assets/logo.svg';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setNickname(event.target.value);
  };

  const handleStart = () => {
    // TODO: insert service logic here
  };

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode: 'dark',
      },
    })}>
      <Box className="sign-up-page">
        <Box className="sign-up-content" gap={8}>
          <Logo />
          <Box alignItems="center" flexDirection="column" display="flex" gap={5} flexGrow={1}>
            <Typography variant="h5" sx={{
              color: 'white',
              marginBottom: '1rem',
            }}>
              EXinder game
            </Typography>
            <Typography variant="body2" sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Welcome to EXODOO game! Let’s plan exoplanet colonisation. Choose planets you like and see what matches do you have with other astronauts
            </Typography>
            <TextField label="Nickname" onChange={handleNicknameChange} value={nickname} fullWidth error={!!error} helperText={error} />
          </Box>
          <Button disabled={!nickname || !!error} onClick={handleStart} color="warning" variant="contained" size="large" fullWidth>Start</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
