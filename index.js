const fs=require("fs/promises")
const express=require('express')
const cors=require("cors")
const _=require("lodash")
const {v4: uuid}=require("uuid")
const { formatWithOptions } = require("util")

const app=express()

app.use(express.json())

app.get("/outfit",(req,res)=>{
    const tops=["Black","White","Orange"]
    const jeans=["Black","Green","Grey","Navy"]
    const shoes=["Pink","Purple","Yellow"]

    res.json({
        top:_.sample(tops),
        jeans:_.sample(jeans),
        shoes:_.sample(shoes)
    })
})

app.post("/comments",async(req,res)=>{
    const id=uuid()
const content=req.body.content

if(!content){
    return res.sendStatus(400)
}

await fs.mkdir('data/comments',{recursive:true})
await fs.writeFile(`data/comments/${id}.txt`,content)
    
    res.sendStatus(201)
})

app.listen(3000,()=>console.log("API Server is running..."))