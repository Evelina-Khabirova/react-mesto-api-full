import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  openEditAvatar,
  openEditProfile,
  openAddCard,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main>
    <section className="profile">
      <div className="profile__edit-image">
        <div 
          className="profile__avatar"
          onClick={openEditAvatar}
          style={ {backgroundImage: `url(${currentUser.avatar})`} }
        ></div>
      </div>
      <div className="profile__profile-info">
        <h1 
          className="profile__fullname">{currentUser.name}</h1>
        <button 
          type="button" 
          className="profile__edit-button"
          onClick={openEditProfile}
        ></button> 
        <p className="profile__about-me">{currentUser.about}</p>
      </div>
      <button 
        type="button" 
        className="profile__add-button"
        onClick={openAddCard}
      ></button>
    </section>
    <section className="elements">
      <ul className="cards">
        {cards.map((card) => {
          return(
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          );
        })}
      </ul>
    </section>
  </main>
  );
}

export default Main;
