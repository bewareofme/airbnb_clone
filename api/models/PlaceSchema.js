const mongoose =require('mongoose')

const PlaceSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInf:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,

})
const Placemodel=mongoose.model('Places',PlaceSchema)

module.exports=Placemodel