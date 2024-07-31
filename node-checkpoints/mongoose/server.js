import express from "express";
import mongoose from "mongoose";
import Contact from "./Module/contactForme.js";

const app = express()
const PORT= 5000
app.use(express.json())

mongoose
    .connect("mongodb://localhost:27017")
    .then(()=>console.log("DB connetced"))
    .catch((err)=console.log("DB not connetced"))

app.get("/",async(req,res)=>{
    try {
        const dataAll = await Contact.find()
        res.status(200).send({msg: "new contact list",dataAll})
    } catch (error) {
        res.status(500).send({msg:"invalid request",error})
    }
})

app.post("/add", (req,res)=>{
    try {
        const myContactList = new Contact(req.body);
        myContactList.save();
        res 
        .status(200)
        .send({msg: "new contact list",myContactList})
    } catch (error) {
        res.status(500).send({msg:"invalid request",error})
    }
})

app.listen(PORT,(err)=>{
    if (err) throw console.log("error server",err);
    console.log("server is runnig on http://localhost:${PORT}")
})