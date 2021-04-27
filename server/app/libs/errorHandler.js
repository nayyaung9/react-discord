exports.catchError = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
