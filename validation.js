const Joi = require('joi');

exports.registerValidate = (data) => {
    const registerSchema = Joi.object({
        email: Joi.string()
            .required()
            .min(3)
            .max(255),

        name: Joi.string()
            .required()
            .min(3)
            .max(255),
        
        password: Joi.string()
            .required()
            .min(8)
            .max(1025)    
    });

    return registerSchema.validate(data);
}

exports.loginValidate = (data) => {
    const registerSchema = Joi.object({
        email: Joi.string()
            .required()
            .min(3)
            .max(255),
        
        password: Joi.string()
            .required()
            .min(8)
            .max(1025)    
    });

    return registerSchema.validate(data);
}


