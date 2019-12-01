const express=require("express")
const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/devconnect",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Mongodb connected")
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.use(express.json({extended:true}))

app.use("/api/users",require("./routes/api/users"))
app.use("/api/posts",require("./routes/api/posts"))
app.use("/api/auth",require("./routes/api/auth"))
app.use("/api/profile",require("./routes/api/profile"))



const PORT=process.env.PORT || 7211
app.listen(PORT,()=>console.log(`server started on port ${PORT}`))