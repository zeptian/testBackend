const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    quantity:{type:Number,required:true}
},{
    timeseries:true
})

module.exports = mongoose.model('Products',ProductSchema);