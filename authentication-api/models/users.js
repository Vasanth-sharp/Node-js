const mongoose=require("mongoose")
const schema=mongoose.Schema

const user=new schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number
    }
},{timestamps:true})

module.exports=mongoose.model("users",user);