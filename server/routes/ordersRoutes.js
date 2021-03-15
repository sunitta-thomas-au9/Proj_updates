const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/', ordersController.newOrder);
router.get('/', ordersController.allOrders);
router.get('/:name', ordersController.ordersByName);
router.get('/:id', ordersController.ordersById);
router.patch("/:id", ordersController.updateOrder);
module.exports = router;
