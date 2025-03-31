export const errorHandler = (error, req, res, next) => {
    const message = error.message || "SERVER ERROR";
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        method: req.method,
        url: req.url,
        error: message,
    })
}