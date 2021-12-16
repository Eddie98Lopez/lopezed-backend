const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routes/userRoute')



const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', userRouter)



module.exports = server
