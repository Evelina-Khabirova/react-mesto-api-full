import React from 'react';
import popupImgOk from '../images/Registr-Ok.svg';
import popupImgFalse from '../images/Registr-False.svg';

function InfoTooltip({
  open,
  close,
  statusRegister
}) {
  function handleOverlayPopupClick(evt) {
    return evt.target.classList.contains('popup__active') && close(false);
  }

  return(
    <div
      className={`popup ${open}`}
      onClick={handleOverlayPopupClick}
    >
      <div className='popup__content popup__register-status'>
      <button 
          className={`popup__close`} 
          type="button"
          onClick={close}
        ></button>
        <img src={statusRegister ? popupImgOk : popupImgFalse} className="popup__image-status" alt="Статус регистрации" />
        <p className='popup__text-status'>{statusRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;