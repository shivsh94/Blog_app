import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author_name :{
        type: String,
        required: true
    },
    author_id: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

export default mongoose.model('Blog', blogSchema);