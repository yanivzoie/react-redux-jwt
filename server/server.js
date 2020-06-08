const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const PORT = '8000';
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
  res.json({ message: 'server is runing!' });
});

//Import Routes
const authRoute = require('./routes/auth');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Routes Middlewares
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`[APP]: App listening on port ${PORT}!`);
});
