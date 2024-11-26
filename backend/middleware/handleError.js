// Error Handling Middleware
const errorMiddleware = (error, req, res, next) => {
    // Determine the status code
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    // Send the error response
    res.status(statusCode).json({
        success: false,
        message: error.message || 'An unexpected error occurred.',
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack, // Include stack only in development
    });
};

module.exports = errorMiddleware;
