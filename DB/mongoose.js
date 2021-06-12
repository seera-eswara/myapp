const mongoose = require('mongoose')

const connectionUrl = "mongodb://127.0.0.1:27017/loginAppDB"
mongoose.connect(connectionUrl,{useNewUrlParser:true,
    useCreateIndex:true
})

const UserPractise = mongoose.model('User',{
name: {
type: String,
required: true
},age:{
type: Number,validate(value){
if(value<0){
    throw new Error('Age must be positive number')
}
}
}})

const me = new UserPractise({
    name: 'eswar',
    age: -1
})

me.save().then(() =>{
console.log(me)

})
.catch((error) => {
    console.log('Error!',error)
})