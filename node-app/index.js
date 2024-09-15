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
const { readSync } = require('fs');
const { type } = require('os');
const { Console } = require('console');
// const { default: categories } = require('../sell_and_buy/src/components/Categories');
app.use(cors())
// install npm install mongoose 
mongoose.connect('mongodb://localhost:27017/');

const User = mongoose.model('User', {
   username: String ,
   password: String,
   mobileno: String,
   email: String,
   likedProducts:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
  });




const schema = new mongoose.Schema({
  pname: String,
  pcategory: String,
  pdescription: String,
  pprice: Number, // Changed from String to Number
  pimage: String,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming there's a User model
  pLoc: {
    type: {
      type: String,
      enum: ['Point'], // Capitalized 'Point' to match GeoJSON specification
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true, // Ensure coordinates are provided
      validate: {
        validator: function(arr) {
          return arr.length === 2; // Validate that there are exactly 2 coordinates
        },
        message: 'Coordinates should be an array of 2 numbers'
      }
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Ensure indexing for GeoJSON
schema.index({ pLoc: '2dsphere' });

const Product = mongoose.model('Product', schema);

app.get('/', (req, res) => {
  res.send('Hello Honey!')
})

app.post('/signup', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const mobileno = req.body.mobileno;
  const email = req.body.email;

  const user = new User({ username: username, password:password  ,  mobileno :mobileno , email:email});
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
        res.send( {message : "find user data" , token : token , userId : result._id })
      }
      else{
        res.send( {message : "password worng"})
      }

    }

  }).catch(() => { 
      res.send({ message: "err"})
  })
})

app.post('/like-product', (req, res)=>{
  let productId = req.body.productId;
  let userId = req.body.userId
 console.log(req.body)
  User.updateOne({_id: userId} , {$addToSet : {likedProducts : productId }})
  .then(() =>{
    res.send({message:"Liked"})
  })
  .catch(() =>{
    res.send({message : "server err"})
  })

})

app.post('/add-product',upload.single('pimage'), (req, res) => {
console.log(req.body)


 const plat = req.body.Latitude;
 const plong = req.body.Longitude;
 const pname = req.body.pname
 const pcategory = req.body.pcategory;
 const pdescription = req.body. pdescription;
 const pprice = req.body.pprice;
 const pimage = req.file.path;
 const addedBy = req.body.userId;
 console.log(req.body.userId)
 console.log({pLoc : {type:'Point' , coordinates:[ plat , plong]}})
 const product = new Product({pname , pcategory , pdescription ,  pprice , pimage , addedBy ,
  pLoc : {type:'Point' , coordinates:[ plat , plong]}
 })
  product.save()
  .then(() =>{
    res.send({message:"product uploaded"})
  })
  .catch(() =>{
    res.send({message : "server err"})
  })

})

app.get('/get-product', (req , res ) =>{
   
  const catname = req.query.catname
 let _f ={}
 if(catname){
  _f ={pcategory:catname}
 }
  console.log(catname)
    Product.find(_f)
    .then((result) =>{
      console.log(result , "user data")
      res.send({message : "success" , product : result })
    }) 
    .catch( () =>{
    res.send({message : "server err"})
    })
} )

app.get('/get-user/:uId' , (req , res) =>{
  const addedBy = req.params.uId
  User.findOne({ _id : addedBy})
    .then((result) =>{
      console.log(result , "user data")
      res.send({message : "success" , User : {
        email:result.email ,
         mobileno:result.mobileno ,
          username : result.username
        }})
    }) 
    .catch( () =>{
    res.send({message : "server err"})
    })
})

app.get('/search', (req , res) => {
  let search = req.query.search
  let longitude = req.query.loc.split(',')[0]
  let latitude = req.query.loc.split(',')[1]

  console.log(search)
  Product.find({
  //  $or:[
    //  { pname: { $regex: search }},
    //  {pdescription : {$regex : search}},
    //  {pcategory : {$regex : search}}
    // ],
    pname: { $regex: search, $options: 'i' },
    pLoc: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [Number(longitude), Number(latitude)],
        },
        $maxDistance: 500 * 1000,  // Convert radius from kilometers to meters
      },
    },
    
  })
  .then((result) =>{
    console.log(result , "user data")
    res.send({message : "success" , product : result })
  }) 
  .catch( () =>{
  res.send({message : "server err"})
  })
})

app.get('/get-products/:pId', (req , res ) =>{
  console.log(req.params)
  Product.findOne({_id : req.params.pId})
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