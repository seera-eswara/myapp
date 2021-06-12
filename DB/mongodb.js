const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'loginApp'

MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client) => {
    if (error){
        return console.log('Unable to connect')
    }
    else{
 const db = client.db(databaseName)


 db.collection('users').insertOne({
     name: 'eswar',
     password: '1234'
 }, (error,result)  =>{
     
 }
 
 )
    
}

})


