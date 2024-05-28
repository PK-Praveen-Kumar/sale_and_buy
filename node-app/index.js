console.log("hello world");

// install npm install mongoose 
// install npm install corns 
// install npm install jsonwebtoken

const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var jwt = require('jsonwebtoken');
const app = express()
const port = 4000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const mongoose = require('mongoose');
app.use(cors())

mongoose.connect('mongodb://localhost:27017/');

const User = mongoose.model('User', { username: String , password: String});

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

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})