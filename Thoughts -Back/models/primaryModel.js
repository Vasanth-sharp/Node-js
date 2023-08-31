const mongoose=require("mongoose");
const schema=mongoose.Schema

const users=new schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model("users",users);