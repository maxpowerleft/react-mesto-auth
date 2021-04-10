import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
}, [currentUser]); 

  function handleSubmit(e) {
  e.preventDefault();
  props.onUpdateUser({
    name,
    about: description,
  });
}
  
  function handleChangeUserName(e) {
    setName(e.target.value)
  }

  function handleChangeUserDescription(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="profile" title="Редактировать профиль" buttonText="Сохранить">
      <input value={name || ''} onChange={handleChangeUserName} id="user-name-input" type="text" className="popup__input popup__text popup__user-name" name="name" placeholder="Имя" required minLength={2} maxLength={40} />
      <span id="user-name-input-error" className="popup__input-error" />
      <input value={description || ''} onChange={handleChangeUserDescription} id="user-description-input" type="text" className="popup__input popup__text popup__user-description" name="about" placeholder="Описание" required minLength={2} maxLength={200} />
      <span id="user-description-input-error" className="popup__input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup