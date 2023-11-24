import jwt from 'jsonwebtoken';


export const secret = "Juan&Ramon&Lopez&40060164&DWN4B";
export const nuevoSecret = "Sabrina&Lopez&40060164&DWN4B";


export const tokengenerate = (uid) => {
    const expiresIn = 60 * 15;
    try {
        const token = jwt.sign( {uid}, secret, {
            expiresIn: expiresIn  
        });
        return {token, expiresIn};
        
    }catch(error){
        console.log(error);
        return null;
    }
    
}

export const NuevotokenUser = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign( {uid}, nuevoSecret, {expiresIn});
        res.cookie('refreshToken', refreshToken, {  
            //httpOnly: true,
            //secure: false,
            expires: new Date(Date.now() + expiresIn * 1000),
        });
        
    }catch(error){
        console.log(error);
    }
    
}

export const verificacionDeErrores = {
    ['jwt malformed']: ' El token no es válido',
    ['jwt expired']: ' El token expiró',
    ['invalid signature']: ' La firma del JWT no es valida ',
    ['invalid token']: ' El token no es válido',
    ['no Bearer']: ' Utiliza formato Bearer',
}
