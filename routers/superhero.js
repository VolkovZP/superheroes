const { Router } = require('express');
const path = require('path')
const multer = require('multer')
const SuperHeroController = require('../controller/hero.controller');
const paginate = require('../middleware/paginate.mw')
const router = Router();






const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({ storage })






router.post('/', upload.array('images', 3), SuperHeroController.createHero);
router.get('/', paginate, SuperHeroController.getAllSuperheroes);
router.get('/:id', SuperHeroController.getSuperhero);
router.patch('/:id', SuperHeroController.updateSuperhero);
router.delete('/:id', SuperHeroController.deleteSuperhero);


module.exports = router;