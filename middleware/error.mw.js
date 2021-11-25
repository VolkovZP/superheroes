module.exports = async (err, req, res, next) => {
    const status = err.status || 500;
    console.error(err);

    res.status(status).send({
        errors: [{ message: err || 'Server error' }],
    });
};