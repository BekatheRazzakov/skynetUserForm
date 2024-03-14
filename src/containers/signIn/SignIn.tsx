import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './sign-in.css';
import {ISignIn} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {signIn} from "../../features/userThunk";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const [state, setState] = useState<ISignIn>({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (userToken) {
      navigate('/my-applications');
    }
  }, [navigate, userToken]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(signIn(state));
    } catch (e) {
      console.log(e);
    }
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
