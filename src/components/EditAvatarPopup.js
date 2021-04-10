import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {
  
  const avatarRef = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
}

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="avatar" title="Обновить аватар" buttonText="Сохранить">
      <input
        ref={avatarRef}
        id="avatar-src-input"
        type="url"
        className="popup__input popup__text popup__avatar-src"
        name="link"
        placeholder="Ссылка на Ваш новый аватар"
        required />
      <span id="avatar-src-input-error" className="popup__input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;