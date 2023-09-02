const express=require("express");
const app=express();
const mongoose=require("mongoose");
require('dotenv').config()
const routes=require("./routes/primaryRoute")
const cors=require("cors")

app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.MONGO_URI)
.then(()=>app.listen(process.env.PORT,()=>{
    console.log("DB CONNECTED AND PORT ASSINGED")
}))
.catch(err=>console.log(err));

app.use("/api",routes);
