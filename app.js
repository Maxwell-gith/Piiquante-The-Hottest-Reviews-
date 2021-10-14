const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

// Déclaration des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexions à mongoDB
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.MONGO_DB_ACCESS}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement de express
const app = express();

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();  
  }); 

// Conversion en JSON
app.use(express.json()); 

// Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Lancement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;