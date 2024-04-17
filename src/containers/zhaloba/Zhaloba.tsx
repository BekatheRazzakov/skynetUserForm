import React, {FormEvent, useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {IInt} from "../newApplication/NewApplication";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import './zhaloba.css';

interface IState {
  region: IInt;
  district: IInt;
  zhalobaReason: IInt;
  street: string;
  personalAccount: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

const Zhaloba = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<IInt[]>([]);
  const [districts, setDistricts] = useState<IInt[]>([]);
  const [zhalobaReasons, setZhalobaReasons] = useState<IInt[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [state, setState] = useState<IState>({
    region: {ID: '', VALUE: ''},
    district: {ID: '', VALUE: ''},
    zhalobaReason: {ID: '', VALUE: ''},
    street: '',
    personalAccount: '',
    name: '',
    surname: '',
    phoneNumber: '',
  });

  const handleChange = (
    event: { target: { name: string; value: unknown } }
  ) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]:
        name === 'region' ||
        name === 'district' ||
        name === 'zhalobaReason' ?
          getCurrentOption(name, value) :
          ['phoneNumber', 'personalAccount'].includes(name) ? (value as string).replace(/[^0-9]/g, '') : value
    }));
    if (name === 'region') {
      setState((prevState) => ({
        ...prevState,
        district: {ID: '', VALUE: ''},
      }));
    }
  };

  const getCurrentOption = (optionsName: string, name: unknown) => {
    switch (optionsName) {
      case 'region':
        return regions.filter((item) => item.VALUE === (name))[0] || null;
      case 'district':
        return districts.filter((item) => item.VALUE === (name))[0] || null;
      case 'zhalobaReason':
        return zhalobaReasons.filter((item) => item.VALUE === (name))[0] || null;
    }
  };

  const getData = async () => {
    try {
      setDataLoading(true);
      const fetchZhalobaData = await axiosApi('zhaloba/');
      const zhalobaData = await fetchZhalobaData.data;
      setDistricts(zhalobaData[0]);
      setRegions(zhalobaData[1]);
      setZhalobaReasons(zhalobaData[2]);
      setDataLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  const allFieldsFilled = () => {
    return (
      state.region?.VALUE &&
      state.district?.VALUE &&
      state.zhalobaReason?.VALUE &&
      state.street &&
      state.personalAccount &&
      state.name &&
      state.surname &&
      state.phoneNumber
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (allFieldsFilled()) {
      await axiosApi.post('create-zhaloba/', {...state});
      navigate('/zhaloba-list');
    }
  };

  return (
    <Box component="form" className="zhaloba-form" onSubmit={onSubmit}>
      <div className="zhaloba-form-inner">
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Регион</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Регион"
              onChange={(e) => handleChange({target: {name: 'region', value: e.target.value}})}
            >
              {
                dataLoading ?
                  <MenuItem>Загрузка...</MenuItem> :
                  regions.map((item, i) => (
                    <MenuItem value={item.VALUE} key={i}>{item.VALUE}</MenuItem>
                  ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            // @ts-ignore
            value={state.district?.VALUE}
            noOptionsText="Не найдено"
            id="combo-box-demo"
            options={districts.map((dist) => dist.VALUE)}
            // @ts-ignore
            onChange={(e) => handleChange({target: {name: 'district', value: e.target.innerHTML}})}
            loading={dataLoading}
            loadingText="Загрузка..."
            renderInput={(params) => <TextField {...params} label="Район"/>}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value={state.street}
              label="Точный адрес"
              name="street"
              onChange={handleChange}
              helperText={state.street && state.street.length < 9 && 'Введите адрес в формате: ул. Фрунзе 1'}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Причина жалобы</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Причина жалобы"
              onChange={(e) => handleChange({target: {name: 'zhalobaReason', value: e.target.value}})}
            >
              {
                zhalobaReasons?.map((item, i) => (
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
              value={state.personalAccount}
              label="Лицевой счёт"
              name="personalAccount"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value={state.name}
              label="Имя абонента"
              name="name"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value={state.surname}
              label="Фамилия абонента"
              name="surname"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value={state.phoneNumber}
              label="Номер телефона"
              name="phoneNumber"
              onChange={handleChange}
              inputProps={{maxLength: 9}}
              helperText={state.phoneNumber.length > 0 ? 'Формат: 700555333' : ''}
            />
          </FormControl>
        </Grid>
      </div>
      <Button
        variant="contained" type="submit"
        style={{margin: '10px 0'}}
        disabled={!allFieldsFilled()}
      >Подтвердить</Button>
    </Box>
  );
};

export default Zhaloba;