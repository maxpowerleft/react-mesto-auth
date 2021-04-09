import React from 'react';
import trashCan from '../images/trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete-button ${isOwn ? 'element__delete-button' : 'element__delete-button_hidden'}`);
  
  const isLiked = props.card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);
    
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="element">     
        <img onClick={handleClick} src={props.card.link} alt="Фотография Вашего поста" className="element__image" />
        <button onClick={handleDeleteClick} className={cardDeleteButtonClassName}>
          <img src={trashCan} alt="Кнопка удаления карточки" className="element__delete-image" />
        </button>
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__container">
        <button onClick={handleLikeClick} className={cardLikeButtonClassName} />
          <p className="element__likes-count">{props.card.likes.length}</p>
        </div>
    </article>
  )
}

export default Card;