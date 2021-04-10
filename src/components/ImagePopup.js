import React from 'react';
import closeImage from '../images/popup__close.svg';

function ImagePopup(props) {

  return (
    <section className={`popup popup_type_fullscreen ${props.card.link && "popup_opened"}`}>
      <div className="popup__fullscreen-container">
        <img
          onClick={props.onClose}
          src={closeImage}
          alt="Кнопка закрытия модального окна"
          className="popup__close popup__close_element popup__close_fullscreen" />
        <img src={props.card.link} alt={props.card.name} className="popup__fullscreen-image" />
        <p className="popup__fullscreen-text">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup;