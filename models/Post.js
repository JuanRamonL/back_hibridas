import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario", // usar nombre que pusiste en el export del modelo
        required: false,
    },
    categories: {
        type: Array,
        required: false,
    },
    }, { timestamps: true });   

export const Post = mongoose.model("Post", PostSchema);