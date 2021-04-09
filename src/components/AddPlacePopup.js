import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleChangeCardName(e) {
    setName(e.target.value)
  }

    function handleChangeCardLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
  e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
}

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="elements" title="Новое место" buttonText="Сохранить">
      <input
        value={name}
        onChange={handleChangeCardName}
        id="card-name-input"
        type="text"
        className="popup__input popup__text popup__card-name"
        name="name" placeholder="Название"
        required minLength={1}
        maxLength={30} />
        <span id="card-name-input-error" className="popup__input-error" />
      <input
        value={link}
        onChange={handleChangeCardLink}
        id="card-src-input"
        type="url"
        className="popup__input popup__text popup__card-src"
        name="link"
        placeholder="Ссылка на фото/картинку"
        required />
      <span id="card-src-input-error" className="popup__input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;