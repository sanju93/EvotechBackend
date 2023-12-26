import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    Name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    surveyforms : [
        {
            type : String,
            ref : 'Survey'
        }
    ]
},{
    timestamps : true
});

let User = mongoose.model('User',userSchema);

export default User;
