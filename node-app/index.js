console.log("hello world");
const express = require('express')
const app = express()
const port = 4000


var bodyParser = require('body-parser')
// install npm install corns 
var cors = require('cors')
// install npm install jsonwebtoken
var jwt = require('jsonwebtoken');
// install npm install multer
const multer  = require('multer')
//image displaing code
const path = require('path')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })




app.use('/uploads', express.static(path.join(__dirname, "uploads")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const mongoose = require('mongoose');
app.use(cors())
// install npm install mongoose 
mongoose.connect('mongodb://localhost:27017/');

const User = mongoose.model('User', { username: String , password: String});
const Product = mongoose.model('Product', { pname: String , pdescription: String , pprice : String , pimage : String })

app.get('/', (req, res) => {
  res.send('Hello Honey!')
})

app.post('/signup', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username: username, password:password });
  user.save().then(() => {
    res.send( {message : "success"})
  }).catch(() => {
      res.send({ message: "err"})
  })
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({username : username})
  .then((result) => {
    console.log(result , "user data")
    if(!result){
      res.send({ message: "user not find"})
    }else{
      if( result.password == password){
        const token = jwt.sign({
          data: result
        }, 'MYTOKEN', { expiresIn: '1h' });
        console.log({ message :" password curract"})
        res.send( {message : "find user data" , token : token })
      }
      else{
        res.send( {message : "password worng"})
      }

    }

  }).catch(() => { 
      res.send({ message: "err"})
  })
})

app.post('/add-product',upload.single('pimage'), (req, res) => {
//   console.log(req.body)
 const pname = req.body.pname;
 const pdescription = req.body. pdescription;
 const pprice = req.body.pprice;
 const pimage = req.file.path;
 const product = new Product({pname , pdescription ,  pprice , pimage})
  product.save()
  .then(() =>{
    res.send({message:"product uploaded"})
  })
  .catch(() =>{
    res.send({message : "server err"})
  })

})

app.get('/get-product', (req , res ) =>{

    Product.find()
    .then((result) =>{
      console.log(result , "user data")
      res.send({message : "success" , product : result })
    }) 
    .catch( () =>{
    res.send({message : "server err"})
    })
} )

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})