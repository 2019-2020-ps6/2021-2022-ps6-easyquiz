const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Setting', {
  Id: Joi.number().required(),
  urlImage: Joi.string(),
  buttonColor: Joi.string().required(),
  pageBackGround: Joi.string().required(),
  questionBackGround: Joi.string().required(),
})
