import React, {FormEvent, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {IInt} from "../../containers/newApplication/NewApplication";
import {LoadingButton} from "@mui/lab";
import axiosApi from "../../axiosApi";
import {useAppDispatch} from "../../app/hooks";
import {setZayavkaRes} from "../../features/usersSlice";
import './confirmFormModal.css';
import {useNavigate} from "react-router-dom";

interface IAssets {
  file1: File | null;
  file2: File | null;
  file3: File | null;
}

interface ITelegraphData {
  data: { image_path: string }[]
}

interface IProps {
  toggleModal: () => void;
  toggleResModal: () => void;
  state: string;
  regions2: IInt[];
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
    discount: { VALUE: string; ID: number; } | null;
    discount_ls: string;
    passport: File;
    passport2: File;
    locationScreenShot: File;
    description: string;
    providerFrom: { VALUE: string; ID: number; } | null;
    username: string;
    userSirName: string;
    userPhoneNumber: string;
    userAdditionalPhoneNumber: string;
  } | null
}

const ConfirmResModal: React.FC<IProps> = ({data, toggleModal, toggleResModal, state, regions2}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sendDataLoading, setSendDataLoading] = useState(false);
  
  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      let telegraphAssets = {
        passport1: '',
        passport2: '',
        locationScreenShot: '',
      }
      
      const sendAssets = async () => {
        try {
          const assets: IAssets = {
            file1: data?.passport || null,
            file2: data?.passport2 || null,
            file3: data?.locationScreenShot || null,
          };
          const formData = new FormData();
          const keys = Object.keys(assets) as (keyof IAssets)[];
          
          keys.forEach((key) => {
            const value = assets[key];
            
            if (value !== undefined && value !== null) {
              // @ts-ignore
              formData.append(key, value);
            }
          });
          
          const res = await axiosApi.post("/upload-passport/", formData);
          telegraphAssets = {
            passport1: (res.data as ITelegraphData).data[0].image_path,
            passport2: (res.data as ITelegraphData).data[1].image_path,
            locationScreenShot: (res.data as ITelegraphData).data[2].image_path,
          };
        } catch (e) {
          console.log(e);
        }
      };
      
      setSendDataLoading(true);
      await sendAssets();
      
      let body = {...data};
      delete body.region;
      delete body.city;
      delete body.district;
      if (body.street) {
        delete body.street;
      }
      delete body.address;
      delete body.passport;
      delete body.passport2;
      delete body.locationScreenShot;
      body = {
        ...body,
        // @ts-ignore
        address: {
          region: data?.region,
          city: data?.city,
          district: data?.district,
        },
        exactAddress: {
          address: data?.address,
        },
        // @ts-ignore
        region2: regions2.filter(region => region.VALUE === body.region2)[0],
        userPhoneNumber: `996${data?.userPhoneNumber}`,
        userAdditionalPhoneNumber: `996${data?.userAdditionalPhoneNumber}`,
        assets: telegraphAssets,
      };
      if (data?.street?.name) {
        // @ts-ignore
        body.address.street = data.street;
      }
      if (telegraphAssets.locationScreenShot && telegraphAssets.passport1 && telegraphAssets.passport2) {
        const res = await axiosApi.post("/z/", body);
        dispatch(setZayavkaRes(res.data));
        toggleModal();
        toggleResModal();
        navigate('');
      }
      setSendDataLoading(false);
    } catch (e) {
      setSendDataLoading(false);
      console.log(e);
    }
  };
  
  return (
    <div className={`confirm-modal-${state}`}>
      <Box
        className='confirm-modal-inner'
        component='form'
        onSubmit={onSubmit}
      >
        <Typography variant='h6'>Подтвердите данные</Typography>
        <div className='data-list'>
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
            <span>Акция:</span>
            <span>{data?.discount?.VALUE || '-'}</span>
          </div>
          {
            data?.discount_ls &&
            <div className='data-line'>
              <span>Акция:</span>
              <span>{data?.discount_ls || '-'}</span>
            </div>
          }
          <div className='data-line'>
            <span>Лицевая сторона паспорта:</span>
            {
              data?.passport ?
                <img
                  src={data?.passport ? URL.createObjectURL(data.passport) : ''}
                  alt='passport'
                  loading='lazy'
                />
                : '-'
            }
          </div>
          <div className='data-line'>
            <span>Обратная сторона паспорта:</span>
            {
              data?.passport2 ?
                <img
                  src={data?.passport2 ? URL.createObjectURL(data.passport2) : ''}
                  alt='passport'
                  loading='lazy'
                />
                : '-'
            }
          </div>
          <div className='data-line'>
            <span>Скриншот локации:</span>
            {
              data?.locationScreenShot ?
                <img
                  src={data?.locationScreenShot ? URL.createObjectURL(data.locationScreenShot) : ''}
                  alt='passport'
                  loading='lazy'
                />
                : '-'
            }
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
        <div className='confirm-form-buttons'>
          <Button
            variant='outlined'
            onClick={toggleModal}
            disabled={sendDataLoading}
          >Изменить данные</Button>
          <LoadingButton
            loading={sendDataLoading}
            disabled={sendDataLoading}
            variant='contained'
            type='submit'
          >
            <span>Подтвердить</span>
          </LoadingButton>
        </div>
      </Box>
    </div>
  );
};

export default ConfirmResModal;