const mongoose=require("mongoose")
const schema=mongoose.Schema

const chatschema=new schema({
    textprompt:String,
    img:String,
    mime:String
})

const userSchema=new schema({
    name:String,
    password:String,
    email:String,
    chat:[chatschema]
})


module.exports=mongoose.model("user",userSchema);