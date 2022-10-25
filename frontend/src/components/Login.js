import React, {useState} from 'react';

function Login({
  logged
}){
  const [values, setValues] = useState({login_email: '', login_password: ''});

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name] : target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    logged({
      email: values.login_email,
      password: values.login_password
    });
  }

  return(
    <div>
      <section className='login'>
        <h2 className='login__title'>Вход</h2>
        <form 
          onSubmit={handleSubmit}
          className='login__form'
          name='login'>
            <input
              required
              name='login_email'
              type='email'
              placeholder='Email'
              className='login__input login__input_type_email'
              value={values.login_email || ''}
              onChange={handleChange}
            />
            <input
              required
              name='login_password'
              type='password'
              placeholder='Пароль'
              className='login__input login__input_type_password'
              value={values.login_password || ''}
              onChange={handleChange}
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