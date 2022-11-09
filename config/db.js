const mongoose = require('mongoose');

require('dotenv').config({path: './config/config.env'})

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connection successful: ${connect.connection.host}`.cyan.bold.underline)
}

module.exports = connectDB;

/*
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
*/