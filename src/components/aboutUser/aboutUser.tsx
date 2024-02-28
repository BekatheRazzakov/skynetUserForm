import React from 'react';
import {Box, Container, Grid, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {IState} from "../../App";

const AboutUser: React.FC<IState> = (
  {providerFrom, providersFrom, username, userSirName, userPhoneNumber, userAdditionalPhoneNumber, handleChange}
) => {
  const getCurrentChoice = (value: string) => {
    return providersFrom?.filter(item => item.VALUE === value)[0];
  };

  return (
    <Container component="main">
      <Box
        style={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <InputLabel id="demo-simple-select-label">Переход с какого провайдера</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={providerFrom?.VALUE}
                label="Переход с какого провайдера"
                name="providerFrom"
                onChange={(e) => handleChange ?
                  handleChange(e, null, getCurrentChoice(e.target.value)) : () => {
                  }}
              >
                {
                  providersFrom?.map((item, i) => (
                    <MenuItem value={item.VALUE} key={i}>{item.VALUE}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <TextField
                id="outlined-multiline-flexible"
                maxRows={4}
                value={username}
                label="Имя абонента"
                name="username"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <TextField
                id="outlined-multiline-flexible"
                maxRows={4}
                value={userSirName}
                label="Фамилия абонента"
                name="userSirName"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <TextField
                id="outlined-multiline-flexible"
                maxRows={4}
                value={userPhoneNumber}
                label="Основной номер телефона в формате: 555112233"
                name="userPhoneNumber"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <TextField
                id="outlined-multiline-flexible"
                maxRows={4}
                value={userAdditionalPhoneNumber}
                label="Доп. номер телефона в формате: 555112233"
                name="userAdditionalPhoneNumber"
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
    ;
}

export default AboutUser;
