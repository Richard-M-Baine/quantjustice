const express = require('express');
const sequelize = require('./config/database');
const countyRoutes = require('./routes/county');
const judgeRoutes = require('./routes/judges')
const crimeRoutes = require('./routes/crimes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/county', countyRoutes);
app.use('/api/judges', judgeRoutes)
app.use('/api/crimeRoutes', crimeRoutes)

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});