const express = require ('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}))


//connecting
mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://deD-god:Pf1571378@cluster0.jxvjj.mongodb.net/node?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((result)=>{app.listen(port)
    console.log('db connected')})
    //creating
  const Schema = mongoose.Schema
  const DataType = new Schema({
  title: String,
  body: String,
  date: Date  
  } , {timestamps:true})
  const Web = mongoose.model('Web', DataType) 
  


app.get('/',function(req,res){
  res.send('server is live')
  console.log('server is running')
 })
 
 
app.get('/add',(req,res)=>{
    const web = new Web({ 
        title : 'new blog',
        body: ' more about',
        date : 5
    })
    //saving
    web.save()
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err))
})
app.get('/load',(req,res)=>{
    Web.find()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
}) 
app.get('/delete/:id',(req,res)=>{
  const id =req.params.id
  Web.findByIdAndDelete(id)
  .then(()=>res.send('requested item deleted'))
  .catch((err)=> {throw err})
})

