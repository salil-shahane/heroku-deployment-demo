const Joi = require('@hapi/joi');

class Validation {
    static validateRegistrationData(data) {
        const joiSchema = {
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        };
        return Joi.validate(data, joiSchema);
    }
}

module.exports = Validation;