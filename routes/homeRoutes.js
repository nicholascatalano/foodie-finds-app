const router = require('express').Router();
const { User, Review } = require('../models');
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
    res.render('newReview', { layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all reviews given a restaurant id (foreign key of Restaurant model)
router.get('/review/:restaurant_id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        restaurant_id: req.params.restaurant_id,
      },
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    if (!reviewData) {
      res.status(404).json({ message: 'No restaurant found with this id!' });
      return;
    }

    res.render('reviewsPerRestaurant', {
      layout: 'main',
      reviews,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
