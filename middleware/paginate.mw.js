module.exports = async (req, res, next) => {
    try {
        const {
            query: { limit = 6, offset = 0 },
        } = req;
        req.pagination = {
            limit: limit > 6 || limit <= 0 ? 6 : limit,
            offset: offset < 0 ? 0 : offset,
        };
        next();
    } catch (err) {
        next(err);
    }
};