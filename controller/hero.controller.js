/**CREATE */
const { Op } = require('sequelize');
const createError = require('http-errors');
const { Superhero, Superpower, sequelize, Image } = require('../models');
const queryInterface = sequelize.getQueryInterface();


/**CREATE */
module.exports.createHero = async (req, res, next) => {
    try {
        const { body, files = [] } = req;
        const createdHero = await Superhero.create(body);
        let powersArr = [];
        let images = [];

        if (files.length) {
            console.log(files)
            images = files.map(file => {
                return {
                    hero_id: createdHero.id,
                    image_path: file.filename,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
            });
            await queryInterface.bulkInsert('images', images, {});


        }


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
            data: { createdHero, images, powersArr },
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
            return next(createError(404, 'Hero not found'));
        }

        res.send(hero);
    } catch (err) {
        next(err);
    }
};

/**update */


module.exports.updateSuperhero = async (req, res, next) => {
    try {
        const {
            params: { id },
            body,
        } = req;
        let powersArr = [];

        const [rowsCount, updatedSuperhero] = await Superhero.update(body, {
            where: { id },
            returning: true,
        });

        if (rowsCount !== 1) {
            return next(createError(400, "User can't be updated"));
        }


        if (body.superpowers) {
            const powers = await Superpower.findAll({
                where: {
                    id: {
                        [Op.in]: body.superpowers,
                    },
                },
            });
            powersArr = powers.map(power => {
                return {
                    power_id: power.dataValues.id,
                    hero_id: id,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
            });
            await queryInterface.bulkInsert('heroes_to_superpowers', powersArr, {});
        }

        res.status(200).send({
            data: { updatedSuperhero, powersArr },
        });
    } catch (err) {
        next(err);
    }
};



/**delete */

module.exports.deleteSuperhero = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;

        const rowsCount = await Superhero.destroy({
            where: { id },
        });

        if (rowsCount !== 1) {
            return next(createError(404, 'User not found'));
        }

        res.send({ data: rowsCount });
    } catch (err) {
        next(err);
    }
};

/**get all Heroes */
module.exports.getAllSuperheroes = async (req, res, next) => {
    const { pagination = {} } = req;
    try {
        const heroes = await Superhero.findAll({
            include: [
                {
                    model: Superpower,
                    attributes: ['id', "name"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Image,
                    attributes: ["image_path"],
                },
            ],
            ...pagination,
        });
        res.status(200).send({
            data: heroes
        });
    } catch (err) {
        next(err);
    }
};