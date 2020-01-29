const express = require('express');
const app = express();

// Set up passport for authentication
const passport = require('passport');
const passportConfig = require('./config/passport');
app.use(passport.initialize());
passportConfig(passport);

// Config express app to read JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config Routes 
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const bookRouter = require('./routes/book');
app.use('/book', bookRouter);

const favoriteRouter = require('./routes/favorite');
app.use('/favorite', favoriteRouter);

const noteRouter = require('./routes/note');
app.use('/note', noteRouter);

const { sequelize } = require('./lib/db/sequelize');


// Functions to initialize server, and database.
async function serverInit() {
    const eraseDatabaseOnSync = false;
    sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
        console.log(`Database Ready!!`)
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running on ${port}`))
}

serverInit();
