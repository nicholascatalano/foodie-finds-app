const router = require('express').Router();
const userRoutes = require('./user-route');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);

router.use('/review', reviewRoutes);

module.exports = router;
