const express=require("express");
const app=express();
const mongoose=require("mongoose");
require('dotenv').config()
const routes=require("./routes/primaryRoute")
const cors=require("cors")

app.use(express.json());
app.use(cors());

mongoose
.connect("mongodb+srv://vinoth:vinoth@cluster0.1r4crk1.mongodb.net/?retryWrites=true&w=majority")
.then(()=>app.listen(4000,()=>{
    console.log("DB CONNECTED AND PORT ASSINGED")
}))
.catch(err=>console.log(err));

app.use("/api",routes);
