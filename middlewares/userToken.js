import jwt from 'jsonwebtoken';
import { secret, verificacionDeErrores } from '../utils/tokengenerate.js';


export const tokenUser = (req, res, next) => {
    try{

        let token = req.headers.authorization;

        console.log(token);
        if(!token) {
            throw new Error('No hay token, usa Bearer'); //!Mensaje de error
        }

        token = token.split(' ')[1];

        const {uid} = jwt.verify(token, secret);

        req.uid = uid;

        next();
    }catch(error){
        console.log(error.message);
        

        return res.status(401).json({
            Estado: "ERROR",
            Mensaje: verificacionDeErrores[error.message] || 'No autorizado'
        });
    }
}