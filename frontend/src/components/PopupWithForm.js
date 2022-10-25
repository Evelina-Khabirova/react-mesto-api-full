import React from 'react';

function PopupWithForm({
  open,
  close,
  title,
  name,
  button,
  onSubmit,
  children
}) {

  function handleOverlayPopupClick(evt) {
    return evt.target.classList.contains('popup__active') && close(false);
  }

  return(
    <div 
      className={`popup popup__${name} ${open}`}
      onClick={handleOverlayPopupClick}
    >
      <div className="popup__content">
        <button 
          className={`popup__close popup__close_${name}`} 
          type="button"
          onClick={close}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form 
          onSubmit={onSubmit}
          className={`popup__form popup__form_${name}`} 
          name={name}
        >{children}
          <button 
            className="popup__button" 
            type="submit"
            name ={`save_${name}`}
          >{button}</button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;