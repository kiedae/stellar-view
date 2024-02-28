// authcontroller
const User = require('../Models/User');
const { hashPassword, comparePassword } = require('../Helpers/auth');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Username Checks
        const usernameExist = await User.findOne({ username });
        if (!username || usernameExist) {
            return res.status(400).json({
                error: 'Username may already be in use. A username is required',
            });
        }

        // Email Checks
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                error: 'Email is already in use',
            });
        }

        // Password checks
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Password is required and should be at least 6 characters long',
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// login end point

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // does user exist check
        const user = await User.findOne({email});

        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // Password Checks
    const match = await comparePassword(password, user.password)
    if(match){
        res.json('Passwords Match')
        jwt.sign({email: user.email, id: user._id, username: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token, { sameSite: 'None', secure: true }).json(user);

        })
    } else {
        res.json({
            error: 'Incorrect Password'
        })
    }

    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}






module.exports = {
    registerUser,
    loginUser,
    getProfile
}