import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true
    },
    followers:[],

    following:[],

    post:[],

    bio:{
        type:String
    },
    social:{
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        }
    }

})

export default mongoose.model('User',userSchema);