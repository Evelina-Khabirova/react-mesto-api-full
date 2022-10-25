import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Register({
  register
}){
  const [values, setValues] = useState({register_email: '', register_password: ''});

  function handleChange(e) {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name] : target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    register({
      email: values.register_email,
      password: values.register_password
    });
  }

  return(
    <div>
      <section className='register'>
        <h2 className='register__title'>Регистрация</h2>
        <form 
          onSubmit={handleSubmit}
          className='register__form'
          name='register'>
            <input
              required
              name='register_email'
              type='email'
              placeholder='Email'
              className='register__input register__input_type_email'
              value={values.register_email || ''}
              onChange={handleChange}
            />
            <input
              required
              name='register_password'
              type='password'
              placeholder='Пароль'
              className='register__input register__input_type_password'
              value={values.register_password || ''}
              onChange={handleChange}
            />
            <button
              className='register__button'
              type='submit'
              name='register__save'
            >Войти</button>
        </form>
        <Link to="/signin" className='register__link'>Уже зарегистрированы? Войти</Link>
      </section>
    </div>
  );
}

export default Register;