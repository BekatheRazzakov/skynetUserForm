import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Location from "../../components/location/location";
import OrderStatus from "../../components/orderStatus/orderStatus";
import {SelectChangeEvent} from "@mui/material/Select";
import FileInput from "../../components/FileInput/FileInput";
import AboutUser from "../../components/aboutUser/aboutUser";
import Location2 from "../../components/location2/location2";
import axios from "axios";
import {IState} from "../../App";
import ConfirmFormModal from "../../components/confirmFormModal/ConfirmFormModal";
import './form.css';

export interface IRegion {
  ID: number;
  VALUE: string;
}

interface IRegions {
  [region: string]: IRegion[]
}

const Form = () => {
  const [regions, setRegions] = useState([]);
  const [regions2, setRegions2] = useState<IRegions>({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districts2, setDistricts2] = useState<IRegion[]>([]);
  const [streets, setStreets] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [routerInstallations, setRouterInstallations] = useState([]);
  const [tariffs, setTariffs] = useState([]);
  const [providersFrom, setProvidersFrom] = useState([]);
  const [superTvs, setSuperTvs] = useState([]);
  const [currentForm, setCurrentForm] = useState(1);
  const [state, setState] = useState<IState>({
    region: {name: "", hydra_id: -1,},
    region2: "",
    city: {name: "", hydra_id: -1,},
    district: {name: "", hydra_id: -1,},
    district2: {VALUE: "", ID: -1,},
    address: "",
    orderStatus: {VALUE: "", ID: -1,},
    routerInstallationType: {VALUE: "", ID: -1,},
    tariff: {VALUE: "", ID: -1,},
    superTv: {VALUE: "", ID: -1,},
    providerFrom: {VALUE: "", ID: -1,},
    passport: null,
    passport2: null,
    locationScreenShot: null,
    description: "",
  });
  const [currentImageInput, setCurrentImageInput] = useState('');
  const [confirmationReq, setConfirmationReq] = useState('');

  const toggleConfirmation = () => {
    if (confirmationReq === 'open') {
      setConfirmationReq('closed');
    } else if (confirmationReq === 'closed' || confirmationReq === '') {
      setConfirmationReq('open');
    }
  };

  const handleChange = (
    event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    obj?: { name: string; hydra_id: number; } | null,
    dist?: { VALUE: string; ID: number; } | null,
  ) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]:
        name === 'region' ||
        name === 'city' ||
        name === 'district' ||
        name === 'street' ?
          obj : name === 'district2' ||
          name === 'orderStatus' ||
          name === 'routerInstallationType' ||
          name === 'superTv' ||
          name === 'providerFrom' ||
          name === 'tariff' ?
            dist : value,
    }));
    if (name === 'region') {
      setState((prevState) => ({
        ...prevState,
        city: {name: '', hydra_id: -1},
      }));
      void getCities(obj?.hydra_id.toString() || '');
    } else if (name === 'city') {
      setState((prevState) => ({
        ...prevState,
        district: {name: '', hydra_id: -1},
      }));
      void getDistricts(obj?.hydra_id.toString() || '');
    } else if (name === 'district') {
      setState((prevState) => ({
        ...prevState,
        street: {name: '', hydra_id: -1},
      }));
      void getStreets(obj?.hydra_id.toString() || '');
    } else if (name === 'region2') {
      setState((prevState) => ({
        ...prevState,
        district2: {VALUE: '', ID: -1},
      }));
      const dists = getRegions2Districts(value);
      setDistricts2(dists);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (
      file && (
        file.name.slice(-4) === '.jpg' ||
        file.name.slice(-4) === '.jpeg' ||
        file.name.slice(-4) === '.png'
      )) {
      setState((prevState) => ({
        ...prevState,
        [fieldName]: file,
      }));
    } else if (
      file && (
        file.name.slice(-4) !== '.jpg' ||
        file.name.slice(-4) !== '.jpeg' ||
        file.name.slice(-4) !== '.png'
      )) {
      alert('Загрузка фото только в формате .jpg, .jpeg или .png');
    }
  };

  const removeImage = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: null,
    }));
  };

  const getRegions = async () => {
    try {
      const res = await axios.get(
        'http://10.1.9.122:8000/region_list/');
      const regions = await res.data;
      setRegions(regions);
    } catch (e) {
      console.log(e);
    }
  };

  const getRegions2 = async () => {
    try {
      const res = await axios.get(`http://10.1.9.122:8000/bx/`);
      setRegions2(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getRegions2Districts = (name: string) => {
    return regions2[name];
  };

  const getCities = async (parent_id: string) => {
    try {
      const res = await axios.get(
        `http://10.1.9.122:8000/get_child/?parent_id=${parent_id}`);
      const cities = await res.data;
      setCities(cities);
    } catch (e) {
      console.log(e);
    }
  };

  const getDistricts = async (parent_id: string) => {
    try {
      const res = await axios.get(
        `http://10.1.9.122:8000/get_child/?parent_id=${parent_id}`);
      const cities = await res.data;
      setDistricts(cities);
    } catch (e) {
      console.log(e);
    }
  };

  const getStreets = async (parent_id: string) => {
    try {
      const res = await axios.get(
        `http://10.1.9.122:8000/get_child/?parent_id=${parent_id}`);
      const cities = await res.data;
      setStreets(cities);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrderStatusData = async () => {
    try {
      const res = await axios.get(
        `http://10.1.9.122:8000/send-data-router/`);
      const orderStatuses = await res.data[2];
      setOrderStatuses(orderStatuses.splice(0, 2));

      const superTvs = await res.data[4];
      setSuperTvs(superTvs);

      const routerInstallations = await res.data[1];
      setRouterInstallations(routerInstallations.filter((item: IRegion) => item.VALUE !== 'Да выкуп'));

      const tariffs = await res.data[0].map((item: IRegion) => {
        if (
          item.VALUE === 'Оптимальный (600)' ||
          item.VALUE === 'Sky70 (890)' ||
          item.VALUE === 'Промо70 (980)' ||
          item.VALUE === 'Промо90 (1190)' ||
          item.VALUE === 'Промо100 (1280)'
        ) {
          return item;
        }
      });
      setTariffs(tariffs.filter((item: IRegion) => item));

      const providersFrom = await res.data[3].map((item: IRegion) => {
        if (
          item.VALUE.includes('Aknet') ||
          item.VALUE.includes('Saima Telecom') ||
          item.VALUE.includes('Megaline') ||
          item.VALUE.includes('Netline') ||
          item.VALUE.includes('Homeline') ||
          item.VALUE.includes('Neotelecom') ||
          item.VALUE.includes('Maxnet') ||
          item.VALUE.includes('FastNet') ||
          item.VALUE.includes('КыргызТелеком-Jet') ||
          item.VALUE.includes('Мобильный интернет') ||
          item.VALUE.includes('Без провайдера')
        ) {
          return item;
        }
      });
      setProvidersFrom(providersFrom.filter((item: IRegion) => item));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    void getRegions();
    void getRegions2();
    void getOrderStatusData();
  }, []);

  const locationFilled = () => {
    return Boolean(
      state.region?.name &&
      state.city?.name &&
      state.district?.name &&
      ((streets.length && state.street?.name && state.address) || (!streets.length && state.address))
    );
  };

  const location2Filled = () => {
    return Boolean(
      state.region2 &&
      state.district2?.VALUE
    );
  };

  const orderStatus = () => {
    return Boolean(
      state.orderStatus &&
      state.routerInstallationType &&
      state.tariff &&
      state.superTv
    );
  };

  const assets = () => {
    return Boolean(
      state.passport &&
      state.passport &&
      state.passport2 &&
      state.locationScreenShot);
  };

  const clientInfoFilled = () => {
    return Boolean(
      state.providerFrom &&
      state.username &&
      state.userSirName &&
      state.userPhoneNumber &&
      state.userAdditionalPhoneNumber
    );
  };

  return (
    <div className="App">
      <Box className="form-nav">
        <Button
          variant="contained"
          endIcon={<ArrowBackIosNewIcon/>}
          disabled={currentForm === 1}
          onClick={() => setCurrentForm(currentForm - 1)}
        />
        <Typography>
          {currentForm === 1 ? 'Ваш адрес' : ''}
          {currentForm === 2 ? 'Локация' : ''}
          {currentForm === 3 ? 'Статус заявки' : ''}
          {currentForm === 4 ? 'Загрузка фото' : ''}
          {currentForm === 5 ? 'Описание' : ''}
          {currentForm === 6 ? 'О абоненте' : ''}
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon/>}
          disabled={
            // (currentForm === 1 && !locationFilled()) ||
            // (currentForm === 2 && !location2Filled()) ||
            // (currentForm === 3 && !orderStatus()) ||
            // (currentForm === 4 && !assets()) ||
            currentForm === 6
          }
          onClick={() => setCurrentForm(currentForm + 1)}
        />
      </Box>
      <Box className="form" component="form" onSubmit={(e) => {
        e.preventDefault();
        if (locationFilled() && location2Filled() && orderStatus() && assets() && clientInfoFilled()) {
          toggleConfirmation();
        }
      }}>
        {currentForm === 1 && <Location
          regions={regions}
          cities={cities}
          districts={districts}
          streets={streets}
          region={state.region}
          city={state.city}
          district={state.district}
          street={state.street}
          address={state.address}
          handleChange={handleChange}
        />}
        {currentForm === 2 && <Location2
          regions2={Object.keys(regions2)}
          districts2={districts2}
          region2={state.region2}
          district2={state.district2}
          handleChange={handleChange}
        />}
        {currentForm === 3 && <OrderStatus
          orderStatus={state.orderStatus}
          routerInstallationType={state.routerInstallationType}
          tariff={state.tariff}
          superTv={state.superTv}
          orderStatuses={orderStatuses}
          routerInstallations={routerInstallations}
          tariffs={tariffs}
          superTvs={superTvs}
          handleChange={handleChange}
        />}
        {currentForm === 4 &&
          <Container component="main">
            <Box
              style={{
                margin: '25px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onMouseDown={() => setCurrentImageInput('passport')}
            >
              <FileInput
                label="Лицевая сторона паспорта"
                handleImageChange={handleImageChange}
                file={state?.passport ? state.passport : null}
                removeImage={removeImage}
                currentImageInput={currentImageInput}
              />
            </Box>
            <Box
              style={{
                margin: '25px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onMouseDown={() => setCurrentImageInput('passport2')}
            >
              <FileInput
                label="Обратная сторона паспорта"
                handleImageChange={handleImageChange}
                file={state?.passport2 ? state.passport2 : null}
                removeImage={removeImage}
                currentImageInput={currentImageInput}
              />
            </Box>
            <Box
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onMouseDown={() => setCurrentImageInput('locationScreenShot')}
            >
              <FileInput
                label="Скриншот локации"
                handleImageChange={handleImageChange}
                file={state?.locationScreenShot ? state.locationScreenShot : null}
                removeImage={removeImage}
                currentImageInput={currentImageInput}
              />
            </Box>
          </Container>
        }
        {
          currentForm === 5 &&
          <TextField
            className="description-field"
            id="outlined-multiline-static"
            label="Описание"
            multiline
            rows={5}
            onChange={handleChange}
            value={state.description}
            name="description"
          />
        }
        {
          currentForm === 6 &&
          <AboutUser
            providerFrom={state.providerFrom}
            providersFrom={providersFrom}
            username={state.username}
            userSirName={state.userSirName}
            userPhoneNumber={state.userPhoneNumber}
            userAdditionalPhoneNumber={state.userAdditionalPhoneNumber}
            handleChange={handleChange}
          />
        }
        {
          locationFilled() && location2Filled() && orderStatus() && assets() && clientInfoFilled() &&
          <Button
            className='confirm-form-button'
            type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
          >
            {
              locationFilled() && location2Filled() && orderStatus() && assets() && clientInfoFilled() ?
                'Подтвердить'
                : 'Заполните все поля'
            }
          </Button>
        }
      </Box>
      <ConfirmFormModal
        // @ts-ignore
        data={state}
        state={confirmationReq}
        toggleModal={toggleConfirmation}
      />
    </div>
  );
}

export default Form;
