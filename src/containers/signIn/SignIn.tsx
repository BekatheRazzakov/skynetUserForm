import React, {useState} from 'react';
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './sign-in.css';
import axios from "axios";
import {ISignIn} from "../../type";

const SignIn = () => {
  const [state, setState] = useState<ISignIn>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const req = await axios.post('http://10.1.2.10:8001/login/', state);
    console.log(await req.data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <TextField
            label="Имя"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            required
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            value={state.password}
            onChange={inputChangeHandler}
            required
          />
          <Button
            type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
            disabled={
              !state.username ||
              !state.password
            }
          >
            Логин
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-up" variant="body2">
                Нет аккаунта? Регистрация
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignIn;
