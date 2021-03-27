// hello.js
module.exports = (req, res, next) => {
  res.header('X-Hello', 'World');

  setTimeout(next, 1000);
};
