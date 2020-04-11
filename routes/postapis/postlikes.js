const express = require('express')
const router = express.Router();
const jwt = require ('jsonwebtoken')
const Vendor = require('../../models/vendorSchema');
const User =require('../../models/userSchema');

router.patch('/:id',checkAuth, getVendor, async (req, res) => {
   res.required__object[0].Likes=req.body.Likes
  
    try {   
                  const updatedLike = await res.required__object[1].save()
                  // console.log(res.decoded.username)

                  //updating the lliked array-----------------------
                  user_object= await User.findOne({"Username":res.decoded.username}) 
                  try {   
                        user_object.liked.push({
                          "video_id":res.required__object[0]._id,
                          "video_url":res.required__object[0].Url
                      })
                        const updated_user = await user_object.save()
                        console.log(updated_user)
                  } catch(err) {
                        res.status(400).json({ message: err.message })
                  }
                   res.json(updatedLike)


    } catch(err) {
      
                res.status(400).json({ message: err.message })
    }
  
  })

  
  //MIddleeware to check the token 
  async function checkAuth(req,result,next){
    try{
      const token =req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token,process.env.JWT_KEY);
        result.decoded=decoded 
        //console.log(result.decoded)
        next();
    }catch(err){
        return result.status(401).json({
          message:"Auth Failed"
        })
    }
  }
  
  // Middleware function for gettig video object by ID
async function getVendor(req, res, next) {
    try {
      
      vendor_object= await Vendor.find({})
      var required__object=[]
      vendor_object.map(vendor=>{
        vendor.Videos.map(video=>{
          if(video.id==req.params.id)
          {
            required__object.push(video)
            required__object.push(vendor)
          }
        })
       
      })
      console.log("--------------------------------------------------------------------------------------------------")
      console.log(required__object)
      if (required__object == null) {
        return res.status(404).json({ message: 'Cant find vendor'})
      }

    } catch(err){
      return res.status(500).json({ message: err.message })
    }
    
    res.required__object = required__object
    next()
  }


  
  module.exports = router 