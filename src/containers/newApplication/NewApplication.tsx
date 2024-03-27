import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Location from "../../components/location/location";
import OrderStatus from "../../components/orderStatus/orderStatus";
import {SelectChangeEvent} from "@mui/material/Select";
import FileInput from "../../components/FileInput/FileInput";
import AboutUser from "../../components/aboutUser/aboutUser";
import ConfirmFormModal from "../../components/confirmFormModal/ConfirmFormModal";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import axiosApi from "../../axiosApi";
import ConfirmResFormModal from "../../components/confirmResModal/ConfirmResModal";
import {IState} from "../../App";
import './form.css';

export interface IRegion {
  ID: string;
  VALUE: string;
}

interface IRegions {
  [region: string]: IRegion[]
}

const NewApplication = () => {
  const [regions, setRegions] = useState([]);
  const [regions2, setRegions2] = useState<IRegions>({});
  const [regions2List, setRegions2List] = useState<IRegion[]>([]);
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
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [regions2Loading, setRegions2Loading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [districts2Loading, setDistricts2Loading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [streetsLoading, setStreetsLoading] = useState(false);
  const [state, setState] = useState<IState>({
    region: {name: "", hydra_id: -1,},
    region2: "",
    city: {name: "", hydra_id: -1,},
    district: {name: "", hydra_id: -1,},
    district2: {VALUE: "", ID: "",},
    address: "",
    orderStatus: {VALUE: "", ID: "",},
    routerInstallationType: {VALUE: "", ID: "",},
    tariff: {VALUE: "", ID: "",},
    superTv: {VALUE: "", ID: "",},
    providerFrom: {VALUE: "", ID: "",},
    passport: null,
    passport2: null,
    locationScreenShot: null,
    description: "",
    domoPhone: "",
  });
  const [currentImageInput, setCurrentImageInput] = useState('');
  const [confirmationReq, setConfirmationReq] = useState('');
  const [confirmationRes, setConfirmationRes] = useState('');
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    void getRegions();
    void getRegions2();
    void getOrderStatusData();
  }, []);

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in');
    }
  }, [navigate, userToken]);

  const handleChange = (
    event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    obj?: { name: string; hydra_id: number; } | null,
    dist?: { VALUE: string; ID: string; } | null,
  ) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]:
        name === 'region' ||
        name === 'city' ||
        name === 'district' ||
        name === 'street' ?
          obj :
          name === 'district2' ||
          name === 'orderStatus' ||
          name === 'routerInstallationType' ||
          name === 'superTv' ||
          name === 'providerFrom' ||
          name === 'tariff' ?
            dist :
            name === 'userPhoneNumber' ||
            name === 'domoPhone' ||
            name === 'userAdditionalPhoneNumber' ?
              formatPhoneNumber(value) : value,
    }));
    if (name === 'region') {
      setState((prevState) => ({
        ...prevState,
        city: {name: '', hydra_id: -1},
        region2: regions2List.filter((region2) => obj?.name.includes(region2.VALUE || 'not found'))[0]?.VALUE || 'not found',
      }));
      void getCities(obj?.hydra_id.toString() || '');
      const dists = getRegions2Districts(obj?.name || '');
      setDistricts2(dists);
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
    }
  };

  const toggleConfirmation = () => {
    if (confirmationReq === 'open') {
      setConfirmationReq('closed');
    } else if (confirmationReq === 'closed' || confirmationReq === '') {
      setConfirmationReq('open');
    }
  };

  const toggleConfirmationRes = () => {
    if (confirmationRes === 'open') {
      setConfirmationRes('closed');
      setTimeout(() => window.location.reload(), 160);
    } else if (confirmationRes === 'closed' || confirmationRes === '') {
      setConfirmationRes('open');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (
      file && (
        file.name.slice(-4) === '.jpg' ||
        file.name.slice(-4) === '.PNG' ||
        file.name.slice(-5) === '.JPEG' ||
        file.name.slice(-5) === '.jpeg' ||
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

  const formatPhoneNumber = (phoneNum: string) => {
    return phoneNum.replace(/\D/g, '');
  }

  const removeImage = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: null,
    }));
  };

  const getRegions = async () => {
    try {
      setRegionsLoading(true);
      const res = await axiosApi.get(
        '/region_list/');
      const regions = await res.data;
      setRegions(regions);
      setRegionsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getRegions2 = async () => {
    try {
      setRegions2Loading(true);
      const res = await axiosApi.get(`/bx/`);
      setRegions2(res.data);
      setRegions2Loading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getRegions2Districts = (name: string) => {
    setDistricts2Loading(true);
    let dists: IRegion[] = [];
    Object.keys(regions2).forEach((regionName) => {
      if (name.includes(regionName)) {
        dists = [...dists, ...regions2[regionName]]
      }
    });
    setDistricts2Loading(false);
    return dists;
  };

  const getCities = async (parent_id: string) => {
    try {
      setCitiesLoading(true);
      const res = await axiosApi.get(
        `/get_child/?parent_id=${parent_id}`);
      const cities = await res.data;
      setCities(cities);
      setCitiesLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getDistricts = async (parent_id: string) => {
    try {
      setDistrictsLoading(true);
      const res = await axiosApi.get(
        `/get_child/?parent_id=${parent_id}`);
      const cities = await res.data;
      setDistricts(cities);
      setDistrictsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getStreets = async (parent_id: string) => {
    try {
      setStreetsLoading(true);
      const res = await axiosApi.get(
        `/get_child/?parent_id=${parent_id}`);
      const cities = await res.data;
      setStreets(cities);
      setStreetsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getOrderStatusData = async () => {
    try {
      setRegions2Loading(true);
      const res = await axiosApi.get(
        `/send-data-router/`);
      const orderStatuses = await res.data[3];
      setOrderStatuses(orderStatuses.splice(0, 2));

      const superTvs = await res.data[5];
      setSuperTvs(superTvs);

      const routerInstallations = await res.data[2];
      setRouterInstallations(routerInstallations.filter((item: IRegion) => item.VALUE !== 'Да выкуп'));

      const tariffs = await res.data[1].map((item: IRegion) => {
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

      const providersFrom = await res.data[4].map((item: IRegion) => {
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
      setRegions2List(res.data[0]);
      setRegions2Loading(false);
    } catch (e) {
      console.log(e);
      setRegions2Loading(false);
    }
  };

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
      state.orderStatus?.VALUE &&
      state.routerInstallationType?.VALUE &&
      state.tariff?.VALUE &&
      state.superTv?.VALUE
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
      state.providerFrom?.VALUE &&
      state.username &&
      state.userSirName &&
      state.userPhoneNumber &&
      state.userAdditionalPhoneNumber &&
      (state.userPhoneNumber !== state.userAdditionalPhoneNumber)
    );
  };

  console.log(state);

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
          {currentForm === 2 ? 'Статус заявки' : ''}
          {currentForm === 3 ? 'Загрузка фото' : ''}
          {currentForm === 4 ? 'Описание' : ''}
          {currentForm === 5 ? 'О абоненте' : ''}
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon/>}
          disabled={
            (currentForm === 1 && !locationFilled()) ||
            (currentForm === 2 && !orderStatus()) ||
            (currentForm === 3 && !assets()) ||
            currentForm === 5
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
          districts2={districts2}
          streets={streets}
          region={state.region}
          region2={state.region2}
          city={state.city}
          district={state.district}
          district2={state.district2}
          street={state.street}
          address={state.address}
          handleChange={handleChange}
          regionsLoading={regionsLoading}
          regions2Loading={regions2Loading}
          citiesLoading={citiesLoading}
          districtsLoading={districtsLoading}
          districts2Loading={districts2Loading}
          streetsLoading={streetsLoading}
        />}
        {currentForm === 2 && <OrderStatus
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
        {currentForm === 3 &&
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
          currentForm === 4 &&
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
          currentForm === 5 &&
          <AboutUser
            providerFrom={state.providerFrom}
            providersFrom={providersFrom}
            username={state.username}
            userSirName={state.userSirName}
            userPhoneNumber={state.userPhoneNumber}
            domoPhone={state.domoPhone}
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
        toggleResModal={toggleConfirmationRes}
        regions2={regions2List}
      />
      <ConfirmResFormModal
        toggleResModal={toggleConfirmationRes}
        state={confirmationRes}
      />
    </div>
  );
}

export default NewApplication;
