const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
require('./database');

// Settings
const PORT = process.env.PORT || 4000;

 app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
 })


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));

module.exports = app;

