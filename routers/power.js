const { Router } = require('express');
const SuperpowerController = require('../controller/power.controller.js');

const router = Router();

router.post('/', SuperpowerController.createPower);
router.patch('/:id', SuperpowerController.updatePower);
router.delete('/:id', SuperpowerController.deletePower);

module.exports = router;