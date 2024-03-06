import React from 'react';
import {Autocomplete, Box, Container, Grid, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {IState} from "../../App";

const Location: React.FC<IState> = (
  {regions2, districts2, region2, district2, handleChange}
) => {
  const getCurrentRegion = (name: string) => {
    return regions2?.filter(region => region.VALUE === name)[0] || null;
  };

  const getCurrentDistrict = (name: string) => {
    return districts2?.filter(district => district.VALUE === name)[0] || null;
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
                value={region2}
                label="Регион"
                name="region2"
                onChange={(e) => handleChange ? handleChange(e,null, getCurrentRegion(e.target.value)) : () => {
                }}
              >
                {
                  regions2?.map((location, i) => (
                    <MenuItem value={location.VALUE} key={i}>{location.VALUE}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          {region2 &&
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
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
                  }, null, getCurrentDistrict(e.target.innerHTML))}
                renderInput={(params) => <TextField {...params} label="Район"/>}
              />
            </Grid>
          }
        </Grid>
      </Box>
    </Container>
  );
}

export default Location;
