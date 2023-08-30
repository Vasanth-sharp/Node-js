const model=require("../models/primaryModel")
const mongoose=require("mongoose")


const create=async(req,res)=>{
    const {title,body}=req.body;
    try{
        const post=await model.create({title,body})
        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(400).json({Error:err})
    }
}

const readall=async(req,res)=>{
    try{
        const getall= await model.find({})
        res.status(200).json(getall)
    }
    catch(err)
    {
        res.status(400).json({Error:err})
    }
}

const read=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({Error:"In Valid ID"})
    }
    try{
        const get= await model.findById(id)
        res.status(200).json(get)
    }
    catch(err)
    {
        res.status(400).json({Error:err})
    }
}

const update=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({Error:"In Valid ID"})
    }
    try{
        const patch=await model.findByIdAndUpdate({
            _id:id
        },
        {
            ...req.body,
        })
        res.status(200).json(patch)
    }
    catch(err){
        res.status(400).json({Error:err})
    }
}

const delet=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({Error:"In Valid ID"})
    }
    try{
        const deletee= await model.findByIdAndDelete(id)
        res.status(200).json(deletee)
    }
    catch(err)
    {
        res.status(404).json({Error:err})
    }
}



module.exports={create,readall,read,delet,update}