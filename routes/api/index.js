const router = require('express').Router();
const userRoutes = require('./user-route');
const reviewRoutes = require('./reviewRoutes');
const restaurantRoutes = require('./restaurantRoutes');

router.use('/users', userRoutes);
router.use('/review', reviewRoutes);
router.use('/restaurants', restaurantRoutes);

module.exports = router;
