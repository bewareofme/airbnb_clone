const mongoose =require('mongoose')

const BookingSchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Places'},
    user:{type:mongoose.Schema.Types.ObjectId,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    numberOfGuests:Number,
    name:String,
    price:Number,
    phone:Number,
})
const Bookingmodel=mongoose.model('Booking',BookingSchema)

module.exports=Bookingmodel