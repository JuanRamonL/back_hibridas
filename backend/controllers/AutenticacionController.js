import { Usuarios } from '../models/UsuariosSchema.js';
import jwt from 'jsonwebtoken';
import { NuevotokenUser, tokengenerate } from '../utils/tokengenerate.js';
import { nuevoSecret } from '../utils/tokengenerate.js';
import noemailer from 'nodemailer';
import cron from 'node-cron';

//configuración de email
const transporter = noemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bloghibridas@gmail.com',
        pass: 'BlogHibridas2023!',
    }
});

export const register = async(req, res) => {
    const { username, email, password, rol } = req.body;
    try{
        const user = new Usuarios({
            username,
            email, 
            password,
            rol:'user',
            contadorNoticias : 0,
            suscription: false
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

        let rol = user.rol
        let userid = user._id
        let contadorNoticias = user.contadorNoticias
        let suscription = user.suscription

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

        return res.json({token, expiresIn, rol, userid, username, contadorNoticias, suscription});

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

// Resetea el contador de noticias de cada usuario a las 00:00 horas 
const recetearContador = async(req, res) => {
    try{
        // Tarea programada para ejecutar a las 00:00 horas todos los días
        cron.schedule('0 0 * * *', async () => {
            try {
                // Obtener todos los usuarios
                const usuarios = await Usuarios.find().lean();

                // Resetear el contador de noticias de cada usuario
                for (const usuario of usuarios) {
                    usuario.contadorNoticias = 0;
                    await Usuarios.findByIdAndUpdate(usuario._id, usuario);
                }

                console.log('Contador de noticias reseteado para todos los usuarios');
            } catch (error) {
                console.log('Error al resetear el contador de noticias:', error);
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            Estado: "ERROR",
            Mensaje: "Error al obtener el usuario"
        });
    }
}

recetearContador()


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