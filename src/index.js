require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3333);

