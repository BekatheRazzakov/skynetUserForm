import React, {useEffect, useState} from 'react';
import {CircularProgress, Paper, Typography} from "@mui/material";
import ApplicationPopup from "../../components/applicationPopup/ApplicationPopup";
import axiosApi from "../../axiosApi";
import {useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import './zhalobaList.css';

export interface IAppSate {
  id: number,
  region: string,
  district: string,
  street: string,
  zhaloba_reason: string,
  name: string,
  surname: string,
  personal_account: string,
  phone_number: string,
  agent: number,
}

const ZhalobaList = () => {
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const [applications, setApplications] = useState<IAppSate[]>([]);
  const [application, setApplication] = useState<IAppSate | null>(null);
  const [applicationPopup, setApplicationPopup] = useState('');
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const getApps = async () => {
    try {
      setApplicationsLoading(true);
      const zhalobalist = await axiosApi('zhalobalist/');
      setApplications(zhalobalist.data);
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
        <Typography variant="body1" className="application-popup-title">Информация о жалобе</Typography>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Имя абонента: </span>
          <span className="application-item-key-value">{application?.name || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Фамилия абонента: </span>
          <span className="application-item-key-value">{application?.surname || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Регион: </span>
          <span className="application-item-key-value">{application?.region || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Район: </span>
          <span className="application-item-key-value">{application?.district || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Номер телефона: </span>
          <span className="application-item-key-value">{application?.phone_number || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Лицевой счёт: </span>
          <span className="application-item-key-value">{application?.personal_account || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Причина жалобы: </span>
          <span className="application-item-key-value">{application?.zhaloba_reason || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Агент: </span>
          <span className="application-item-key-value">{application?.agent || '-'}</span>
        </Paper>
      </ApplicationPopup>
      {
        applicationsLoading ?
          <div className="applications-loading">
            <CircularProgress/>
          </div> :
          !applications.length ?
            <Typography variant="h5" className="no-applications">Нет жалоб</Typography> :
            <div className="application-items">{
              applications.map((app, i) => (
                <Paper className="application-item" key={i} onClick={() => {
                  setApplication(app);
                  toggleAppPopup('opened');
                }}>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Регион: </span>
                    <span className="application-item-key-value">{app.region || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Район: </span>
                    <span className="application-item-key-value">{app.district || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Номер телефона: </span>
                    <span className="application-item-key-value">{app.phone_number || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Лицевой счёт: </span>
                    <span className="application-item-key-value">{app.personal_account || '-'}</span>
                  </div>
                </Paper>
              ))
            }</div>
      }
    </Paper>
  );
};

export default ZhalobaList;