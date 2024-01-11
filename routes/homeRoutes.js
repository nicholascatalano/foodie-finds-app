const router = require('express').Router();
const { User } = require('../models');

//login page
router.get('/login', (req, res) => {
  //if a session exists - redirect to the homepage
  //   console.log(req.session);
  //   if (req.session.logged_in) {
  //     res.redirect('/');
  //     return;
  //   }
  // render login page
  res.render('login');
});

module.exports = router;
