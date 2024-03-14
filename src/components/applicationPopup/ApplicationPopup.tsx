import React from 'react';
import './applicationPopup.css';
import {Paper, Typography} from "@mui/material";
import {IAppSate} from "../../containers/myApplications/MyApplications";

interface IProps {
  togglePopup: (value: string) => void;
  popup: string;
  data: IAppSate | null;
}

const ApplicationPopup: React.FC<IProps> = ({togglePopup, popup, data}) => {
  return (
    <div className={`application-popup-${popup}`} onClick={() => togglePopup('closed')}>
      <div className="application-popup-inner" onClick={(e) => e.stopPropagation()}>
        <Typography variant="body1" className="application-popup-title">Информация о заявке</Typography>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">hydra abbon ls: </span>
          <span className="application-item-key-value">{data?.hydra_abbon_ls || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Гидра договор: </span>
          <span className="application-item-key-value">{data?.hydra_dogovor || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Адрес: </span>
          <span className="application-item-key-value">{data?.hydra_address || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">Статус: </span>
          <span className="application-item-key-value">{data?.status || '-'}</span>
        </Paper>
        <Paper elevation={1} className="application-item-content">
          <span className="application-item-key-name">ID: </span>
          <span className="application-item-key-value">{data?.id || '-'}</span>
        </Paper>
      </div>
    </div>
  );
};

export default ApplicationPopup;