import React from 'react';
import './confirmFormModal.css';
import {Box, Button, Typography} from "@mui/material";

interface IProps {
  toggleModal: () => void;
  data: {
    region: { name: string; hydra_id: number; } | null;
    region2: string;
    city: { name: string; hydra_id: number; } | null;
    district: { name: string; hydra_id: number; } | null;
    district2: { VALUE: string; ID: number; } | null;
    street: { name: string; hydra_id: number; } | null;
    address: string;
    orderStatus: { VALUE: string; ID: number; } | null;
    routerInstallationType: { VALUE: string; ID: number; } | null;
    tariff: { VALUE: string; ID: number; } | null;
    superTv: { VALUE: string; ID: number; } | null;
    passport: File[];
    locationScreenShot: File[];
    description: string;
    providerFrom: { VALUE: string; ID: number; } | null;
    username: string;
    userSirName: string;
    userPhoneNumber: string;
    userAdditionalPhoneNumber: string;
  } | null
}

const ConfirmFormModal: React.FC<IProps> = ({data, toggleModal}) => {
  return (
    <div className='confirm-modal'>
      <Box className='confirm-modal-inner' component="form">
        <Typography variant="h6">Подтвердите данные</Typography>
        <div className="data-list">
          <div className='data-line'>
            <span>Регион:</span>
            <span>{data?.region?.name || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Город:</span>
            <span>{data?.city?.name || '-'}</span>
          </div>
          <div className='data-line'>
            <span>{data?.street?.name ? 'Район' : 'Улица'}:</span>
            <span>{data?.district?.name || '-'}</span>
          </div>
          {
            data?.street?.name &&
            <div className='data-line'>
              <span>Улица:</span>
              <span>{data?.street?.name || '-'}</span>
            </div>
          }
          <div className='data-line'>
            <span>Точный адрес:</span>
            <span>{data?.address || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Регион локации:</span>
            <span>{data?.region2 || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Район локации:</span>
            <span>{data?.district2?.VALUE || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Статус заявки:</span>
            <span>{data?.orderStatus?.VALUE || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Установка роутера:</span>
            <span>{data?.routerInstallationType?.VALUE || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Тариф:</span>
            <span>{data?.tariff?.VALUE || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Установка SuperTV:</span>
            <span>{data?.superTv?.VALUE || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Описание:</span>
            <span>{data?.description || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Переход с какого провайдера:</span>
            <span>{data?.providerFrom?.VALUE || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Ваше имя:</span>
            <span>{data?.username || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Ваша фамилия:</span>
            <span>{data?.userSirName || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Ваша номер телефона:</span>
            <span>{data?.userPhoneNumber || '-'}</span>
          </div>
          <div className='data-line'>
            <span>Ваша доп. номер телефона:</span>
            <span>{data?.userAdditionalPhoneNumber || '-'}</span>
          </div>
        </div>
        <div className="confirm-form-buttons">
          <Button variant="outlined" onClick={toggleModal}>Изменить данные</Button>
          <Button variant="contained" type="submit">Подтвердить</Button>
        </div>
      </Box>
    </div>
  );
};

export default ConfirmFormModal;