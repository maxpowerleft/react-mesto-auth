import closeImage from '../images/popup__close.svg';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      {props.authStatus === 'success'
        ? (
          <div className="popup__form popup__container-auth-state">
            <img onClick={props.onClose} src={closeImage} alt="Кнопка закрытия модального окна" className="popup__close" />
            <img src={success} alt="Успех!" className="popup__status-img" />
            <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
          </div>
        )
        : (
          <div className="popup__form popup__container-auth-state">
            <img onClick={props.onClose} src={closeImage} alt="Кнопка закрытия модального окна" className="popup__close" />
            <img src={fail} alt="Упс! Ошибка!" className="popup__status-img" />
            <h2 className="popup__title">Что-то пошло не так! Попробуйте еще раз.</h2>
          </div>
        )
      }
    </div>
  )
}

export default InfoTooltip;