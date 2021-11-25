/**CREATE */
const { Op } = require('sequelize');
const createError = require('http-errors');
const { Superhero, Superpower, sequelize } = require('../models');
const queryInterface = sequelize.getQueryInterface();
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

