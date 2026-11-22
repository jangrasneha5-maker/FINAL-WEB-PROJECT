const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/releases', require('./src/routes/releaseRoutes'));
app.use('/api/tour', require('./src/routes/tourRoutes'));
app.use('/api/messages', require('./src/routes/messageRoutes'));
app.use('/api/updates', require('./src/routes/updateRoutes'));
app.use('/api/external', require('./src/routes/externalRoutes'));

app.get('/admin', async (req, res) => {
  try {
    const Release = require('./src/models/Release');
    const TourEvent = require('./src/models/TourEvent');
    const ContactMessage = require('./src/models/ContactMessage');
    const [releases, events, messages] = await Promise.all([
      Release.find().sort({ createdAt: -1 }),
      TourEvent.find().sort({ date: 1 }),
      ContactMessage.find().sort({ submittedAt: -1 })
    ]);
    res.render('admin', { releases, events, messages });
  } catch (error) {
    res.status(500).send(`Admin page could not load: ${error.message}`);
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Modern Musician server is working!' });
});

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
module.exports = app;
