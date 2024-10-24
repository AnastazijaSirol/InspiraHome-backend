const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/user');
const History = require('./models/history');  

const app = express();
const PORT = 3000;

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.use(cors());
app.use(bodyParser.json());

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found.');
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
});

app.post('/api/history', verifyToken, async (req, res) => {
  const { style, room, color } = req.body;

  try {
    await History.create({
      style,
      room,
      color,
      userId: req.userId,  
    });

    res.status(201).send('History record saved.');
  } catch (error) {
    res.status(500).send('Error saving history.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
