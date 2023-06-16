const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const config = require('./config');
const unhandledExceptions = require('./middlewares/unhandledExceptions');
const requestsLogger = require('./middlewares/requestsLogger');
const rateLimit = require('./utils/rateLimit');

// Connect to the database
(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

// Prepare and run the server
const app = express();

app.use(requestsLogger);

app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(cookieParser());

app.use(rateLimit);
app.use(routes);

app.use(errors());
app.use(unhandledExceptions);

app.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
  console.log(`Express server has been started at http://${config.SERVER_HOST}:${config.SERVER_PORT}`);
});
