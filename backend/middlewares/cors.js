const allowedCors = ['https://praktikum.tk', 'http://praktikum.th', 'http://localhost:7777', 'http://api.mesto.evelina.nomoredomains.icu', 'https://mesto.evelina-khabirova.nomoredomains.icu', 'http://127.0.0.1:7777', 'http://localhost:5555', 'http://127.0.0.1:5555'];
const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
module.exports.cors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  return next();
};
