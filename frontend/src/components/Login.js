import React from 'react';

function Login({

}){
  return(
    <div>
      <section className='login'>
        <h2 className='login__title'>Вход</h2>
        <form 
          className='login__form'
          name='login'>
            <input
              required
              name='login_email'
              type='email'
              placeholder='Email'
              className='login__input login__input_type_email'
            />
            <input
              required
              name='login_password'
              type='password'
              placeholder='Пароль'
              className='login__input login__input_type_password'
            />
            <button
              className='login__button'
              type='submit'
              name='login__save'
            >Войти</button>
        </form>
      </section>
    </div>
  );
}

export default Login;