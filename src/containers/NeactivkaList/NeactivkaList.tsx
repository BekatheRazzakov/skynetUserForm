import React, {useEffect, useState} from 'react';
import {CircularProgress, Paper, Typography} from "@mui/material";
import ApplicationPopup from "../../components/applicationPopup/ApplicationPopup";
import axiosApi from "../../axiosApi";
import {useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import './neactivkaList.css';

export interface IAppSate {
  id: number,
  first_name: string,
  last_name: string,
  abon_ls: string,
  sales: string,
  demount_stuff: string,
  reason: string,
  tariff: string,
  payment_status: string,
  status: string,
  primary_phone: string,
  dummy_field: null,
  agent: null,
}

const NeactivkaList = () => {
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.userState.user);
  const [applications, setApplications] = useState<IAppSate[]>([]);
  const [application, setApplication] = useState<IAppSate | null>(null);
  const [applicationPopup, setApplicationPopup] = useState('');
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const getApps = async () => {
    try {
      setApplicationsLoading(true);
      const zhalobalist = await axiosApi('zayavkaneaktivka/');
      setApplications(zhalobalist.data);
      setApplicationsLoading(false);
    } catch (e) {
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
        <Typography variant="body1" className="application-popup-title">Информация о неактивке</Typography>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Имя абонента: </span>
          <span className="application-item-key-value">{application?.first_name || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Фамилия абонента: </span>
          <span className="application-item-key-value">{application?.last_name || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Причина жалобы: </span>
          <span className="application-item-key-value">{application?.reason || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Номер телефона: </span>
          <span className="application-item-key-value">{application?.primary_phone || '-'}</span>
        </Paper>
      </ApplicationPopup>
      {
        applicationsLoading ?
          <div className="applications-loading">
            <CircularProgress/>
          </div> :
          !applications.length ?
            <Typography variant="h5" className="no-applications">Нет неактивок</Typography> :
            <div className="application-items">{
              applications.map((app, i) => (
                <Paper className="application-item" key={i} onClick={() => {
                  setApplication(app);
                  toggleAppPopup('opened');
                }}>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Имя: </span>
                    <span className="application-item-key-value">{app.first_name || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Фамилия: </span>
                    <span className="application-item-key-value">{app.last_name || '-'}</span>
                  </div>
                  <div className="application-item-content">
                    <span className="application-item-key-name">Номер телефона: </span>
                    <span className="application-item-key-value">{app.primary_phone || '-'}</span>
                  </div>
                </Paper>
              ))
            }</div>
      }
    </Paper>
  );
};

export default NeactivkaList;