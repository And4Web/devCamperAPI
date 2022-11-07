const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path: './config/config.env'});
const Port = process.env.PORT || 5000;

const app = express();
app.use(cors());
const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT'

app.listen(Port, console.log( `Server is running in ${NODE_ENV} mode on Port: ${Port}...`))