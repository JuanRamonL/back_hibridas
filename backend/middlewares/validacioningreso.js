import axios from 'axios';
import { validationResult, body } from 'express-validator';

export const validacionesUsuarios = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const bodyLinkValidator = [
    body('longLink').trim().notEmpty().withMessage('El link es obligatorio').custom(async (value, {req}) => {
        try{
            if(!value.startsWith('https://')){
                value = 'https://' + value;
            }
            await axios.get(value);
            console.log(value);
            
            return value;
            
        }catch(error){
            throw new Error('El link no es válido. ');
        }
    }),

    validacionesUsuarios
];

export const registro = [ 
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('email').notEmpty().withMessage('El email es obligatorio'),
        body('email').trim().isEmail().withMessage('El email no es válido'),
        body('password').notEmpty().withMessage('El password es obligatorio'),
        body('password').isLength({min: 6}).withMessage('El password debe tener al menos 6 caracteres'),
        validacionesUsuarios
    ]

export const loginmd = [
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('password').notEmpty().withMessage('El password es obligatorio'),
        validacionesUsuarios, 
    ]