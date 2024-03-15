import React from 'react';
import {Autocomplete, Box, Button, Grid, TextField} from "@mui/material";
import './neactivka.css';
import FormControl from "@mui/material/FormControl";

const Neactivka = () => {
  return (
    <Box component="form" className="neactivka-form">
      <div className="neactivka-form-inner">
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            value=""
            noOptionsText="Не найдено"
            id="combo-box-demo"
            options={[]}
            onChange={() => {
            }}
            loading={false}
            loadingText="Загрузка..."
            renderInput={(params) => <TextField {...params} label="Наименование локации"/>}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            value=""
            noOptionsText="Не найдено"
            id="combo-box-demo"
            options={[]}
            onChange={() => {
            }}
            loading={false}
            loadingText="Загрузка..."
            renderInput={(params) => <TextField {...params} label="Статус неактивки"/>}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              maxRows={4}
              value=""
              label="Адрес в формате: ул. Фрунзе 1"
              name="address"
              onChange={() => {
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            value=""
            noOptionsText="Не найдено"
            id="combo-box-demo"
            options={[]}
            onChange={() => {
            }}
            loading={false}
            loadingText="Загрузка..."
            renderInput={(params) => <TextField {...params} label="Тариф"/>}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              maxRows={4}
              value=""
              label="Имя абонента"
              name="name"
              onChange={() => {
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              maxRows={4}
              value=""
              label="Фамилия абонента"
              name="sirName"
              onChange={() => {
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              maxRows={4}
              value=""
              label="Лицевой счёт"
              name="personalAccount"
              onChange={() => {
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value=""
              label="Основной номер телефона"
              name="userPhoneNumber"
              onChange={() => {
              }}
              inputProps={{maxLength: 9}}
              // helperText={
              //   userAdditionalPhoneNumber &&
              //   userAdditionalPhoneNumber?.length < 9 ? 'Формат: 700555333' :
              //     userAdditionalPhoneNumber && userAdditionalPhoneNumber === userPhoneNumber ?
              //       'Основной и доп. номера не должны быть похожими' : ''
              // }
              // error={userAdditionalPhoneNumber &&
              // userAdditionalPhoneNumber?.length > 0 ? userAdditionalPhoneNumber === userPhoneNumber : false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value=""
              label="Доп. номер телефона"
              name="userAdditioanlPhoneNumber"
              onChange={() => {
              }}
              inputProps={{maxLength: 9}}
              // helperText={
              //   userAdditionalPhoneNumber &&
              //   userAdditionalPhoneNumber?.length < 9 ? 'Формат: 700555333' :
              //     userAdditionalPhoneNumber && userAdditionalPhoneNumber === userPhoneNumber ?
              //       'Основной и доп. номера не должны быть похожими' : ''
              // }
              // error={userAdditionalPhoneNumber &&
              // userAdditionalPhoneNumber?.length > 0 ? userAdditionalPhoneNumber === userPhoneNumber : false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            value=""
            noOptionsText="Не найдено"
            id="combo-box-demo"
            options={[]}
            onChange={() => {
            }}
            loading={false}
            loadingText="Загрузка..."
            renderInput={(params) => <TextField {...params} label="Причина неактивки"/>}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Комментарий"
            multiline
            rows={4}
          />
        </Grid>
      </div>
      <Button
        variant="contained" type="submit"
        style={{margin: '10px 0'}}
      >Подтвердить</Button>
    </Box>
  );
};

export default Neactivka;