const router = require('express').Router();
const userRoutes = require('./user-route');
const reviewRoutes = require('/review-route');

router.use('/users', userRoutes);

router.use('/review', reviewRoutes);

module.exports = router;
