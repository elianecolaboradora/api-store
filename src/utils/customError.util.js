export class CustomError extends Error {
    constructor(message, status = 500, details = null) {
        super(message);
        this.status = status;
        this.details = details;  // Información adicional opcional
        Error.captureStackTrace(this, this.constructor);
    }
}
