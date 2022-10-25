import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Api from '../utils/Api.js';
import ApiAuthorization from '../utils/ApiAuthorization';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js';
//import ProtectedRoute from './ProtectedRoute.js';
//import InfoTooltip from './InfoTooltip.js'

function App() {

  const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43');
  const apiAuth = new ApiAuthorization('https://auth.nomoreparties.co/');
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState(null);
  const [isSelectedCard, setIsSelectedCard] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isSelectedCard;
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({'_id': '', 'email': ''});
  const history = useNavigate();
  const [statusRegister, setStatusRegistr] = React.useState(null);

  React.useEffect(() => {
    api.identificationProfile()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => console.log(err))
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => console.log(err));
  }, []);
/*
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) {
      return;
    }

    apiAuth.getEmail(jwt)
    .then((res) => {
      setUserInfo({
        '_id': res.data['_id'],
        'email': res.data['email']
      });
      setLoggedIn(true);
    })
    .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    setLoggedIn(false);
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);
*/
  function handleEscUp(evt) {
    if(evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keyup', handleEscUp);
      return() => {
        document.removeEventListener('keyup', handleEscUp);
      }
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelectedCard(true);
    setSelectedCard(card);
  }

  function handleTrashClick() {
    setIsDeleteCard(true);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
  }

  function handleConfirmationDelete() {
    setIsConfirmationPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser({name, about}) {
      api.editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }  

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSelectedCard(false);
    setSelectedCard(null);
    setIsDeleteCard(false);
  }

/*
<Route exact path='/' element={
          <ProtectedRoute
          exact
          loggedIn={loggedIn}
          path="/"
          userInfo={userInfo}
          setLoggedIn={setLoggedIn}
          handleSignOut={handleSignOut}
          component={Header}
        />}></Route>
*/

/*
<Route exact path='/' element={
        <ProtectedRoute
          loggedIn={loggedIn}
          path="/"
          component={Main}
          openEditAvatar = {handleEditAvatarClick}
          openEditProfile = {handleEditProfileClick}
          openAddCard = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          cards={cards}
          onConfirmationDelete={handleConfirmationDelete}
        />}>

        <Route element=
         {loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        >
        </Route>

        </Route>
        <InfoTooltip 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name="ok"
        />
*/

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<Login />}>
        </Route>
        <Route path="/sign-up" element={<Register />}>
        </Route>
        <Route path="/" exact element={
          <Main 
          openEditAvatar = {handleEditAvatarClick}
          openEditProfile = {handleEditProfileClick}
          openAddCard = {handleAddPlaceClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
          cards={cards}
        />
        }
        ></Route>
      </Routes>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup 
          open={`${isSelectedCard ? 'popup__active' : ''}`}
          card={selectedCard}
          close={closeAllPopups}
        />
        <PopupWithForm 
          open={`${isDeleteCard ? 'popup__active' : ''}`}
          close={closeAllPopups}
          title="Вы уверены?"
          name="deleteCard"
          button="Да"
        >
        </PopupWithForm>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
