import { Usuarios } from '../models/UsuariosSchema.js';
import { NuevotokenUser, tokengenerate } from '../utils/tokengenerate.js';
import { nuevoSecret } from '../utils/tokengenerate.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

//configuración de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bloghibridas@gmail.com',
        pass: 'xqnvrigsjmjvywei',
    }
});

export const forgotPassword = async(req, res) => {
    console.log(req.body);

    const {email} = req.body;
    
    if(!email){
        return res.status(401).json({
            estado: "401",
                mensaje: "Ingresa tu email"
            });
    }

    try{
        //buscar el email en la base de datos
        const mailuser = await Usuarios.findOne({email:email});
        console.log(mailuser);

        //si el email no existe
        const token = jwt.sign({_id: mailuser._id}, nuevoSecret, {expiresIn: "1500s"});
        console.log("token:", token);

        //enviar correo
        const setUserToken = await Usuarios.findByIdAndUpdate({_id: mailuser._id}, {verifyToken: token}, {new: true});
        console.log("setUserToken:", setUserToken);

        if(setUserToken){
            const mailOptions = {
                from: 'bloghibridas@gmail.com',
                to: email,
                subject: "Recuperar contraseña",
                html: `
                <h1>Recuperar contraseña</h1>
                <p>Hola, haz click en el siguiente enlace para recuperar tu contraseña:  </p>
                <p>http://localhost:5173/recuperar-clave/${mailuser._id}/${setUserToken.verifyToken}</p>
                `
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error);

                    return res.status(401).json({
                        estado: "401",
                        Mensaje: "Error al enviar el correo electrónico"
                    });
                }else{
                    console.log("Email  enviado:", info.response);

                    return res.status(201).json({
                        estado: "201",
                        Mensaje: "Correo enviado correctamente"
                    });
                }
            });
        }

        /* console.log("mailOptions:", mailOptions); */

    }catch(error){
        console.log(error);
        return res.status(401).json({
            Estado: "ERROR",
            Mensaje: "Correo electronico no valido"
        });
    }
}

export const verifyUser = async(req, res) => {
    const {id, token} = req.params;
    /* console.log(id, token); */

    try{
        const validUser = await Usuarios.findOne({_id: id, verifyToken: token});
        console.log(validUser); 

        const verifyToken = jwt.verify(token, nuevoSecret);

         if(validUser && verifyToken._id){
            res.status(201).json({
                estado: "201",
                mensaje: "Usuario encontrado"
            });
        } 

    }catch(error){
        console.log(error);
    }

    
}

export const changePassword = async(req, res) => {
    const {id, token} = req.params;
    const {password} = req.body;

    try{
        const validUser = await Usuarios.findOne({_id: id, verifyToken: token});
        /* console.log(validUser); */

        const verifyToken = jwt.verify(token, nuevoSecret);
        /* console.log(verifyToken); */

        if(validUser && verifyToken._id){
            const newPassword = await bcryptjs.hash(password, 10);

            const passwordUser = await Usuarios.findByIdAndUpdate({_id: id}, {password: newPassword}, {new: true});

            if(passwordUser){
                res.status(201).json({
                    estado: "201",
                    mensaje: "Contraseña cambiada correctamente"
                });
            }else{
                res.status(401).json({
                    estado: "401",
                    mensaje: "Error al cambiar la contraseña"
                });
            }
        }
    }catch(error){
        console.log(error);
    }

}