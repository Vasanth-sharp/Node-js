const mongoose=require("mongoose")
const schema=mongoose.Schema

const productsSchema=new schema({
    product:String,
    price:Number,
    paymentMethod:String,
    paymentId:String
})
const userSchema=new schema({
    name:String,
    phone:Number,
    email:String,
    password:String,
    purchasedProducts:[productsSchema]
})

/*
{
    name:"vasanth",
    phone:9999999999,
    email:"vasanth98@gmail.com",
    password:"alfnlkanf"(Hashed),
    purchasedProducts:[{
        product:"soap",
        price:40,
        paymentMethod:"upi",
        paymentId:"lasfnaskfn"
    }]
}
*/
module.exports=mongoose.model("Customers",userSchema)