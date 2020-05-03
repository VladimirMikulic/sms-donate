// Modules
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view configs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make our assets from public folder available on /
app.use(express.static(path.join(__dirname, 'public')));

// Parse data from incoming requests (form submission)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
