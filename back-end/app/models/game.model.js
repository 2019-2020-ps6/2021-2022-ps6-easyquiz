const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  quizId: Joi.string().required(),
  userId: Joi.string().required(),
  nbQuestion: Joi.number().required(),
  correct: Joi.number().required(),
  currentQuestion: Joi.number().required(),
})
