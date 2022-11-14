const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const connectDB = require('./config/db');

//connect DB
connectDB();

//import routes
const bootcampsRoutes = require('./routes/bootcamps');

dotenv.config({path: './config/config.env'});
const Port = process.env.PORT || 5000;

const app = express();

//Body Parser middleware
app.use(express.json());

app.use(cors());

//dev logging middleware - MORGAN
if(process.env.NODE_ENV === 'DEVELOPMENT'){
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

//mount routes
app.use('/api/v1/bootcamps', bootcampsRoutes);
app.use(errorHandler);

app.get('/', (req, res)=>{
  res.send("<h1>Hello World!</h1>")
})

const server = app.listen(Port, console.log( `Server is running in ${process.env.NODE_ENV} mode on Port: ${Port}.`.yellow.bold))

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
  console.log(`Error: ${err.message}`.red.underline.bold)
  //Close the server and end the process
  server.close(()=>process.exit(1));
})