import React, {useEffect, useState} from 'react';
import {CircularProgress, Paper, Typography} from "@mui/material";
import ApplicationPopup from "../../components/applicationPopup/ApplicationPopup";
import axiosApi from "../../axiosApi";
import {useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import './myApplications.css';

export interface IAppSate {
  id: number,
  status: string,
  router_installation: string,
  tariff: string,
  super_tv_installation: string,
  description: string,
  hydra_dogovor: string,
  previous_provider: string,
  first_name: string,
  last_name: string,
  primary_phone: string,
  secondary_phone: string,
  intercom_account: string,
  address: string,
  hydra_address: string,
  hydra_abbon_ls: string,
  passport_front_image_url: string,
  passport_back_image_url: string,
  location_url: string,
  created_at: string,
  agent: number,
}

const MyApplications = () => {
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const [applications, setApplications] = useState<IAppSate[]>([]);
  const [application, setApplication] = useState<IAppSate | null>(null);
  const [applicationPopup, setApplicationPopup] = useState('');
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const getApps = async () => {
    try {
      setApplicationsLoading(true);
      const apps = await axiosApi('mazay/');
      setApplications(apps.data);
      setApplicationsLoading(false);
    }
     catch (e) {
       console.log(e);
       setApplicationsLoading(false);
     }
  };

  useEffect(() => {
    if (!userToken) {
      navigate('/sign-in');
    }
    void getApps();
  }, [navigate, userToken]);

  const toggleAppPopup = (value: string) => {
    setApplicationPopup(value);
    if (value === 'closed') setApplication(null);
  };

  return (
    <Paper className="my-applications-container" elevation={4}>
      <ApplicationPopup togglePopup={toggleAppPopup} popup={applicationPopup}>
        <Typography variant="body1" className="application-popup-title">Информация о заявке</Typography>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">hydra abbon ls: </span>
          <span className="application-item-key-value">{application?.hydra_abbon_ls || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Гидра договор: </span>
          <span className="application-item-key-value">{application?.hydra_dogovor || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Адрес: </span>
          <span className="application-item-key-value">{application?.hydra_address || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Статус: </span>
          <span className="application-item-key-value">{application?.status || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">ID: </span>
          <span className="application-item-key-value">{application?.id || '-'}</span>
        </Paper>
      </ApplicationPopup>
      {
        applicationsLoading ?
          <div className="applications-loading">
            <CircularProgress/>
          </div> :
          !applications.length ?
            <Typography variant="h5" className="no-applications">Нет заявок</Typography> :
            <div className="application-items">{
              applications.map((app, i) => (
                <Paper className="application-item" key={i} onClick={() => {
                  setApplication(app);
                  toggleAppPopup('opened');
                }}>
                  <div className="application-item-content">
                    <span className="application-item-key-name">hydra abbon ls: </span>
                    <span className="application-item-key-value">{app.hydra_abbon_ls || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Гидра договор: </span>
                    <span className="application-item-key-value">{app.hydra_dogovor || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Адрес: </span>
                    <span className="application-item-key-value">{app.hydra_address || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Статус: </span>
                    <span className="application-item-key-value">{app.status || '-'}</span>
                  </div>
                </Paper>
              ))
            }</div>
      }
    </Paper>
  );
};

export default MyApplications;