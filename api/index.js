const express = require('express')
const cors=require('cors')
const app =express();
const mongoose=require('mongoose')
const User=require('./models/UserSchema.js')
const bcrypt=require('bcryptjs')
const bscryptSalt=bcrypt.genSaltSync(10)
const cookieparser=require('cookie-parser')
const jwt=require('jsonwebtoken')
const download= require('image-downloader')
const path = require('path')
const multer=require('multer')
const fs=require('fs')

const jwtsecret='asdadasdafvasdfasdasdasdasd'

mongoose.connect('mongodb+srv://m001-student:m001-student-password@sandbox.zloaofo.mongodb.net/bookingapp?retryWrites=true&w=majority')

app.use(express.json())
app.use(cookieparser())
app.use('/uploads', express.static(path.join(__dirname,'uploads')))
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.get('/test',(req,res)=>{
    res.json('testing here')
})

app.post('/register',async (req,res)=>{
try{    
const userDoc= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bscryptSalt)
        }
    )
    res.json(userDoc)
}
catch(e){
    res.status(422).json(e)
}})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const  userInfo=await User.findOne({email})
    console.log
    if(userInfo){
        const passOK=bcrypt.compareSync(password,userInfo.password)
        if(passOK){
            jwt.sign({email:userInfo.email,id:userInfo._id},jwtsecret,{},(err,token)=>{
                if (err)throw err
                res.cookie('token',token,{sameSite:'none',secure:true}).json(userInfo)
            })  
        }else{
            res.status(422).json('password not okay')
        }
    }else{
     res.status(422).json('email not found')
    } 
 })
 app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    if(token){
        jwt.verify(token,jwtsecret,{},async(err,user)=>{
            if(err)throw err
            const {name,email,id}=await User.findById(user.id)
            res.json({name,email,id})
        })
    }else{

        res.json(null)
    }
 })
 app.get('/logout',(req,res)=>{
    res.cookie('token','').json('logout true')
 })

 app.post('/uploadsbylink',async(req,res)=>{
    const {photoLink}=req.body

    const newName=Date.now()+'.jpg'
    const options={
        url:photoLink,
        dest:__dirname+'\\uploads\\'+newName
    }
    try{
        await download.image(options)
        res.json(newName)
    }
    catch(e){
        res.json(e)
    }
 })
const photosMiddleware=multer({dest:'uploads/'})
 app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedfiles=[]
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i]
        const part=originalname.split('.')
        const newPath=path+'.'+part[part.length-1]
        fs.renameSync(path,newPath)
        uploadedfiles.push(newPath.split('\\')[1])
    }
    res.json(uploadedfiles)
 })
app.listen(5000)

