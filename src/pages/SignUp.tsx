import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

import Logo from '../assets/logo.svg';

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleStart = () => {
    // TODO: insert service logic here
  };

  return (
    <div>
      <Logo />
      <p>
        Welcome to EXODOO game! Let’s plan exoplanet colonisation. Choose planets you like and see what matches do you have with other astronauts
      </p>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField label="Nickname" onChange={handleNicknameChange} value={nickname} />
        <Button onClick={handleStart}>Start</Button>
      </Box>
    </div>
  );
};

export default SignUp;
