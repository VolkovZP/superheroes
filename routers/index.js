const { Router } = require('express');

const superpowerRouter = require('./power');
const superheroRouter = require('./superhero');

const router = Router();


router.use('/powers', superpowerRouter);
router.use('/superhero', superheroRouter);

module.exports = router;