const db = require('./data/db-config')
const express = require('express')

const router = express.Router()

function getAllUsers() { return db('users') }

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}


router.get('/', async (req, res) => {
    res.json(await getAllUsers())
  })
  
router.post('/', async (req, res) => {
    res.status(201).json(await insertUser(req.body))
  })


  module.exports = router