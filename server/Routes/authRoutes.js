const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getProfile } = require('../Controllers/authController');


//middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
)

router.get('/', (req, res) => {
    res.send('Welcome to NasaApodApp');
});

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/profile', getProfile)

module.exports = router;