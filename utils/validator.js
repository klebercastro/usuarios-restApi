const { body, validationResult } = require('express-validator');
const error = require('./error');

module.exports = {
    userValidation: () => {
        return [
            body('_name', 'O campo name é inválido.').notEmpty(),
            body('_email', 'O campo email é inválido.').isEmail(), 
            body('_password', 'A senha deve ter no mínimo 6 caracteres.').isLength({min: 6})
        ]
    },
    validation: (req, res, next) => {
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {
            return next()
        }
        return error.send(errors, req, res);    
    }
}