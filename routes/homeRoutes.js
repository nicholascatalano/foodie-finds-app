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

router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('newReview', { layout: 'main' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all auth user's posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // let's find user id and incl all their posts
    const reviewData = await Review.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    // Pass their posts to the view & render into all posts admin using dashboard layout:
    const reviews = reviewData.map((review) =>
      review.get({
        plain: true,
      })
    );
    res.render('dashboard', { reviews });
  } catch (err) {
    // if withAuth fails...
    // if user has no active posts, redirect to login page:
    res.redirect('login');
  }
});

module.exports = router;
