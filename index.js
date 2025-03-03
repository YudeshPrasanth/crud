const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/User')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/crud")

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name:  req.body.name,
        email: req.body.email,
        age: req.body.age})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err=>res.json(err))
})

app.post("/create",(req,res)=>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>
console.log("server is running"))