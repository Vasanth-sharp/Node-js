const mongoose=require("mongoose")
const skill=require("./model")

const getSkills=async(req,res)=>{
    try{
        const response=await skill.find({})
        res.status(200).json(response)
    }
    catch(e){
        res.status(400).json(e)
    }
}

const addSkill=async(req,res)=>{
    const {skil}=req.body;
    try{
        const response=await skill.findOneAndUpdate({},
            {$push:{skills:skil}}
            ,{new:true})
        res.status(200).json(response)
    }
    catch(e)
    {
        res.status(400).json(e)
    }
}
module.exports={getSkills,addSkill}