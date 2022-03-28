const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
  alzheimerOk: Joi.boolean().required(),
  ceciteOk: Joi.boolean().required(),
  cataracteOk: Joi.boolean().required(),
})
