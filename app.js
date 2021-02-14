const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./errors/errorHandler');
const limiter = require('./utils/limiter');
const { MONGO_URL } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(cors({ origin: 'http://lutowa.darya.students.nomoredomains.monster' }));
app.use(cors());
// защитим заголовки
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем логгер запросов
app.use(requestLogger);
// ограничиваем количество запросов
app.use(limiter);

app.use(routes);
// app.use(errorRouter);

// подключаем логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`On port ${PORT}`);
});
