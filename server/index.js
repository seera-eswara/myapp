const express = require('express')
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'loginApp'

const app=express()
app.use(express.json())
const PORT = process.env.PORT||3044

let db = null
const initiateDb = () =>{

  try {
  MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client) => {
  if (error){
      return console.log('Unable to connect')
  }
  else{
 
   db = client.db(databaseName)

app.listen(PORT,() => console.log(`server Started on PORT ${PORT}`))
  }

})
  }
  catch(error) {
    console.log("DB connection failed",error)
  }

}


// DB connection established

initiateDb()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


const isPasswordValid = pswd => {
  if(pswd.length < 8 ){
    return false
  }
  else{
    return true
  }
}


///////////// User Creation

app.post('/createUser', async (req,res) =>{
  const {username, password} = req.body  
// dbResponse = await db.collection('users').findOne({password: "1234"});
dbResponse = await db.collection('users').find({username}).toArray();

console.log(dbResponse)

if(dbResponse.length > 0){
    
    
    res.status(409).send("already exists")

}else{

  if (isPasswordValid(password)){
const encryptedPwd = await bcrypt.hash(password,10)
console.log('encryptedPwd',encryptedPwd)
const dbresponse = await db.collection('users').insertOne({
  username,
  password: encryptedPwd
}) 

res.send("user Created")
    
  }
else{
  res.status(400).send("Please enter password of length 8")
}
 
}
  
})

///////////// User Creation Ended


// user Login with jwtToken

app.post('/login', async (req,res) => {
  console.log('body is',req.body)
  const {username, password} = req.body
  dbResponse = await db.collection('users').findOne({username});
  const isValid =  await bcrypt.compare(password,dbResponse.password)
  
  if(isValid){
    const payload = {username}
    const jwtToken =  jwt.sign(payload,'SECRET KEY')
    console.log('jwt',jwtToken)       
    res.send({jwtToken})
  }
  else{
  res.status(400).send("Invalid password")
  }
})




// middleware

const authenticateToken = (request, response, next) => {
  const reqHeader = request.headers["authorization"];
  let jwtToken;
  if (reqHeader !== undefined) {
    jwtToken = reqHeader.split(" ")[1];
  }

  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "SECRET KEY", (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
  console.log(jwtToken);
};


// user Login with jwtToken End

app.get('/about',authenticateToken, async(req,res) => {
 
res.send('Authenticated')  
  
  
  })


app.put('/update', async (req,res) => {

  console.log(req.body)
  const {username, password} = req.body

  const dbresponse = await db.collection('users').updateOne({username:'durga'},
  {$set: {username: 'babu'} })

  res.send(`created ${dbresponse}`)


})


app.delete('/delete', async (req,res) => {
  console.log(req.body)
  const {username, password} = req.body
  const dbresponse = await db.collection('users').delete(username)
  res.send(`deleted ${dbresponse}`)
})






  module.exports = app