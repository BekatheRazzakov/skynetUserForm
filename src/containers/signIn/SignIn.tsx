import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Box, Container, Grid, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {ISignIn} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {signIn} from "../../features/userThunk";
import {Link, useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import './sign-in.css';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const authError = useAppSelector((state) => state.userState.authorizationError);
  const authLoading = useAppSelector((state) => state.userState.signInLoading);
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
          {authError && <Alert severity="error">{authError}</Alert>}
          <LoadingButton
            type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
            disabled={
              !state.username ||
              !state.password
            }
            loading={authLoading}
          >
            Логин
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-up">
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
