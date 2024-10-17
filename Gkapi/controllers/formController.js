const xlsx=require("xlsx")
const fs=require("fs")
require("dotenv").config()

const formData=(req,res)=>{
    // const {name,email,phone,message}=req.body;
    const filepath=process.env.FILE_PATH
    try{
        if(fs.existsSync(filepath)){
            const workbook=xlsx.readFile(filepath)
            const worksheet=workbook.Sheets["customer"]
            let existData=xlsx.utils.sheet_to_json(worksheet)
            existData=[...existData,req.body]
            const newWorkSheet=xlsx.utils.json_to_sheet(existData)
            workbook.Sheets["customer"]=newWorkSheet
            xlsx.writeFile(workbook,filepath)
            res.status(200).json({msg:"data appended"})
        }else{
            const worksheet=xlsx.utils.json_to_sheet([req.body])
            const workbook=xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook,worksheet,"customer")
            xlsx.writeFile(workbook,filepath)
            res.status(200).json({msg:"new file created and data pushed"})
        }
    }catch(err){
        res.status(400).json({msg:err.message})
    }
}

module.exports={formData}