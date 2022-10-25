import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from "../images/logo.svg";

function Header({
  userInfo,
  signOut,
  setLoggedIn
}) {
  const {pathname} = useLocation();
  let url ='';
  let text = '';
  let email ='';
  let style ='';
  switch(pathname) {
    case '/': url='/signin'; text='Выйти'; email=`${userInfo.email}`; style='header__link_login'; break;
    case '/signup': url='/signin'; text='Войти'; style=''; break;
    case '/signin': url='/signup'; text='Регистрация'; style=''; break;
  }

  function onSignOut() {
    setLoggedIn(false);
    signOut();
  }

  return(
    <header className="header">
      <img src={headerLogo} alt="Логотип сайта Место" className="header__logo" />
      <div className='header__text'>
        <p className='header__user-info'>{email}</p>
        <Link to={url} className={`header__link ${style}`} onClick={onSignOut}>{text}</Link>
      </div>
    </header>
  );
}

export default Header;