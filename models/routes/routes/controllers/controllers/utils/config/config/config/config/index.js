const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const responseRoutes = require('./routes/responseRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ➡️ Connect to Database
connectDB();

// ➡️ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ➡️ Routes
app.use('/api/responses', responseRoutes);
app.use('/api/training', trainingRoutes);

// ➡️ Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'College Prediction Bot API is running 🚀' });
});

// ➡️ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong! ❌', details: err.message });
});

// ➡️ Start Server
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
