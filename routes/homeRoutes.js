const router = require('express').Router();
const { User, Review, Restaurant } = require('../models');
const withAuth = require('../utils/auth');

// GET all reviews for homepage
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [User],
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    // render on allPosts view
    res.render('homepage', {
      reviews,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login page
router.get('/login', (req, res) => {
  //if a session exists - redirect to the homepage

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // render login page
  res.render('login', { layout: false });
});

// GET signup route
router.get('/signup', (req, res) => {
  // if logged in, redirect to homepage, else render signup page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', { layout: false });
});

// GET new review route
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newReview', { loggedIn: req.session.loggedIn, layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all Reviews, GET Restaurant by PK, given a restaurant id
router.get('/review/:restaurant_id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        restaurant_id: req.params.restaurant_id,
      },
      include: [User],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    if (!reviewData) {
      res.status(404).json({ message: 'No reviews found!' });
      return;
    }

    const restaurantData = await Restaurant.findByPk(req.params.restaurant_id);
    const restaurant = restaurantData.get({ plain: true });

    // res.send({ reviews });
    res.render('reviewsPerRestaurant', {
      layout: 'main',
      reviews,
      restaurant,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET about us route:
router.get('/aboutus', (req, res) => {
  // render about us page
  res.render('aboutus', { layout: false });
});

module.exports = router;
