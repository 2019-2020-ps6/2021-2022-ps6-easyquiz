const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const SettingRouter = require('./settings')
const GameRouter = require('./game')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/settings', SettingRouter)
router.use('/game', GameRouter)


module.exports = router
