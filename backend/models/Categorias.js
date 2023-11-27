import mongoose from "mongoose";

const categoriasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    }, { timestamps: true });   

export const Categorias = mongoose.model("categorias", categoriasSchema);