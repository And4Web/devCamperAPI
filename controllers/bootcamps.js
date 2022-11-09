//@desc     get all the bootcamps
//@route    GET /api/v1/bootcamps
//@access   public
exports.getBootcamps = (req, res, next)=>{
  res.status(200).json({success: true, message: 'Show all bootcamps.'})
}

//@desc     get a single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = (req, res, next)=>{
  res.status(200).json({success: true, message: `Show single bootcamp ${req.params.id}.`})
}

//@desc     create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   private
exports.postBootcamp = (req, res, next)=>{
  res.status(200).json({success: true, message: 'Create new bootcamp.'})
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
