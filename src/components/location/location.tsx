import React from 'react';
import {Autocomplete, Box, Container, Grid, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {IState} from "../../App";

const Location: React.FC<IState> = (
  {
    regions, cities, districts, streets, regionsLoading, regions2Loading, citiesLoading,
    districtsLoading, streetsLoading, region, city, district, street, address, entrance, floor, apart,
    districts2, district2, districts2Loading, handleChange
  }
) => {
  const getCurrentRegion = (name: string) => {
    return regions?.filter(region => region.name === name)[0] || null;
  };

  const getCurrentCity = (name: string) => {
    return cities?.filter(city => city.name === name)[0] || null;
  };

  const getCurrentDistrict = (name: string) => {
    return districts?.filter(district => district.name === name)[0] || null;
  };

  const getCurrentDistrict2 = (name: string) => {
    return districts2?.filter(district => district.VALUE === name)[0] || null;
  };

  const getCurrentStreet = (name: string) => {
    return streets?.filter(street => street.name === name)[0] || null;
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
              <InputLabel id="demo-simple-select-label">Регион</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={region?.name}
                label="Регион"
                name="region"
                onChange={(e) => handleChange ? handleChange(e, getCurrentRegion(e.target.value)) : () => {
                }}
              >
                {
                  regions2Loading || regionsLoading ?
                    <MenuItem>Загрузка...</MenuItem>
                    :
                    regions?.map((location, i) => (
                      <MenuItem value={location.name} key={i}>{location.name}</MenuItem>
                    ))
                }
              </Select>
            </FormControl>
          </Grid>
          {region?.name &&
            <Grid item xs={12}>
              <FormControl fullWidth className="form-control">
                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city?.name}
                  label="Город"
                  name="city"
                  onChange={(e) => handleChange ? handleChange(e, getCurrentCity(e.target.value)) : () => {
                  }}
                >
                  {
                    citiesLoading ?
                      <MenuItem>Загрузка...</MenuItem>
                      :
                      cities?.map((location, index) => (
                        <MenuItem value={location.name} key={index}>{location.name}</MenuItem>
                      ))
                  }
                </Select>
              </FormControl>
            </Grid>
          }
          {city?.name &&
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                // @ts-ignore
                value={district?.name}
                noOptionsText="Не найдено"
                id="combo-box-demo"
                // @ts-ignore
                options={districts?.map((item) => item.name)}
                onChange={(e) =>
                  // @ts-ignore
                  handleChange({
                    // @ts-ignore
                    target: {name: 'district'}
                    // @ts-ignore
                  }, getCurrentDistrict(e.target.innerHTML))}
                loading={districtsLoading}
                loadingText="Загрузка..."
                renderInput={(params) => <TextField {...params} label="Мкр/ж-в/улица"/>}
              />
            </Grid>
          }
          {district?.name && streets?.length !== 0 &&
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                // @ts-ignore
                value={street?.name}
                noOptionsText="Не найдено"
                id="combo-box-demo"
                // @ts-ignore
                options={streets?.map((item) => item.name)}
                onChange={(e) =>
                  // @ts-ignore
                  handleChange({
                    // @ts-ignore
                    target: {name: 'street'}
                    // @ts-ignore
                  }, getCurrentStreet(e.target.innerHTML))}
                loading={streetsLoading}
                loadingText="Загрузка..."
                renderInput={(params) => <TextField {...params} label="Улица"/>}
              />
            </Grid>
          }
          {district?.name && !district?.name.includes('мкр') &&
            <Grid item xs={12}>
              <FormControl fullWidth className="form-control">
                <TextField
                  id="outlined-multiline-flexible"
                  maxRows={4}
                  value={address}
                  label="Точный адрес"
                  name="address"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          }
          {district?.name && district?.name.includes('мкр') &&
            <Grid item xs={12}>
              <FormControl fullWidth className="form-control">
                <TextField
                  id="outlined-multiline-flexible"
                  maxRows={4}
                  value={entrance}
                  label="Подъезд"
                  name="entrance"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          }
          {district?.name && district?.name.includes('мкр') &&
            <Grid item xs={12}>
              <FormControl fullWidth className="form-control">
                <TextField
                  id="outlined-multiline-flexible"
                  maxRows={4}
                  value={floor}
                  label="Этаж"
                  name="floor"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          }
          {district?.name && district?.name.includes('мкр') &&
            <Grid item xs={12}>
              <FormControl fullWidth className="form-control">
                <TextField
                  id="outlined-multiline-flexible"
                  maxRows={4}
                  value={apart}
                  label="Квартира"
                  name="apart"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          }
          {region?.name &&
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                // @ts-ignore
                value={district2?.VALUE}
                noOptionsText="Не найдено"
                id="combo-box-demo"
                // @ts-ignore
                options={districts2?.map((item) => item.VALUE)}
                onChange={(e) =>
                  // @ts-ignore
                  handleChange({
                    // @ts-ignore
                    target: {name: 'district2'}
                    // @ts-ignore
                  }, null, getCurrentDistrict2(e.target.innerHTML))}
                loading={districts2Loading}
                loadingText="Загрузка..."
                renderInput={(params) => <TextField {...params} label="Наименование локации"/>}
              />
            </Grid>
          }
        </Grid>
      </Box>
    </Container>
  );
}

export default Location;
