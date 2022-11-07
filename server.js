const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

//import routes
const bootcampsRoutes = require('./routes/bootcamps');

dotenv.config({path: './config/config.env'});
const Port = process.env.PORT || 5000;

const app = express();

app.use(cors());

//dev logging middleware - MORGAN
if(process.env.NODE_ENV === 'DEVELOPMENT'){
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

//mount routes
app.use('/api/v1/bootcamps', bootcampsRoutes);

app.get('/', (req, res)=>{
  res.send("<h1>Hello World!</h1>")
})

const NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT'

app.listen(Port, console.log( `Server is running in ${NODE_ENV} mode on Port: ${Port}...`))