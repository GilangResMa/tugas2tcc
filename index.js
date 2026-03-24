const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/api', userRoutes);

sequelize.authenticate()
  .then(() => console.log('Sudah Connect Bang!'))
  .then(() => sequelize.sync({ alter: true }))
  .catch(err => console.error('DB error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));