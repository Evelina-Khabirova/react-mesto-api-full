require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  MONGO_URL,
} = process.env;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUser = require('./routers/users');
const routerCard = require('./routers/cards');
const { loginProfile, registerProfile } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { validateLogin, validateCreateProfile } = require('./middlewares/validations');
const errorHandler = require('./middlewares/errorHandler');
//const { handleCors } = require('./middlewares/handleCors');
const NotFoundError = require('./error/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const allowedCors = ['https://praktikum.tk', 'http://praktikum.th', 'http://localhost:7777', 'http://api.mesto.evelina.nomoredomains.icu', 'https://api.mesto.evelina.nomoredomains.icu', 'http://mesto.evelina-khabirova.nomoredomains.icu', 'https://mesto.evelina-khabirova.nomoredomains.icu', 'http://127.0.0.1:7777', 'http://localhost:5555', 'http://127.0.0.1:5555'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: allowedCors}));
//app.use(handleCors);
app.use(requestLogger);
app.post('/signin', validateLogin, loginProfile);
app.post('/signup', validateCreateProfile, registerProfile);
app.use(auth);
app.use('/', routerUser);
app.use('/', routerCard);
app.use(errors());
app.use('*', (req, res, next) => {
  next(new NotFoundError('Сервер не найден'));
  next();
});
app.use(errorLogger);
app.use(errorHandler);

function connect() {
  mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(NODE_ENV === 'production' ? PORT : 3000);
}

connect();
