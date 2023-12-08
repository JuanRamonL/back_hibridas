import {Usuarios} from '../models/UsuariosSchema.js';

export const list = async (req, res) => {
    const users = await Usuarios.find();
    res.json({
        seccess: true,
        users
    });
};

export const usuariosPorId = async (req, res) => {
    const {id} = req.params;
    const user = await Usuarios.findById(id);
    res.json({
        seccess: true,
        user
    });
};

export const modificar = async (req, res) => {
    try {

        const { id } = req.params
        
        const { username, email, rol, profilePic } = req.body

        const user = await Usuarios.findByIdAndUpdate(id, { username, email, rol, profilePic })

        await user.save()
        
        res.status(200).json({Estado: "Usuario modificado exitosamente"});
    } catch (error) {
        res.status(500).json({ Estado: "No se pudo modificar el usuario" })
    }
};

export const eliminar = (req, res) => {
    res.json({Estado: "OK"});
};