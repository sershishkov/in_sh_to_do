const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');



const app = express();

const users = require('./routes/api/users');
const exercise = require('./routes/api/exercise');
const workout = require('./routes/api/workout');
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

// DB Config
const db = require('./config/keys').mongoURI;


// Connect to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true, useFindAndModify:false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
  // Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/exercise', exercise);
app.use('/api/workout', workout);

//sever static assets if in production
if ( process.env.NODE_ENV === 'production' ) {
  //set static foder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
