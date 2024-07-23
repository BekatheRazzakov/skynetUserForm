import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
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

export interface IInt {
  ID: string;
  VALUE: string;
}

export interface IRegions {
  [region: string]: IInt[]
}

const NewApplication = () => {
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const [regions, setRegions] = useState([]);
  const [regions2, setRegions2] = useState<IRegions>({});
  const [regions2List, setRegions2List] = useState<IInt[]>([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districts2, setDistricts2] = useState<IInt[]>([]);
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
    entrance: "",
    floor: "",
    apart: "",
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
  const [locationType, setLocationType] = useState('flat');
  
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
              formatPhoneNumber(value) :
              name === 'domoPhone' ? formatPhoneNumber(value) : value,
    }));
    if (name === 'region') {
      if (regions2List.length) {
        const region2Name = regions2List.filter((region2) => obj?.name.toLowerCase().includes(region2.VALUE.toLowerCase()))[0]?.VALUE;
        setState((prevState) => ({
          ...prevState,
          region: obj,
          city: {name: '', hydra_id: -1},
          region2: region2Name || 'not found',
        }));
        void getCities(obj?.hydra_id.toString() || '');
        const dists = getRegions2Districts(region2Name || '');
        setDistricts2(dists);
      }
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
        district2: getDist2(obj?.name || '') || {VALUE: "", ID: "",},
      }));
      void getStreets(obj?.hydra_id.toString() || '');
    } else if (name === 'street') {
      setState((prevState) => ({
        ...prevState,
        address: "",
      }));
    }
  };
  
  const onLocationTypeChange = (_: SyntheticEvent, value: string) => {
    setLocationType(value || 'flat');
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
    setState((prevState) => ({
      ...prevState,
      [fieldName]: file,
    }));
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
    let dists: IInt[] = [];
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
      setRouterInstallations(routerInstallations.filter((item: IInt) => item.VALUE !== 'Да выкуп'));
      
      const tariffs = await res.data[1].map((item: IInt) => {
        if (
          item.VALUE === 'Оптимальный (600)' ||
          item.VALUE === 'Sky70 (890)' ||
          item.VALUE === 'Промо (790)' ||
          item.VALUE === 'Промо60 (890)' ||
          item.VALUE === 'Промо70 (980)' ||
          item.VALUE === 'Промо80 (1190)' ||
          item.VALUE === 'Промо90 (1190)' ||
          item.VALUE === 'Промо100 (1280)' ||
          item.VALUE === 'Интер 70 (890)' ||
          item.VALUE === 'Интер 90 (1190)' ||
          item.VALUE === 'Интер 100 (1280)' ||
          item.VALUE === 'Интер 70 (980)' ||
          item.VALUE === 'Интер+ ТВ 70' ||
          item.VALUE === 'Интер+ ТВ 90' ||
          item.VALUE === 'Интер+ ТВ 100' ||
          item.VALUE === 'inter (200)'
        ) {
          return item;
        }
      });
      setTariffs(tariffs.filter((item: IInt) => item));
      
      const providersFrom = await res.data[4].map((item: IInt) => {
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
      setProvidersFrom(providersFrom.filter((item: IInt) => item));
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
      (((streets.length && state.street?.name && state.address) || (!streets.length && state.address)) ||
        !state.address && (state.entrance && state.floor && state.apart))
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
  
  const getDist2 = (dist2name: string) => {
    if (dist2name === 'с. Дружба') return districts2.filter((dist2) => dist2.VALUE === 'Дружба')[0];
    if (dist2name === 'г. Шопоков') return districts2.filter((dist2) => dist2.VALUE === 'Шопоков')[0];
    if (dist2name === 'с. Романовка') return districts2.filter((dist2) => dist2.VALUE === 'Романовка')[0];
    if (dist2name === 'с. Гавриловка') return districts2.filter((dist2) => dist2.VALUE === 'Гавриловка')[0];
    if (dist2name === 'г. Кара-Балта') return districts2.filter((dist2) => dist2.VALUE === 'Кара-Балта')[0];
    if (dist2name === 'с. Станция Ивановка') return districts2.filter((dist2) => dist2.VALUE === 'Ст.Ивановка')[0];
    if (dist2name === 'с. Кенбулун') return districts2.filter((dist2) => dist2.VALUE === 'Кенбулун')[0];
    if (dist2name === 'с. Сокулук') return districts2.filter((dist2) => dist2.VALUE === 'Сокулук')[0];
    if (dist2name === 'ж/м. Биримдик-Кут') return districts2.filter((dist2) => dist2.VALUE === 'Биримдик Кут')[0];
    if (dist2name === 'ж/м. Ак-Бата') return districts2.filter((dist2) => dist2.VALUE === 'Ак-бата')[0];
    if (dist2name === 'ж/м. Дордой') return districts2.filter((dist2) => dist2.VALUE === 'Дордой')[0];
    if (dist2name === 'ж/м. Келечек') return districts2.filter((dist2) => dist2.VALUE === 'Келечек')[0];
    if (dist2name === 'ж/м. Калыс-Ордо') return districts2.filter((dist2) => dist2.VALUE === 'Калыс-ордо')[0];
    if (dist2name === 'г. Кант') return districts2.filter((dist2) => dist2.VALUE === 'Кант')[0];
    if (dist2name === 'г. Каинды') return districts2.filter((dist2) => dist2.VALUE === 'Кайынды')[0];
    if (dist2name === 'с. Чалдовар') return districts2.filter((dist2) => dist2.VALUE === 'Чалдовар')[0];
    if (dist2name === 'с. Новопавловка') return districts2.filter((dist2) => dist2.VALUE === 'Новопавловка')[0];
    if (dist2name === 'ж/м. Карагачова Роща') return districts2.filter((dist2) => dist2.VALUE === 'Карагачевая роща')[0];
    if (dist2name === 'с. Маевка') return districts2.filter((dist2) => dist2.VALUE === 'Маевка')[0];
    if (dist2name === 'с. Таш-Булак') return districts2.filter((dist2) => dist2.VALUE === 'Таш-Булак')[0];
    if (dist2name === 'с. Юрьевка') return districts2.filter((dist2) => dist2.VALUE === 'Юрьевка')[0];
    if (dist2name === 'ж/м. Кок-Жар') return districts2.filter((dist2) => dist2.VALUE === 'Кок-жар-1 Чуй' || dist2.VALUE === 'Кок-жар-2 Чуй')[0];
    if (dist2name === 'с. Тельман') return districts2.filter((dist2) => dist2.VALUE === 'Тельман Чуй')[0];
    if (dist2name === 'с. Сын-Таш') return districts2.filter((dist2) => dist2.VALUE === 'Сынташ Чуй')[0];
    if (dist2name === 'с. Нурманбет') return districts2.filter((dist2) => dist2.VALUE === 'Нурманбет Чуй')[0];
    if (dist2name === 'ж/м. Алтын-Ордо') return districts2.filter((dist2) => dist2.VALUE === 'Алтын-ордо Чуй')[0];
    if (dist2name === 'с. Рот-Фронт') return districts2.filter((dist2) => dist2.VALUE === 'Рот-фронт Чуй')[0];
    if (dist2name === 'с. Асылбаш') return districts2.filter((dist2) => dist2.VALUE === 'Асылбаш Чуй')[0];
    if (dist2name === 'с. Жетиген') return districts2.filter((dist2) => dist2.VALUE === 'Жетиген Чуй')[0];
    if (dist2name === 'с. Алексеевка') return districts2.filter((dist2) => dist2.VALUE === 'Алексеевка Чуй')[0];
    if (dist2name === 'ж/м. Ак-Босого') return districts2.filter((dist2) => dist2.VALUE === 'Ак-босого Чуй' || dist2.VALUE === 'Ак-босого1 Чуй' || dist2.VALUE === 'Ак-босого2 Чуй' || dist2.VALUE === 'Ак-босого3 Чуй')[0];
    if (dist2name === 'с. Совхоз Ала-Тоо') return districts2.filter((dist2) => dist2.VALUE === 'Ала-тоо сары-жон Чуй')[0];
    if (dist2name === 'с. Джал') return districts2.filter((dist2) => dist2.VALUE === 'Село Джал Чуй')[0];
    if (dist2name === 'с. Ак-Жол') return districts2.filter((dist2) => dist2.VALUE === 'Ак-жол Чуй')[0];
    if (dist2name === 'с. Комсомольское') return districts2.filter((dist2) => dist2.VALUE === 'Комсомольское Чуй')[0];
    if (dist2name === 'с. Манас') return districts2.filter((dist2) => dist2.VALUE === 'Манас чуй')[0];
    if (dist2name === 'с. Беш-Кунгей') return districts2.filter((dist2) => dist2.VALUE === 'Беш-Кунгей Чуй')[0];
    if (dist2name === 'ж/м. Аламединский рынок') return districts2.filter((dist2) => dist2.VALUE === 'Аламединский рынок Бишкек')[0];
    if (dist2name === 'ж/м. Западный Автовокзал') return districts2.filter((dist2) => dist2.VALUE === 'Западный автовокзал Бишкек')[0];
    if (dist2name === 'ж/м. Токолдош') return districts2.filter((dist2) => dist2.VALUE === 'Токольдош Бишкек')[0];
    if (dist2name === 'с. Кой-таш') return districts2.filter((dist2) => dist2.VALUE === 'Кой-Таш Чуй')[0];
    if (dist2name === 'с. Интернациональное / Бозбармак') return districts2.filter((dist2) => dist2.VALUE === 'Интернациональное/Босбармак')[0];
    if (dist2name === 'ж/м. Кузнечная крепость') return districts2.filter((dist2) => dist2.VALUE === 'Кузнечная крепость Бишкек')[0];
    if (dist2name === 'с. Ивановка') return districts2.filter((dist2) => dist2.VALUE === 'Ивановка')[0];
    if (dist2name === 'ж/м. Пригородное') return districts2.filter((dist2) => dist2.VALUE === 'Пригородное Бишкек')[0];
    if (dist2name === 'ж/м. Ак-Ордо 1') return districts2.filter((dist2) => dist2.VALUE === 'Ак-ордо-1 Чуй')[0];
    if (dist2name === 'ж/м. Арча-Бешик') return districts2.filter((dist2) => dist2.VALUE === 'Арча-Бешик Чуй')[0];
    if (dist2name === 'ж/м. Телевышка') return districts2.filter((dist2) => dist2.VALUE === 'Телевышка Чуй')[0];
    if (dist2name === 'ж/м. Кызыл-Аскер') return districts2.filter((dist2) => dist2.VALUE === 'Кызыл-Аскер Бишкек')[0];
    if (dist2name === 'ж/м. Касым') return districts2.filter((dist2) => dist2.VALUE === 'ж/м Касым Чуй')[0];
    if (dist2name === 'с. Гидростроитель') return districts2.filter((dist2) => dist2.VALUE === 'Гидростроитель Чуй')[0];
    if (dist2name === 'мкр. Этажки ГКНБ') return districts2.filter((dist2) => dist2.VALUE === 'Этажки ГКНБ')[0];
    if (dist2name === 'ж/м. Бакай-Ата') return districts2.filter((dist2) => dist2.VALUE === 'Бакай-Ата Чуй')[0];
    if (dist2name === 'с. Аламедин') return districts2.filter((dist2) => dist2.VALUE === 'Аламедин Чуй')[0];
    if (dist2name === 'ж/м. Кудрука (город 3)') return districts2.filter((dist2) => dist2.VALUE === 'Кудрука Чуй')[0];
    if (dist2name === 'ж/м. Ак-Ордо 2') return districts2.filter((dist2) => dist2.VALUE === 'Ак-ордо-2 Чуй')[0];
    if (dist2name === 'с. Чолпон') return districts2.filter((dist2) => dist2.VALUE === 'Чолпон Чуй')[0];
    if (dist2name === 'ж/м. Мурас-Ордо (Озерное)') return districts2.filter((dist2) => dist2.VALUE === 'Озерное Чуй')[0];
    if (dist2name === 'ж/м. Ала-Тоо 3') return districts2.filter((dist2) => dist2.VALUE === 'Ала-тоо 3')[0];
    if (dist2name === 'ж/м. Ак-Ордо 3') return districts2.filter((dist2) => dist2.VALUE === 'Ак-ордо-3 Чуй')[0];
    if (dist2name === 'Мкр Тунгуч') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 12-й') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 11-й') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 6-й') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 4-й') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр Улан 1') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр Улан 2') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр Сейтек(Арашан)') return districts2.filter((dist2) => dist2.VALUE === 'Бишкек')[0];
    if (dist2name === 'Ат-Башы') return districts2.filter((dist2) => dist2.VALUE === 'Ат-Башы')[0];
    if (dist2name === 'Нарын') return districts2.filter((dist2) => dist2.VALUE === 'Нарын')[0];
    if (dist2name === 'Кочкор') return districts2.filter((dist2) => dist2.VALUE === 'Кочкор')[0];
    if (dist2name === 'Ача Кайынды') return districts2.filter((dist2) => dist2.VALUE === 'Добавить Ача Кайынды')[0];
    if (dist2name === 'Балыкчы') return districts2.filter((dist2) => dist2.VALUE === 'Балыкчы')[0];
    if (dist2name === 'Тамга') return districts2.filter((dist2) => dist2.VALUE === 'Тамга')[0];
    if (dist2name === 'Григорьевка') return districts2.filter((dist2) => dist2.VALUE === 'Григорьевка')[0];
    if (dist2name === 'Дархан') return districts2.filter((dist2) => dist2.VALUE === 'Дархан')[0];
    if (dist2name === 'Ананьево') return districts2.filter((dist2) => dist2.VALUE === 'Ананьево')[0];
    if (dist2name === 'Саруу') return districts2.filter((dist2) => dist2.VALUE === 'Саруу')[0];
    if (dist2name === 'Боконбаево') return districts2.filter((dist2) => dist2.VALUE === 'Боконбаево')[0];
    if (dist2name === 'Чолпон-Ата') return districts2.filter((dist2) => dist2.VALUE === 'Чолпон-Ата')[0];
    if (dist2name === 'Бостери') return districts2.filter((dist2) => dist2.VALUE === 'Бостери')[0];
    if (dist2name === 'Бактуу-Долонотуу') return districts2.filter((dist2) => dist2.VALUE === 'Бактуу-долонотуу')[0];
    if (dist2name === 'Кызыл-суу') return districts2.filter((dist2) => dist2.VALUE === 'Кызыл-Суу')[0];
    if (dist2name === 'Барскоон') return districts2.filter((dist2) => dist2.VALUE === 'Барскоон')[0];
    if (dist2name === 'Кара-Ой') return districts2.filter((dist2) => dist2.VALUE === 'Долинка')[0];
    if (dist2name === 'Жениш') return districts2.filter((dist2) => dist2.VALUE === 'Жениш')[0];
    if (dist2name === 'Жалгыз-Орук') return districts2.filter((dist2) => dist2.VALUE === 'Жалгыз-Орук')[0];
    if (dist2name === 'Бакай-Ата') return districts2.filter((dist2) => dist2.VALUE === 'Бакай-Ата Талас')[0];
    if (dist2name === 'Кок-Ой') return districts2.filter((dist2) => dist2.VALUE === 'Кок-Ой Талас')[0];
    if (dist2name === 'Кызыл-Адыр') return districts2.filter((dist2) => dist2.VALUE === 'Кызыл-Адыр Талас')[0];
    if (dist2name === 'Талас') return districts2.filter((dist2) => dist2.VALUE === 'Талас')[0];
    if (dist2name === 'Атая Огонбаева') return districts2.filter((dist2) => dist2.VALUE === 'Огонбаева')[0];
    if (dist2name === 'Калба') return districts2.filter((dist2) => dist2.VALUE === 'Калба')[0];
    if (dist2name === 'Араван') return districts2.filter((dist2) => dist2.VALUE === 'Араван')[0];
    if (dist2name === 'Медресе') return districts2.filter((dist2) => dist2.VALUE === 'Ош медресе')[0];
    if (dist2name === 'Он-Адыр') return districts2.filter((dist2) => dist2.VALUE === 'Ош Он-адыр')[0];
    if (dist2name === 'г. Карасуу') return districts2.filter((dist2) => dist2.VALUE === 'Карасуу')[0];
    if (dist2name === 'с. Жийделик') return districts2.filter((dist2) => dist2.VALUE === 'Жийделик')[0];
    if (dist2name === 'с. Кенжекул') return districts2.filter((dist2) => dist2.VALUE === 'Кенжекул')[0];
    if (dist2name === 'с.Кыргыз-Чек') return districts2.filter((dist2) => dist2.VALUE === 'Ош Кыргыз-чек')[0];
    if (dist2name === 'с.Нариман') return districts2.filter((dist2) => dist2.VALUE === 'Ош Нариман')[0];
    if (dist2name === 'с.Нурдар') return districts2.filter((dist2) => dist2.VALUE === 'Ош Нурдар')[0];
    if (dist2name === 'с.Шарк') return districts2.filter((dist2) => dist2.VALUE === 'Ош Шарк')[0];
    if (dist2name === 'с.Фуркат') return districts2.filter((dist2) => dist2.VALUE === 'Фуркат')[0];
    if (dist2name === 'Авиагородок') return districts2.filter((dist2) => dist2.VALUE === 'Ош Авиагородок')[0];
    if (dist2name === 'Ак-Тилек') return districts2.filter((dist2) => dist2.VALUE === 'Ак-Тилек')[0];
    if (dist2name === 'мкр Южный') return districts2.filter((dist2) => dist2.VALUE === 'Ош Южный')[0];
    if (dist2name === 'г. Ош') return districts2.filter((dist2) => dist2.VALUE === 'Ош')[0];
    if (dist2name === 'г. Базар-Коргон') return districts2.filter((dist2) => dist2.VALUE === 'Базар-Коргон')[0];
    if (dist2name === 'мкр Курманбек') return districts2.filter((dist2) => dist2.VALUE === 'ДА Курманбек')[0];
    if (dist2name === 'мкр СМУ') return districts2.filter((dist2) => dist2.VALUE === 'ДА Сму')[0];
    if (dist2name === 'мкр Сузак') return districts2.filter((dist2) => dist2.VALUE === 'ДА Сузак' || dist2.VALUE === 'г. Сузак')[0];
    if (dist2name === 'мкр Ынтымак') return districts2.filter((dist2) => dist2.VALUE === 'ДА Ынтымак')[0];
    if (dist2name === 'г. Кочкор-Ата') return districts2.filter((dist2) => dist2.VALUE === 'Кочкор-Ата')[0];
    if (dist2name === 'с. Благовещенка') return districts2.filter((dist2) => dist2.VALUE === 'Благовещенка')[0];
    if (dist2name === 'г. Токтогул') return districts2.filter((dist2) => dist2.VALUE === 'Токтогул')[0];
    if (dist2name === 'с. Лавдан-Кара') return districts2.filter((dist2) => dist2.VALUE === 'Лавдан-Кара ДЖ')[0];
    if (dist2name === 'с. Кызыл-туу') return districts2.filter((dist2) => dist2.VALUE === 'ДА Кызыл-туу')[0];
  };
  
  return (
    <div className='App'>
      <Box className='form-nav'>
        <Button
          variant='contained'
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
          variant='contained'
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
      <Box className='form' component='form' onSubmit={(e) => {
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
          entrance={state.entrance}
          floor={state.floor}
          apart={state.apart}
          locationType={locationType}
          onLocationTypeChange={onLocationTypeChange}
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
          <Container component='main'>
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
                label='Лицевая сторона паспорта'
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
                label='Обратная сторона паспорта'
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
                label='Скриншот локации'
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
            className='description-field'
            id='outlined-multiline-static'
            label='Описание'
            multiline
            rows={5}
            onChange={handleChange}
            value={state.description}
            name='description'
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
            type='submit' fullWidth variant='contained' sx={{mt: 3, mb: 2}}
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
