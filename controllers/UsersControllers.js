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

export const modificar = (req, res) => {
    res.json({Estado: "OK"});
};

export const eliminar = (req, res) => {
    res.json({Estado: "OK"});
};