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
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js'

function App() {

  const api = new Api('http://localhost:5555');
  const apiAuth = new ApiAuthorization('http://localhost:5555');
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', email: '', avatar: ''});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isRegisterPopup, setIsRegisterPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isSelectedCard, setIsSelectedCard] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isSelectedCard || isRegisterPopup;
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({'_id': '', 'email': ''});
  const navigate = useNavigate();
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

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if(!jwt) {
      return;
    }

    apiAuth.getToken()
    .then((res) => {
      setCurrentUser(res.data);
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
      navigate('/', {replace: true});;
    }
  }, [loggedIn, navigate]);

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

  function handleRegisterClick() {
    setIsRegisterPopup(true);
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
    localStorage.removeItem('token');
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
      console.log(newCard);
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
    setIsRegisterPopup(false);
  }


  function handleRegisterUser({email, password}) {
    return apiAuth.registrationUser({email, password})
      .then((res) => {
        setStatusRegistr(true);
        navigate('/signin', {replace: true});
        handleRegisterClick();
      })
      .catch(() => {
        setStatusRegistr(false);
        navigate('/signup', {replace: true});
        handleRegisterClick();
      });
  }

  function handleLoginUser({email, password}) {
    return apiAuth.authorizationUser({email, password})
      .then((res) => {
        setCurrentUser({'email': email});
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
      <Header 
        userInfo={currentUser}
        signOut={handleSignOut}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path='/' exact element={
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            openEditAvatar = {handleEditAvatarClick}
            openEditProfile = {handleEditProfileClick}
            openAddCard = {handleAddPlaceClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards={cards}
          />
        }>
        </Route>
        <Route path="/signin" element={
        <Login 
          logged={handleLoginUser}
        />}>
        </Route>
        <Route path="/signup" element={
          <Register 
            register={handleRegisterUser}
          />}>
        </Route>
         <Route exact path='*' element=
         {loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
        >
        </Route>
      </Routes>
      <InfoTooltip 
         open={`${isRegisterPopup ? 'popup__active' : ''}`}
         close={closeAllPopups}
         statusRegister={statusRegister}
      />
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
