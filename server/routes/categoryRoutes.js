const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategory);
router.post('/', categoryController.addNew);
router.get('/:category', categoryController.getCatByName);
// router.get('/:id', categoryController.getCatById);
module.exports = router;
