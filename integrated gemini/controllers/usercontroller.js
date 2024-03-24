const mongoose=require("mongoose")
const usermodel=require("../models/usermodel");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer=require("nodemailer")

const genAI = new GoogleGenerativeAI("AIzaSyAY0uiYRiFYk5DV5i2ZWLfRpbjKeOMH69A");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"vasanthakumarotp@gmail.com",
        pass:"fzrk ktqm bmaa nnmk"
    }
})


const loginUser=async(req,res)=>{
    const {name,password}=req.body;
    try{
        const response=await usermodel.findOne({name})
        if(response){
            const isMatch=await bcrypt.compare(password,response.password)
            if(isMatch){

                let senderData={
                    from:"Inte-gem (vasanth)",
                    to:response.email,
                    subject:"Thanks for login (❁´◡`❁)",
                    text:`Hi ${response.name} thank you for logging in and partnering with Inte-Gemini to build our community. Please provide feedback about our app and the performance of the model. 😎`
                }
                transporter.sendMail(senderData)

             
                const token=jwt.sign(JSON.stringify(
                        {name:response.name,email:response.email}
                        ),"vinoth")

            res.status(200).json({token})        
            }
            else{
                res.status(404).json({"message":"Invalid password"})
            }
        }
        else{
            res.status(404).json({"message":"Invalid name signin with auth_v2"})
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}


const createUser=async(req,res)=>{
    const {name,password,email}=req.body;
    const hashedpass=await bcrypt.hash(password,3);
    try{
        
        const response=await usermodel.create({name,password:hashedpass,email})
        let senderData={
            from:"Inte-gem(vasanth)",
            to:response.email,
            subject:"Thanks for Signin ╰(*°▽°*)╯",
            text:`Hi ${response.name} thank you for Signin and partnering with Inte-Gemini to build our community.Do the login in inte gem and you are ready to rock 😉`
        }
        transporter.sendMail(senderData)
        res.status(200).json(response)
    }
    catch(err){
        res.status(400).json(err)
    }
}


const handleVisionPrompt=async(req,res)=>{
    const {prompt,image,mimeType}=req.body;
    const token=req.header("auth")
    try{
        const payload=jwt.verify(token,"vinoth")        
        const response=await usermodel.findOneAndUpdate({name:payload.name},
            {$push:{chat:
                {textprompt:prompt,img:image,mime:mimeType}
            }})

            const model=await genAI.getGenerativeModel({model:"gemini-pro-vision"})
            const data={
                inlineData:{
                    data:image,
                    mimeType:mimeType
                }
            }
    
        const result=await model.generateContent([prompt,data])
            res.status(200).json(result.response.text())
    }
    catch(err){
        res.status(400).json(err)
    }
}

const handleChatPrompt=async(req,res)=>{
    const {prompt}=req.body;
    const token=req.header("auth")
    try{
        const payload=jwt.verify(token,"vinoth")        
        const response=await usermodel.findOneAndUpdate({name:payload.name},
            {$push:{chat:
                {textprompt:prompt}
            }})

            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const result = await model.generateContent(prompt);
            // const responseText = result.response.text().replace(/\n/g, '');
            res.status(200).json(result.response.text()) //{{"response":result.response.text()}}
    }
    catch(err){
        res.status(400).json(err)
    }

}

const deleteAccount=async(req,res)=>{ //<- need to be deleted also in authentication app
    const token=req.header("auth")
    try{
        const payload=jwt.verify(token,"vinoth")
        const response=await usermodel.findOneAndDelete({name:payload.name});

        let senderData={
            from:"Inte-gem(vasanth)",
            to:response.email,
            subject:"Delete Confirmation ಥ_ಥ",
            text:`Hi ${response.name} your account has been succesfully deleted from inte-gemini DB but it available in authentication system DB delete your data in authentication app`
        }
        transporter.sendMail(senderData)

        res.status(200).json(response)
    }
    catch(err){
        res.status(400).json(err);
    }
}

const updatePass=async(req,res)=>{  
    const {name,password}=req.body;
    try{
        const hashedPass=await bcrypt.hash(password,3)
        const response=await usermodel.findOneAndUpdate({name:name},{password:hashedPass})

        let senderData={
            from:"Inte-gem(vasanth)",
            to:response.email,
            subject:"password updated (┬┬﹏┬┬)",
            text:`Hi ${response.name} your account password has been succesfully updated from inte-gemini DB and updated in authentication db`
        }
        transporter.sendMail(senderData)

        res.status(200).json(response)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const getHistory=async(req,res)=>{
    const token=req.header("auth")
    try{
        const payload=jwt.verify(token,"vinoth")
        const response=await usermodel.findOne({name:payload.name})
        res.status(200).json(response.chat) //return a array
    }
    catch(err){
        res.status(400).json(err)
    }
}


const serverStarupCall=async(req,res)=>{
    res.status(200).json({"start":"started"})
}

module.exports={createUser,loginUser,handleVisionPrompt,handleChatPrompt,deleteAccount,updatePass,getHistory,serverStarupCall}