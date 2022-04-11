const { Router } = require('express')
const { Game } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const logger = require('../../utils/logger')



const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Game.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:gameId', (req, res) => {
  try {
    res.status(200).json(Game.getById(req.params.gameId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    logger.info('pass post')
    logger.info(req.body)
    const game = Game.create({ ...req.body })
    logger.info('pass apres create')

    res.status(201).json(game)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:gameId', (req, res) => {
  try {
    res.status(200).json(Game.update(req.params.gameId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:gameId', (req, res) => {
  try {
    Game.delete(req.params.gameId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
