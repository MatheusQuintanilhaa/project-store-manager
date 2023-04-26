const Joi = require('joi');

const productName = Joi.string().min(5).required();
// const number = Joi.number().integer().required();

const validateName = (name) => {
  const { error } = productName.validate(name);

  if (error) {
    if (error.message === '"value" is required') {
      return { type: 400, message: error.message.replace('value', 'name') };
    }

    return { type: 422, message: error.message.replace('value', 'name') };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateName,
};
