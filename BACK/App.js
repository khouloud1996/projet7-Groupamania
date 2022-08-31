const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const rateLimiter = require('express-rate-limit');
const db = require("./models/index");

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

const userRoutes = require('./routes/users');

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'same-site' },
}));
app.use(limiter);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

module.exports = app;
