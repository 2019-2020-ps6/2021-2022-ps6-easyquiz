const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

const DiseaseEnum = {
  // ALZHEIMER: 'alzheimer',
  CECITE: 'cecite',
  CATARACTE: 'cataracte',
  ADMIN: 'admin',
}

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  // disease: DiseaseEnum.required(),
  // birthdate: Date,
})
