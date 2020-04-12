const express = require('express')
const router = express.Router()
const Vendordetails =require('../../models/vendorSchema')

router.get('/', getcategory , async(req,result)=>{
            //console.log(res.category)
            result.json(result.category)
})

async function getcategory(req,res,next){
  
      try {
        vendor_object= await Vendordetails.find({})
        const category=[]
        vendor_object.map(vendor=>{
          vendor.Videos.map(video=>{
           category.push(
             //"id":Math.random().toString(36).slice(2),
             video.Category)
          })    
        })
        var  unique= Array.from(new Set(category)) 
        var unique_array=[] 
        for (const prop in unique){
            unique_array.push({
              "id":Math.random().toString(36).slice(2),
              "Category":unique[prop]
            })
        }
        console.log("--------------------------------------------------------------------------------------------------")
        console.log(unique_array)
        if (category == null) {
          return res.status(404).json({ message: 'Cant find vendor'})
        }
  
      } catch(err){
        return res.status(500).json({ message: err.message })
      }
      res.category=unique_array
      next()
}

module.exports = router 