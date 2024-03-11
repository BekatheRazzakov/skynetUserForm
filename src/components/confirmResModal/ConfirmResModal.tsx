import React from 'react';
import {Box} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useAppSelector} from "../../app/hooks";
import './confirmResModal.css';

interface IProps {
  toggleResModal: () => void;
  state: string;
}

const ConfirmResFormModal: React.FC<IProps> = ({toggleResModal, state}) => {
  const zayavkaRes = useAppSelector((state) => state.userState.zayavkaRes);

  return (
    <div className={`confirm-res-modal-${state}`}>
      <Box className='confirm-modal-inner' component='div' style={{ marginBottom: 100 }}>
        <div className="data-list">
          <div className='data-line'>
            <span>Лицевой счёт домофона</span>
            <span>{zayavkaRes?.hydra_ls}</span>
          </div>
          <div className='data-line'>
            <span>Договор</span>
            <span>{zayavkaRes?.dogovor}</span>
          </div>
        </div>
        <LoadingButton
          // loading={sendDataLoading}
          // disabled={sendDataLoading}
          variant="contained"
          style={{ marginTop: 20 }}
          onClick={toggleResModal}
        >
          <span>Закрыть</span>
        </LoadingButton>
      </Box>
    </div>
  );
};

export default ConfirmResFormModal;