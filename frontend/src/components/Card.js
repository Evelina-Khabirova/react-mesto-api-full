import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'cards__trash' : ''}`
  ); 

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `cards__like-button ${isLiked ? 'cards__like-button-active' : ''}`
  ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <li className="cards__item">
      <img  
        src={card.link} 
        alt={card.name} 
        className="cards__image" 
        onClick={handleClick}
      />
      <button 
        type="button" 
        className={cardDeleteButtonClassName} 
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__info">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-box">
          <button 
            type="button" 
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="cards__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;