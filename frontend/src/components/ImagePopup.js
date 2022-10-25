import React from 'react';

function ImagePopup({
  open,
  card,
  close
}) {

  function handleOverlayPopupClick(evt) {
    return evt.target.classList.contains('popup__active') && close(null);
  }

  return(
    <div 
      className={`popup popup_fullimage ${open}`}
      onClick={handleOverlayPopupClick}
    >
    <div className="popup__content popup__content_fullimage">
      <button 
        className="popup__close popup__close_fullimage" 
        type="button"
        onClick={close}
      ></button>
      <img 
        src={!card ? '' : card.link} 
        alt={!card ? '' : card.name} 
        className="popup__image" 
      />
      <p className="popup__text">{!card ? '' : card.name} </p>
    </div>
  </div>
  );
}

export default ImagePopup;