const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:'./variables.env'})


const app= express();
//mongodb+srv://RitikJain:<password>@cluster0-wlrat.mongodb.net/
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://@cluster0-ynfwn.mongodb.net/",
    {
        dbName:'Streetfood',
        user:'dinesh',
        pass:'dinabhai',
        useNewUrlParser:true,
        useUnifiedTopology:true 
    }
).then(()=>{
    console.log("Mongodb Connected");
})

/*
//any routes which are not handled
app.use((req,res,next)=>{
    const err=new Error("not found")
    err.status=404
    next( err)  
})*/

//POst apis
const postuserRouter = require('./routes/postapis/postuserdetails')
app.use('/user', postuserRouter)

const postvendorRouter =require('./routes/postapis/postvendordetails')
app.use('/vendor', postvendorRouter)

const postcommentRouter =require('./routes/postapis/postcomments')
app.use('/comment', postcommentRouter)

const postlikeRouter =require('./routes/postapis/postlikes')
app.use('/like', postlikeRouter)


const postreviewRouter =require('./routes/postapis/postreviews')
app.use('/review', postreviewRouter)


const postvideoRouter =require('./routes/postapis/postvideos')
app.use('/video', postvideoRouter)

//Getapis
const userprofileRouter =require('./routes/getapis/getuserprofile')
app.use('/getuser', userprofileRouter)

const vendorprofileRouter =require('./routes/getapis/getvendorprofile')
app.use('/getvendor', vendorprofileRouter)


const trendingRouter =require('./routes/getapis/gettrending')
app.use('/trending', trendingRouter)

const exploreRouter =require('./routes/getapis/getexplore')
app.use('/explore', exploreRouter)

const nearmeRouter =require('./routes/getapis/getnearme')
app.use('/nearme', nearmeRouter)


const getcommentRouter =require('./routes/getapis/getcomments')
app.use('/getcomment', getcommentRouter)

const getreviewRouter =require('./routes/getapis/getreviews')
app.use('/getreview', getreviewRouter)


/*
//Error handler
app.use((err,req,res,next)=>{
    res.status(err.status|| 500)
    res.send({
        error:{
            status:err.status,
            message:err.message
        }
    })
})
*/
const host=process.env.HOST || '0.0.0.0';
const port=process.env.PORT || 3000;

app.listen(port,host,()=>{
    console.log("SErver has started")
})