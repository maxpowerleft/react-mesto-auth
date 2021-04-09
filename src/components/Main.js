import React from 'react';
import editImage from '../images/edit-image.svg';
import addImage from '../images/add-image.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const onEditAvatar = () => {
    props.onEditAvatar(props.onClick);
  }
  
  const onEditProfile = () => {
    props.onEditProfile(props.onClick);
  }
  
  const onAddPlace = () => {
    props.onAddPlace(props.onClick);
  }
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button onClick={onEditAvatar} className="profile__edit-button-avatar">
            <img src={currentUser.avatar} alt="Здесь находится ваш аватар" className="profile__avatar" />
          </button>
        </div>
        <div className="profile__user-info">
          <p className="profile__user-name">{currentUser.name}</p>
          <button onClick={onEditProfile} className="profile__edit-button">
            <img src={editImage} alt="Кнопка изменения профиля" className="profile__edit-image" />
          </button>
          <p className="profile__user-description">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} className="profile__add-button">
          <img src={addImage} alt="Кнопка добавления новых записей" className="profile__add-image" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick} />
        )
        )}
      </section>
    </main>
    
  )
}


export default Main;