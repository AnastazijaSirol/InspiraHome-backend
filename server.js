const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = []; 

app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send('User already exists.');
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  users.push({ username, email, password: hashedPassword });
  res.status(201).send('User registered successfully.');
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(404).send('User not found.');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.username }, 'secret', { expiresIn: 86400 }); 
  res.status(200).send({ auth: true, token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

