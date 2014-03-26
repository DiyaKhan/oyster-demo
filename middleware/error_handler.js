
function errorHandler(err, req, res, next) {
    global.Logger.error(err);
    res.send((err.httpCode) ? err.httpCode : 500, { error: err });
}

module.exports = errorHandler;