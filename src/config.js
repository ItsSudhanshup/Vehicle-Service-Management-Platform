const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/VindhyaMotors");



//check database connected 

connect.then(() => {
    console.log("Database connected Successfully");
})

.catch(() => {
    console.log("Database not connected");
});

//creat a schema

const LogInSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true

    },
    email:{
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});
//collection part
const collection = new mongoose.model("users",LogInSchema);
module.exports=collection;





