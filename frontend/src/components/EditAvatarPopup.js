import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}){
  const avatar = React.useRef();

  React.useEffect(() => {
    if(!isOpen) {
      avatar.current.value = '';
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  return(
    <PopupWithForm 
      open={`${isOpen ? 'popup__active' : ''}`}
      close={onClose}
      title="Обновить аватар"
      name="avatar"
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <input 
        required
        name="linkAvatar" 
        type="url" 
        id="profile-avatar-input"
        placeholder="Ссылка на картинку" 
        className="popup__input popup__input_type_profile-avatar-link"
        ref={avatar}
      />
      <span className="popup__error" id="profile-avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;