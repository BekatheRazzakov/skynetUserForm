import React from 'react';
import './applicationPopup.css';

interface IProps {
  children: any;
  togglePopup: (value: string) => void;
  popup: string;
}

const ApplicationPopup: React.FC<IProps> = ({togglePopup, popup, children}) => {
  return (
    <div className={`application-popup-${popup}`} onClick={() => togglePopup('closed')}>
      <div className="application-popup-inner" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ApplicationPopup;