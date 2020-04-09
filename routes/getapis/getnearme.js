const express = require('express')
const router = express.Router()
const Vendordetails =require('../../models/vendorSchema')


router.get('/', async (req, res) => {
    try {
   
        vendor_object= await Vendordetails.find({})
        
   /*   //Likes
        function Likes(video)
        {
          var Likes=[]
          video.map(mapvar=>{
                Likes.push(mapvar.Likes)
          })
          return (Likes)

        }
        //URL
        function Url(video)
        {
          var Url=[]
          video.map(mapvar=>{
                Url.push(mapvar.Url)
          })
          return (Url)

        }
     
        function Comments(video)
        { var count_array=[]
          video.map(mapvar=>{
                 count_array.push(No_of_Comments(mapvar.Comments))
          })
          return count_array
        }
    

        function Reviews(video)
        { var count_array=[]
          video.map(mapvar=>{
                 count_array.push(No_of_Reviews(mapvar.Reviews))
          })
          return count_array
        }
       
        function Getid(video)
        {
          var id=[]
          console.log()
          video.map(mapvar=>{
                id.push(mapvar._id)
          })
          return (id)

        }
        */

        //comments
       function No_of_Comments(comment)
       {    var count=0
           comment.map(mapvar=>{
                   count++
           })
           return count
       }

        //Reviews
           function No_of_Reviews(review)
           {    var count=0
               review.map(mapvar=>{
                       count++
               })
               return count
           }


        function Videostats(video)
        {
          var stats=[]
          video.map(mapvar=>{
           stats.push( { 
              "video_id": mapvar._id,
              "Likes":mapvar.Likes,
              "No_of_comments":No_of_Comments(mapvar.Comments),
              "No_of_reviews":No_of_Reviews(mapvar.Reviews),
              "Video_url":mapvar.Url
        })
          })
          return stats
        }
       //Data which is returned as json in nearby api
       
        var required__object=[]
        vendor_object.map(vendor=>{
                required__object.push({
                    "Vendor_id":vendor._id,
                    "Vendor_name":vendor.Vendor_name,
                    "Followers":vendor.Followers,
                    "Videostats":Videostats(vendor.Videos),
                    "Location":vendor.Location
                 
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
      res.json(required__object)
  })

  module.exports = router 
