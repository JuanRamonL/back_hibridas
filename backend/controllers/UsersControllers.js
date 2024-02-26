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

export const modificarcontadorNoticias = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de los parámetros de la URL
        const { contadorNoticias } = req.body; // Obtener contadorNoticias del cuerpo de la solicitud
        console.log(req.body);
        
        const user = await Usuarios.findByIdAndUpdate(id, { contadorNoticias });
        // Suponiendo que findByIdAndUpdate es una función válida para actualizar el usuario
        // Pero debes implementarla o usar la que corresponda a tu base de datos
        
        res.status(200).json({ Estado: "Contador de noticias actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Estado: "No se pudo actualizar el contador de noticias" });
    }
};


export const eliminar = (req, res) => {
    res.json({Estado: "OK"});
};