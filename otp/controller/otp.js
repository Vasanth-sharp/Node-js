const express=require("express")
const nodemainler=require("nodemailer")
const router=express.Router()
require('dotenv').config()

router.post("/",(req,res)=>{
    const {email,otp,name}=req.body;

    const transporter=nodemainler.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SENDER_MAIL,
            pass:process.env.SENDER_PASS
        }
    })

    let senderData={
        from:process.env.SENDER_MAIL,
        to:email,
        subject:`Hi ${name} your OTP`,
        text:`Your OTP[one time passsword] is ${otp} don't share with anyone..`
    }

    transporter.sendMail(senderData,(error,info)=>{
        if(error)
        {
            console.log(error)
            res.status(500).send("Erreor occured while sending")
        }
        else{
            res.status(200).send("mail sent succesfully")
        }
    })
})

module.exports=router