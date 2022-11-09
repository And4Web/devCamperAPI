const Bootcamp = require('../models/Bootcamp');


//@desc     get all the bootcamps
//@route    GET /api/v1/bootcamps
//@access   public
exports.getBootcamps = async (req, res, next)=>{
  try {
    const bootcamps = await Bootcamp.find({}, {__v: 0, _id: 0});
    res.status(200).json({success: true, data: bootcamps});
  } catch (error) {
   res.status(400).json({success: false, error: error.message});
  }
}

//@desc     get a single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = async (req, res, next)=>{
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
      return res.status(400).json({success: false, error: 'No bootcamp with that id exists.'})
    }
    res.status(200).json({success: true, data: bootcamp});
  } catch (error) {
    res.status(400).json({success: false, error: error.message});
  }
}

//@desc     create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   private
exports.postBootcamp = async (req, res, next)=>{
  try {
    const bootcamp = await Bootcamp.create(req.body);  
    res.status(201).json({success: true, data: bootcamp});    
  } catch (error) {
    res.status(400).json({success: false, error: error.message});
  }

}

//@desc     update a bootcamp
//@route    Put /api/v1/bootcamps/:id
//@access   private
exports.updateBootcamp = (req, res, next)=>{
  res.status(200).json({success: true, message: `Update a bootcamp ${req.params.id}.`})
}

//@desc     delete a bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = (req, res, next)=>{
  res.status(200).json({success: true, message: `Delete a bootcamp ${req.params.id}.`})
}
