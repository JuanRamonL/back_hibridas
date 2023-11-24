import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const usuariosSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trym: true,
        unique: true,
    },
    password: {
        required: true,
        type: String
    },
    rol: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
        default:"",
    },
    }, { timestamps: true}
);

usuariosSchema.pre("save", async function(next) {

    const usuario = this;

    if(!usuario.isModified("password")){
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(usuario.password, salt);
        next();
        
    }catch(error){
        console.log(error);
        throw new Error("Error al encriptar la contraseña");
    }
    
});

usuariosSchema.methods.comparePassword = async function(sendPassword) {
    try {
        return await bcryptjs.compare(sendPassword, this.password);
    }catch(error){
        console.log(error);
        throw new Error("La contraseña es incorrecta");
    }
};

export const Usuarios = mongoose.model("usuario", usuariosSchema);
