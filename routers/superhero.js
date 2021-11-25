const { Router } = require('express');
const SuperHeroController = require('../controller/hero.controller');
const paginate = require('../middleware/paginate.mw')
const router = Router();

router.post('/', SuperHeroController.createHero);
router.get('/', paginate, SuperHeroController.getAllSuperheroes);
router.get('/:id', SuperHeroController.getSuperhero);
router.patch('/:id', SuperHeroController.updateSuperhero);
router.delete('/:id', SuperHeroController.deleteSuperhero);


module.exports = router;