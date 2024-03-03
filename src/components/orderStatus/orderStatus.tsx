import React from 'react';
import {Box, Container, Grid} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {IState} from "../../App";
import {IRegion} from "../../containers/form/Form";

const OrderStatus: React.FC<IState> = (
  {
    orderStatus, routerInstallationType, tariff, superTv, handleChange,
    orderStatuses, routerInstallations, tariffs, superTvs
  }
) => {
  const getCurrentChoice = (field: string, value: string) => {
    switch (field) {
      case 'orderStatus':
        return orderStatuses?.filter(item => item.VALUE === value)[0];
      case 'routerInstallationType':
        return routerInstallations?.filter(item => item.VALUE === value)[0];
      case 'tariff':
        return tariffs?.filter(item => item.VALUE === value)[0];
      case 'superTv':
        return superTvs?.filter(item => item.VALUE === value)[0];
    }
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
              <InputLabel id="demo-simple-select-label">Статус заявки</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderStatus?.VALUE}
                label="Статус заявки"
                name="orderStatus"
                onChange={(e) => handleChange ?
                  handleChange(e, null, getCurrentChoice('orderStatus', e.target.value)) :
                  () => {}}
              >
                {
                  orderStatuses?.map((item: IRegion) => (
                    <MenuItem value={`${item.VALUE}`} key={item.ID}>{item.VALUE}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <InputLabel id="demo-simple-select-label">Установка Роутера</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={routerInstallationType?.VALUE}
                label="Установка Роутера"
                name="routerInstallationType"
                onChange={(e) => handleChange ?
                  handleChange(e, null, getCurrentChoice('routerInstallationType', e.target.value)) :
                  () => {}}
              >
                {
                  routerInstallations?.map((item: IRegion) => (
                    <MenuItem value={`${item.VALUE}`} key={item.ID}>{item.VALUE}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <InputLabel id="demo-simple-select-label">Тариф</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tariff?.VALUE}
                label="Тариф"
                name="tariff"
                onChange={(e) => handleChange ?
                  handleChange(e, null, getCurrentChoice('tariff', e.target.value)) :
                  () => {}}
              >
                {
                  tariffs?.map((item: IRegion) => (
                    <MenuItem value={`${item.VALUE}`} key={item.ID}>{item.VALUE}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className="form-control">
              <InputLabel id="demo-simple-select-label">Установка SuperTV</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={superTv?.VALUE}
                label="Установка SuperTV"
                name="superTv"
                onChange={(e) => handleChange ?
                  handleChange(e, null, getCurrentChoice('superTv', e.target.value)) :
                  () => {}}
              >
                {
                  superTvs?.map((item: IRegion) => (
                    <MenuItem value={`${item.VALUE}`} key={item.ID}>{item.VALUE}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
    ;
}

export default OrderStatus;
