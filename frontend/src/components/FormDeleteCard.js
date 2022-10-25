function FormDeleteCard() {
  return(
    <div className="popup popup_delete-card">
      <div className="popup__content popup__content_delete-card">
        <button className="popup__close popup__close_delete-card" type="button"></button>
        <h3 className="popup__title">Вы уверены?</h3>
        <form
          novalidate
          className="popup__form popup__form_delete-card" 
          name="deleteCard">
          <button 
              className="popup__button popup__button_delete-card" 
              type="submit"
              name="delete_card"
            >Да</button>
      </form>
    </div>
  </div>
  );
}

export default FormDeleteCard;