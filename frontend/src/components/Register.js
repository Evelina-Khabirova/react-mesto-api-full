import React from 'react';
import { Link } from 'react-router-dom';

function Register({

}){
  return(
    <div>
      <section className='register'>
        <h2 className='register__title'>Регистрация</h2>
        <form 
          className='register__form'
          name='register'>
            <input
              required
              name='register_email'
              type='email'
              placeholder='Email'
              className='register__input register__input_type_email'
            />
            <input
              required
              name='register_password'
              type='password'
              placeholder='Пароль'
              className='register__input register__input_type_password'
            />
            <button
              className='register__button'
              type='submit'
              name='register__save'
            >Войти</button>
        </form>
        <Link to="/sign-in" className='register__link'>Уже зарегистрированы? Войти</Link>
      </section>
    </div>
  );
}

export default Register;