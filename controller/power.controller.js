const createError = require('http-errors');
const { Superpower } = require('../models')
module.exports.createPower = async (req, res, next) => {
    try {
        const { body } = req;
        const createdPower = await Superpower.create(body);
        res.send({ data: createdPower })
    } catch (err) {
        next(err)
    }
}

module.exports.updatePower = async (req, res, next) => {
    try {
        const {
            body,
            params: { id },
        } = req;

        const [rowsCount, updatedSuperpower] = await Superpower.update(body, {
            where: { id },
            attributes: ['id', 'superpower'],
            returning: true,
        });

        if (rowsCount !== 1) {
            return next(createError(400, "Superpower can't be updated"));
        }

        res.send({
            data: updatedSuperpower,
        });
    } catch (err) {
        next(err);
    }
}

module.exports.deletePower = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const rowsCount = await Superpower.destroy({
            where: { id }
        })
        if (rowsCount !== 1) {
            return next(createError(404, "power not found"))
        }
        res.send({ data: rowsCount })
    } catch (err) {
        next(err)
    }
}