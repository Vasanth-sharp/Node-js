const express=require("express")
const app=express()
const xlsx=require("xlsx")
const fs=require("fs")
const cors=require("cors")

app.use(cors())
app.use(express.json())
app.listen(4000,()=>{
    console.log("listenig")
})

app.post("/",(req,res)=>{
    if(fs.existsSync("users.xlsx")){
        try{
        const workbook=xlsx.readFile("users.xlsx")
        const worksheet=workbook.Sheets["user"]
        let existData=xlsx.utils.sheet_to_json(worksheet)
        existData=[...existData,req.body]
        const newWorkSheet=xlsx.utils.json_to_sheet(existData)
        workbook.Sheets["user"]=newWorkSheet
        xlsx.writeFile(workbook,"users.xlsx")
        res.status(200).json({message:"Data appended"})
        }
        catch(e){
            res.status(500).json(e.message)
        }
    }else{
       try{
        const worksheet=xlsx.utils.json_to_sheet([req.body])
        const workbook=xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook,worksheet,"user")
        xlsx.writeFile(workbook,"users.xlsx")
        res.status(200).json({message:"new file created and data added"})
       }
       catch(e){
        res.status(500).json(e.message)
       }
    }
})
