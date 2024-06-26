import React, {FormEvent, useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {IInt} from "../newApplication/NewApplication";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import './neactivka.css';

interface IState {
  region: IInt;
  district: IInt;
  nonActiveStatus: IInt;
  nonActivePaymentStatus: IInt;
  nonActiveReason: IInt;
  tariff: IInt;
  discount: IInt;
  fixEquipment: IInt;
  address: string;
  userName: string;
  userSirName: string;
  personalAccount: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  comment: string;
}

const Neactivka = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<IInt[]>([]);
  const [districts, setDistricts] = useState<IInt[]>([]);
  const [nonActiveStatuses, setNonActiveStatuses] = useState<IInt[]>([]);
  const [nonActivePaymentStatuses, setNonActivePaymentStatuses] = useState<IInt[]>([]);
  const [nonActiveReasons, setNonActiveReasons] = useState<IInt[]>([]);
  const [tariffs, setTariffs] = useState<IInt[]>([]);
  const [discounts, setDiscounts] = useState<IInt[]>([]);
  const [fixEquipnents, setFixEquipnents] = useState<IInt[]>([]);
  const [state, setState] = useState<IState>({
    region: {ID: '', VALUE: ''},
    district: {ID: '', VALUE: ''},
    nonActiveStatus: {ID: '', VALUE: ''},
    nonActivePaymentStatus: {ID: '', VALUE: ''},
    nonActiveReason: {ID: '', VALUE: ''},
    tariff: {ID: '', VALUE: ''},
    discount: {ID: '', VALUE: ''},
    fixEquipment: {ID: '', VALUE: ''},
    address: '',
    userName: '',
    userSirName: '',
    personalAccount: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    comment: '',
  });
  const [dataLoading, setDataLoading] = useState(false);

  const handleChange = (
    event: { target: { name: string; value: unknown } }
  ) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]:
        name === 'region' ||
        name === 'district' ||
        name === 'nonActiveStatus' ||
        name === 'nonActivePaymentStatus' ||
        name === 'nonActiveReason' ||
        name === 'tariff' ||
        name === 'discount' ||
        name === 'fixEquipment' ?
          getCurrentOption(name, value) : value
    }));
  };

  const getCurrentOption = (optionsName: string, name: unknown) => {
    switch (optionsName) {
      case 'region':
        return regions.filter((item) => item.VALUE === name)[0];
      case 'district':
        return districts.filter((item) => item.VALUE === name)[0];
      case 'nonActiveStatus':
        return nonActiveStatuses.filter((item) => item.VALUE === name)[0];
      case 'nonActivePaymentStatus':
        return nonActivePaymentStatuses.filter((item) => item.VALUE === name)[0];
      case 'nonActiveReason':
        return nonActiveReasons.filter((item) => item.VALUE === name)[0];
      case 'tariff':
        return tariffs.filter((item) => item.VALUE === name)[0];
      case 'discount':
        return discounts.filter((item) => item.VALUE === name)[0];
      case 'fixEquipment':
        return fixEquipnents.filter((item) => item.VALUE === name)[0];
    }
  };

  const getData = async () => {
    try {
      setDataLoading(true);
      const req = await axiosApi('neactivka/');
      const res = await req.data;
      setDistricts(res[0]);
      setRegions(res[1])
      setNonActiveStatuses(res[2]);
      setNonActivePaymentStatuses(res[3]);
      setTariffs(res[4]);
      setNonActiveReasons(res[5]);
      setDiscounts(res[6]);
      setFixEquipnents(res[7]);
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
      state.region.VALUE &&
      state.district.VALUE &&
      state.nonActiveStatus.VALUE &&
      state.nonActivePaymentStatus.VALUE &&
      state.nonActiveReason.VALUE &&
      state.tariff.VALUE &&
      state.discount.VALUE &&
      state.fixEquipment.VALUE &&
      state.address &&
      state.userName &&
      state.userSirName &&
      state.personalAccount &&
      state.phoneNumber &&
      state.additionalPhoneNumber &&
      state.phoneNumber !== state.additionalPhoneNumber
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (allFieldsFilled()) {
      await axiosApi.post('create-neactivka/', {...state});
      navigate('/neactivka-list');
    }
  };

  return (
    <Box component="form" className="neactivka-form" onSubmit={onSubmit}>
      <div className="neactivka-form-inner">
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
            value={state.district?.VALUE}
            noOptionsText="Не найдено"
            id="combo-box-demo"
            options={districts?.map((item) => item.VALUE)}
            // @ts-ignore
            onChange={(e) => handleChange({target: {name: 'district', value: e.target.innerHTML}})}
            loading={dataLoading}
            loadingText="Загрузка..."
            renderInput={(params) => <TextField {...params} label="Район"/>}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Статус неактивки</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Статус неактивки"
              onChange={(e) => handleChange({target: {name: 'nonActiveStatus', value: e.target.value}})}
            >
              {
                nonActiveStatuses.map((item, i) => (
                  <MenuItem value={item.VALUE} key={i}>{item.VALUE}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Статус оплаты неактивки</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Статус оплаты неактивки"
              onChange={(e) => handleChange({target: {name: 'nonActivePaymentStatus', value: e.target.value}})}
            >
              {
                nonActivePaymentStatuses.map((item, i) => (
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
              value={state.address}
              label="Адрес в формате: ул. Фрунзе 1"
              name="address"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Тариф</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Тариф"
              onChange={(e) => handleChange({target: {name: 'tariff', value: e.target.value}})}
            >
              {
                tariffs.map((item, i) => (
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
              value={state.userName}
              label="Имя абонента"
              name="userName"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              maxRows={4}
              value={state.userSirName}
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
              value={state.phoneNumber}
              label="Основной номер телефона"
              name="phoneNumber"
              onChange={handleChange}
              inputProps={{maxLength: 9}}
              helperText={state.phoneNumber && state.phoneNumber.length < 9 && 'Формат: 700555333'}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <TextField
              id="outlined-multiline-flexible"
              value={state.additionalPhoneNumber}
              label="Доп. номер телефона"
              name="additionalPhoneNumber"
              onChange={handleChange}
              inputProps={{maxLength: 9}}
              helperText={
                state.additionalPhoneNumber &&
                state.additionalPhoneNumber?.length < 9 ? 'Формат: 700555333' :
                  state.additionalPhoneNumber && state.additionalPhoneNumber === state.phoneNumber ?
                    'Основной и доп. номера не должны быть похожими' : ''
              }
              error={state.additionalPhoneNumber &&
              state.additionalPhoneNumber?.length > 0 ? state.additionalPhoneNumber === state.phoneNumber : false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Причина неактивки</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Причина неактивки"
              onChange={(e) => handleChange({target: {name: 'nonActiveReason', value: e.target.value}})}
            >
              {
                nonActiveReasons.map((item, i) => (
                  <MenuItem value={item.VALUE} key={i}>{item.VALUE}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Акции</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Акции"
              onChange={(e) => handleChange({target: {name: 'discount', value: e.target.value}})}
            >
              {
                discounts.map((item, i) => (
                  <MenuItem value={item.VALUE} key={i}>{item.VALUE}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className="form-control">
            <InputLabel id="demo-simple-select-label">Демонтируемое оборудование</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Демонтируемое оборудование"
              onChange={(e) => handleChange({target: {name: 'fixEquipment', value: e.target.value}})}
            >
              {
                fixEquipnents.map((item, i) => (
                  <MenuItem value={item.VALUE} key={i}>{item.VALUE}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Комментарий"
            multiline
            rows={4}
            value={state.comment}
            name="comment"
            onChange={handleChange}
          />
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

export default Neactivka;