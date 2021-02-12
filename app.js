const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUserBody, validateAuth } = require('./middlewares/validation');
const movieRouter = require('./routes/movie');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/errorUrl');
const errorHandler = require('./errors/errorHandler');
require('dotenv').config();

const app = express();

const { PORT = 3000, MONGO_URL } = process.env;

// app.use(cors({ origin: 'http://lutowa.darya.students.nomoredomains.monster' }));
app.use(cors());
// защитим заголовки
app.use(helmet());
// ограничиваем количество запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключаем логгер запросов
app.use(requestLogger);

// авторизация
app.post('/signup', validateUserBody, createUser);

// аутентификация
app.post('/signin', validateAuth, login);

// защита авторизацией
app.use(auth);
app.use('/', movieRouter);
app.use('/', usersRouter);
app.use('/', errorRouter);

// подключаем логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
