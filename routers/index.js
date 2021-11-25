const { Router } = require('express');

const superpowerRouter = require('./power');

const router = Router();


router.use('/powers', superpowerRouter);

module.exports = router;