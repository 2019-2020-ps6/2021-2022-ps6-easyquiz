const { Router } = require('express')

const { Setting } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')


const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Setting.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const choice = Setting.create({ ...req.body })
    res.status(201).json(choice)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
