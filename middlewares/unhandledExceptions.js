function unhandledExceptions(err, req, res, next) {
  if (res.headersSent) {
    return next();
  }
  if (!err.status) {
    res.status(500);
    return res.send({ message: 'Произошла неизвестная ошибка. Мы работаем над этим.' });
  }
  res.status(err.status);
  return res.send({ message: err.message });
}

module.exports = unhandledExceptions;
