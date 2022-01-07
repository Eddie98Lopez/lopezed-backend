const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routes/authRoute')
const messagesRouter = require('./routes/messagesRoute')
const projectsRouter= require('./routes/projectsRoute')



const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', userRouter)
server.use('/api/messages',messagesRouter)
server.use('/api/projects',projectsRouter)



module.exports = server
