const router = require('express').Router();
let store = require('../middleware/storeUsers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const {
  registerValidation,
  loginValidation,
} = require('../middleware/validation');

router.post('/register', async (req, res) => {
  //Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  //Simple validation
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  //Checking if user exists
  const emailExsit = await store.isUserExist(req.body.email);
  if (emailExsit) return res.status(400).json({ msg: 'Email already exist' });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    locations: [],
  };
  try {
    user.id = await store.getNextUserId();
    store.users.push(user);
    await store.save();

    //CREATE TOKEN
    const token = jwt.sign({ id: user.id }, 'jwtSecret');
    res.header('auth-token', token);
    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  //VALIDATE DATA
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  //CHCKING IF EMAIL EXISTS
  const user = await store.isUserExist(req.body.email);
  if (!user) return res.status(400).json({ msg: 'Email or password is worng' });

  //PASSWORD CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ msg: 'Email or password is worng' });

  //CREATE TOKEN
  const token = jwt.sign({ id: user.id }, 'jwtSecret');
  res.header('auth-token', token);
  return res.json({ user, token });
});

//Get all users
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await store.read();
    if (!user) throw Error('[Server: ] User Does not exist');
    const userName = user.map((item) => item);
    res.json(userName);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await store.findUserById(req.user.id);
    if (!user) throw Error('User Does not exist');
    res.json({ user });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
