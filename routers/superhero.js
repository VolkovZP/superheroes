const { Router } = require('express');
const SuperHeroController = require('../controller/hero.controller');

const router = Router();

router.post('/', SuperHeroController.createHero);
router.get('/:id', SuperHeroController.getSuperhero);


module.exports = router;