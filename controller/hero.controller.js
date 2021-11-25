/**CREATE */
const { Op } = require('sequelize');
const createError = require('http-errors');
const { Superhero, Superpower, sequelize } = require('../models');
const queryInterface = sequelize.getQueryInterface();
/**CREATE */
module.exports.createHero = async (req, res, next) => {
    try {
        const { body } = req;
        const createdHero = await Superhero.create(body);

        let powersArr = [];

        if (body.superpowers) {
            powersArr = await Superpower.findAll({
                where: {
                    id: {
                        [Op.in]: body.superpowers,
                    },
                },
            })
            console.log(powersArr)
            powersArr = powersArr.map(power => ({
                power_id: power.dataValues.id,
                hero_id: createdHero.id,
                created_at: new Date(),
                updated_at: new Date(),
            }))
            await queryInterface.bulkInsert('heroes_to_superpowers', powersArr, {});
        }

        res.status(201).send({
            data: { createdHero, powersArr },
        });
    } catch (err) {
        next(err);
    }
};

/**GET HERO  */

module.exports.getSuperhero = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;

        const hero = await Superhero.findByPk(id, {
            include: [
                {
                    model: Superpower,
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        if (!hero) {
            return next(createError(404, 'User not found'));
        }

        res.send(hero);
    } catch (err) {
        next(err);
    }
};