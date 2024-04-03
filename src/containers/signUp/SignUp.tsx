import React, {useEffect, useState} from 'react';
import {Alert, Autocomplete, Avatar, Box, Container, Grid, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {ISignUp, ISupervizer} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {signUp} from "../../features/userThunk";
import {Link, useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import './sign-up.css';
import axiosApi from "../../axiosApi";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const authError = useAppSelector((state) => state.userState.authorizationError);
  const authLoading = useAppSelector((state) => state.userState.signUpLoading);
  const [state, setState] = useState<ISignUp>({
    username: '',
    surname: '',
    password: '',
    confirmPassword: '',
    hydra_id_sales: '',
    supervizer: -1,
  });
  const [supervizers, setSupervizers] = useState<ISupervizer[]>([]);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    void getSupervizers();
  }, []);

  useEffect(() => {
    if (userToken) {
      navigate('/my-applications');
    }
  }, [navigate, userToken]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPasswordError('');
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    getPasswordError();
    if (state.password !== state.confirmPassword) {
      return;
    }
    dispatch(signUp(state));
  };

  const getSupervizers = async () => {
    try {
      const req = await axiosApi('/register/');
      const supervizers = await req.data;
      setSupervizers(supervizers);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentSupervizer = (name: string) => {
    return Number(supervizers.filter((item) => item.supervizer_surname === name)[0].id);
  };

  const getPasswordError = () => {
    if (state.password !== state.confirmPassword) {
      return setPasswordError('Введённые пароли не совпадают');
    }
    setPasswordError('');
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <TextField
            label="Login"
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            required
          />
          <TextField
            label="ФИО"
            name="surname"
            value={state.surname}
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
          <TextField
            name="confirmPassword"
            label="Подтвердите пароль"
            type="password"
            value={state.confirmPassword}
            onChange={inputChangeHandler}
            required
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
          <TextField
            label="Гидра ID"
            name="hydra_id_sales"
            value={state.hydra_id_sales}
            onChange={inputChangeHandler}
          />
          <Autocomplete
            noOptionsText="Не найдено"
            disablePortal
            id="combo-box-demo"
            options={supervizers.map((item) => item.supervizer_surname)}
            onChange={(e) =>
              inputChangeHandler({
                // @ts-ignore
                target: {name: 'supervizer', value: getCurrentSupervizer(e.target.innerHTML)}
              })}
            renderInput={(params) => <TextField required {...params} label="Супервайзер"/>}
          />
          {authError && <Alert severity="error">{authError}</Alert>}
          <LoadingButton
            type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
            disabled={
              !state.username ||
              !state.surname ||
              !state.password ||
              !state.confirmPassword ||
              state.supervizer <= 0
            }
            loading={authLoading}
          >
            Зарегистрироваться
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-in">
                Уже есть аккаунт? Логин
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
