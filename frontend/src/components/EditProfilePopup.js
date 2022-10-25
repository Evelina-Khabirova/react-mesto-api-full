import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}){
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = useState({fullname: '', about_me: ''});
  

  React.useEffect(() => {
    if(currentUser) {
      setValues({
        fullname: currentUser.name, 
        about_me: currentUser.about
      });
    }
  }, [currentUser, isOpen]);
  


  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.fullname,
      about: values.about_me,
    });
  }

  return(
    <PopupWithForm 
      open={`${isOpen ? 'popup__active' : ''}`}
      close={onClose}
      title="Редактировать профиль"
      name="profile"
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <div>
        <input 
          required
          minLength="2"
          maxLength="40"
          name="fullname" 
          type="text" 
          id="name-input"
          placeholder="ФИО" 
          className="popup__input popup__input_type_fullname"
          value={values.fullname || ''}
          onChange={handleChange}
        />
        <span className="popup__error" id="name-input-error">Нет текста</span>
      </div>
      <div>
        <input 
          required
          minLength="2"
          maxLength="200"
          name="about_me" 
          type="text" 
          id="about-me-input"
          placeholder="О себе" 
          className="popup__input popup__input_type_about-me"
          value={values.about_me || ''}
          onChange={handleChange}
        />
        <span className="popup__error" id="about-me-input-error">Нет текста</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;