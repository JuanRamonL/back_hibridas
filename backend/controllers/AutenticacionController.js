import { Usuarios } from '../models/UsuariosSchema.js';
import jwt from 'jsonwebtoken';
import { NuevotokenUser, tokengenerate } from '../utils/tokengenerate.js';
import { nuevoSecret } from '../utils/tokengenerate.js';

export const register = async(req, res) => {
    const {username, email, password, rol  } = req.body;
    try{
        const user = new Usuarios({
            username,
            email, 
            password,
            rol,
        });
        await user.save();

        const {token, expiresIn} = tokengenerate(user._id);
        
        NuevotokenUser(user._id, res);


        return res.status(201).json({token, expiresIn});

    }catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({
                Estado: "ERROR",
                Mensaje: "El email ya se encuentra registrado"
            });
        }
        return  res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al registrar el usuario"
        });
    };
};

export const login =  async(req, res) => {
    try{
        const { username, password } = req.body;
        
        let user = await Usuarios.findOne({username});

        if(!user){
            return res.status(403).json({
                Estado: "ERROR",
                Mensaje: "Usuario no encontrado"
            });
        }
        const hayCoincidencia = await user.comparePassword(password);

        if(!hayCoincidencia){
            return res.status(403).json({
                Estado: "ERROR",
                Mensaje: "Contraseña incorrecta"
            });
        }
        const {token, expiresIn} = tokengenerate(user._id);
        
        NuevotokenUser(user._id, res); //Utilizamos la nuevav cookie para el refreshToken

        return res.json({token, expiresIn});

    }catch(error){
        console.log(error);
        return res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al loguear el usuario"
        });
    };
};

export const logout = async(req, res) => {
    try{
        res.clearCookie('refreshToken');
        return res.status(200).json({
            Estado: "OK",
            Mensaje: "Usuario deslogueado correctamente"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al desloguear el usuario"
        });
    };
};

export const protectedRoute = async(req, res) => {
    try{
        const user = await Usuarios.findById(req.uid).lean();
        return res.json({email: user.email, nombre: user.nombre, apellido: user.apellido, rol: user.rol});

    }catch(error){
        console.log(error);
        return res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al obtener el usuario"
        });
    }
}

export const refreshToken = (req, res) => {
    try{
        const refreshTokencookie = req.cookies.refreshToken;
        if(!refreshTokencookie){
            throw new Error('No hay token');
        }

        const {uid} = jwt.verify(refreshTokencookie, nuevoSecret);

        const {token, expiresIn} = tokengenerate(uid);

        return res.json({token, expiresIn});

    }catch(error){
        console.log(error);

        const verificacionDeErrores = {
            ['jwt malformed']: ' El token no es válido',
            ['jwt expired']: ' El token expiró',
            ['invalid signature']: ' La firma del JWT no es valida ',
            ['invalid token']: ' El token no es válido',
            ['no Bearer']: ' Utiliza formato Bearer',
        };
        return res.status(401).json({
            Estado: "ERROR",
            Mensaje: verificacionDeErrores[error.message] || 'No autorizado'
        });
    }
}