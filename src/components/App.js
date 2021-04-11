import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as apiAuth from '../utils/apiAuth.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [tooltipStatus, setTooltipStatus] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
      if (jwt) {
        apiAuth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true)
          setUserEmail(res.data.email)
          history.push('/');
        })
        .catch(err => {
        console.error(err)
      });
      }
  }, [history])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, []);

  const handleLogin = ({ email, password }) => {
    return apiAuth.authorise(email, password)
      .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
        if (data.token) {
          setUserEmail(email)
          setLoggedIn(true)
          localStorage.setItem('jwt', data.token)
          history.push('/')
          return;
        }
      })
    .catch((err) => {
          console.error(err)
          setTooltipStatus('fail')
        });
  }

    const handleRegister = ({ email, password }) => {
      return apiAuth.register(email, password)
        .then((res) => {
          if (res.data._id) {
            setTooltipStatus('success');
            setIsInfoToolTipOpen(true);
            history.push('/sign-in');
          }
        })
        .catch((err) => {
          console.error(err);
          setTooltipStatus('fail');
          setIsInfoToolTipOpen(true);
        });
  }

  const handleLogout = () => {
    setLoggedIn(true);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.error(err)
      });
  }
  
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((err) => {      
        console.error(err);
      })
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleUpdateUser = (data) => {
    api.patchUserData(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateAvatar = (data) => {
    api.patchUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch((err) => {
        console.error(err);
      })
  }
  
  const handleAddPlaceSubmit = (newCard) => {
    api.postCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
    .catch(err => {
        console.error(err)
      })
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ link: '', name: '' });
    setTooltipStatus('');
    setIsInfoToolTipOpen(false);
  }

  React.useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header userEmail={userEmail} handleLogout={handleLogout} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onCardClick={handleCardClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards} />

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip authStatus={tooltipStatus} onClose={closeAllPopups} isOpen={isInfoToolTipOpen} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
