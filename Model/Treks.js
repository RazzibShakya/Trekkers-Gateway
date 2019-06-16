const mongoose=require('mongoose');


const trekSchema=new mongoose.Schema({
    trek_name:{
        type:String
    },
    description:{
        type:String
    },
    min_price:{
        type:Number
    },
    max_price:{
        type:Number
    },
    duration:{
        type:String
    },
    itenary:{
        type:String
    },
    max_height:{
        type:String
    }
})
const Trek=mongoose.model('Trek',trekSchema)
module.exports=Trek;