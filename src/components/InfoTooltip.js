import closeImage from '../images/popup__close.svg';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {

  const messageIcon = props.authStatus ? success : fail;
  const IconAlt = props.authStatus ? 'Успех!' : 'Упс! Ошибка!';
  const messageTest = props.authStatus ? 'Вы успешно зарегистрировались!' : 
                                        'Что-то пошло не так! Попробуйте еще раз.';

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
          <div className="popup__form popup__container-auth-state">
            <img onClick={props.onClose} src={closeImage} alt="Кнопка закрытия модального окна" className="popup__close" />
            <img src={messageIcon} alt={IconAlt} className="popup__status-img" />
            <h2 className="popup__title">{messageTest}</h2>
          </div>
    </div>
  )
}

export default InfoTooltip;