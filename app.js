const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/posts');

const app = express();

dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Databasega ulandik!'))
    .catch((e) => console.log(e));

// Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', authRoutes);
app.use('/posts', postRoutes);

app.use((req, res) => {
    res.status(404).send('404');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}-port`));

