import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}){
  const [values, setValues] = useState({name: '', link: ''});

  React.useEffect(() => {
    if(!isOpen) {
      setValues({
        name: '',
        link: ''
      })
    }
  }, [isOpen])

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return(
    <PopupWithForm 
      open={`${isOpen ? 'popup__active' : ''}`}
      close={onClose}
      title="Новое место"
      name="card"
      button="Создать"
      onSubmit={handleSubmit}
    >
      <div>
        <input 
          required
          minLength="2"
          maxLength="30"
          name="name" 
          type="text" 
          id="card-name-input"
          placeholder="Название" 
          className="popup__input popup__input_type_card-name"
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="popup__error" id="card-name-input-error">Нет текста</span>
      </div>
      <div>
        <input 
          required
          name="link" 
          type="url" 
          id="card-link-input"
          placeholder="Ссылка на картинку" 
          className="popup__input popup__input_type_card-link"
          value={values.link || ''}
          onChange={handleChange}
        />
        <span className="popup__error" id="card-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;