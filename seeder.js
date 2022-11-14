const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');

//dotenv config
dotenv.config({path: './config/config.env'});

//load model
const Bootcamp = require('./models/Bootcamp');

//connect db
mongoose.connect(process.env.MONGO_URI);

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

//Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

//Delete data from DB
const deleteData = async () => {
 try {
  await Bootcamp.deleteMany();
  console.log('Data Destroyed...'.red.inverse);
  process.exit();
 } catch (error) {
  console.error(error)
 }
}

if(process.argv[2] === '-i'){
  importData();
} else if(process.argv[2] === '-d'){
  deleteData();
}