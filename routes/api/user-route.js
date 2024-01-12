const router = require('express').Router();
const { User } = require('../../models');

// api/users endpoint

// route to create new User session
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      (req.session.userId = userData.id),
        (req.session.username = userData.username),
        (req.session.loggedIn = true),
        res.json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  //find the user with the username
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect user or password, please try again' });
      return;
    }

    //create a session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
