const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173', // Replace with the actual origin of your frontend application
};

app.use(cors(corsOptions));


app.use('/api', require('./Routes/authRoutes'));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connected'))
.catch((err) => console.log('DB not connected', err));

//middleware



app.listen(3001, () => console.log('server started on port 3001'));