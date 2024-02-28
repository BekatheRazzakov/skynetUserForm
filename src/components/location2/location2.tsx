import React from 'react';
import {Box, Container, Grid} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {IState} from "../../App";

const Location2: React.FC<IState> = (
  {regions2, districts2, region2, district2, handleChange}
) => {
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
                onChange={(e) => handleChange ? handleChange(e) : () => {
                }}
              >
                {
                  regions2?.map((region, i) => (
                    <MenuItem value={region} key={i}>{region}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          {region2 &&
            <Grid item xs={12}>
              <FormControl fullWidth className="form-control">
                <InputLabel id="demo-simple-select-label">Район</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={district2?.VALUE}
                  label="Район"
                  name="district2"
                  onChange={(e) => handleChange ?
                    handleChange(e, null, getCurrentDistrict(e.target.value))
                    : () => {
                    }}
                >
                  {
                    districts2?.map((location, index) => (
                      <MenuItem value={location.VALUE} key={index}>{location.VALUE}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          }
        </Grid>
      </Box>
    </Container>
  )
    ;
}

export default Location2;
