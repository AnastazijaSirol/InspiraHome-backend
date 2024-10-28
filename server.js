const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/user');
const History = require('./models/history');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const HF_API_TOKEN = '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';

const IMAGE_DIR = path.join(__dirname, 'images');
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR);
}

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.use(cors());
app.use(bodyParser.json());

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Token received:', token); 
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token.split(' ')[1], 'secret', (err, decoded) => { 
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};


app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user.');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send('User not found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
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
    console.error('Error saving history:', error);
    res.status(500).send('Error saving history.');
  }
});

app.post('/api/images', verifyToken, async (req, res) => {
  try {
    const latestHistory = await History.findOne({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
    });

    if (!latestHistory) {
      console.log('No history found for user:', req.userId);
      return res.status(404).json({ error: 'No history found.' });
    }

    const prompt = `Generate a realistic image of a ${latestHistory.room} in ${latestHistory.style} style with predominant ${latestHistory.color} color tones.`;
    console.log('Prompt being sent to API:', prompt);

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    if (response.status === 200) {
      const filename = `image_${Date.now()}.png`;
      const filePath = path.join(IMAGE_DIR, filename);
      fs.writeFileSync(filePath, Buffer.from(response.data));
      const imageUrl = `http://localhost:${PORT}/images/${filename}`;
      res.json({ image: imageUrl, prompt });
    } else {
      console.error('Error from Hugging Face API:', response.status, response.data);
      return res.status(500).json({ error: 'Failed to generate image: Error from API.' });
    }
  } catch (error) {
    console.error('Error fetching image from Hugging Face:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return res.status(500).json({ error: 'Failed to generate image.' });
  }
});

app.use('/images', express.static(IMAGE_DIR));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
