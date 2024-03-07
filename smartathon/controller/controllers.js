const mongoose=require("mongoose")
const documentmodel = require('../model/models')


    const post =  async (req, res) => {

        const newEmployeeData = req.body; 
        
    
        try {
            const data = await documentmodel.create(newEmployeeData);
            res.status(200).json(data)
        } catch (error) {
            console.error("Error creating employee:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    const get = async (req,res)=>{
        try{
            const data = await documentmodel.find({})
            res.status(200).json(data);
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    }

    const apppatch = async (req,res) =>{
        const id = req.params.id
        const obj = req.body
        
        try{
            const data = await documentmodel.findOneAndUpdate({id},{$push:{application:obj}})
            res.status(200).json(data)
        }
        catch(err){
            res.status(500).json({err:err.message})
        }
    }

    const patch = async (req,res) =>{
        const id = req.params.id
        const obj = req.body
        obj.emp_id = id
        try{
            const data = await documentmodel.findOneAndUpdate({id},{$push:{posted:obj}})
            res.status(200).json(data)
        }
        catch(err){
            res.status(500).json({err:err.message})
        }
    }

    

module.exports={post,get,patch,apppatch}