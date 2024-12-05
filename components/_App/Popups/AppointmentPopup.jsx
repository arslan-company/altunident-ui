import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { GlobalContext } from '../../../context';
import Popup from '../../Popup';

function AppointmentPopup() {
  const { t } = useTranslation('common');
  const { appointmentPopup, closeAppointmentPopup } = useContext(GlobalContext);

  /**
   * @param {boolean} isShow
  */
  const handlePopup = (isShow) => {
    if (!isShow) {
      closeAppointmentPopup();
    }
  };

  return (
    <Popup
      mode="manuel"
      isOpen={appointmentPopup.DISPLAY}
      title={t('appointment_popup.title')}
      controller={(isShow) => handlePopup(isShow)}
    >
      <div className="appointment-popup">
        {appointmentPopup.CURRENT_DATA ? appointmentPopup.CURRENT_DATA.map((item) => (
          <div className="item" key={item.id}>
            <a href={item.href} target="_blank" rel="noreferrer" className="item-link">
              {item.hospitalName}
            </a>
          </div>
        )) : appointmentPopup.DEFAULT_DATA.map((item) => (
          <div className="item" key={item.id}>
            <a href={item.href} target="_blank" rel="noreferrer" className="item-link">
              {item.hospitalName}
            </a>
          </div>
        ))}
      </div>
    </Popup>
  );
}

export default AppointmentPopup;
