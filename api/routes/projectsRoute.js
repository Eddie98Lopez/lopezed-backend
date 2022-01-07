const express = require('express')
const { addResource } = require('../dbHelpers')
const restricted = require('../middleware/restricted')

const router = express.Router()


router.get('/', async(req,res)=>{
    try{
        res.status(200).json('Hello World')
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/:id', async(req,res)=>{
    try{
        res.status(200).json('Hello World')
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',restricted, async(req,res)=>{
    try{
        res.status(200).json('Hello World')
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id',restricted, async(req,res)=>{
    try{
        res.status(200).json('Hello World')
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/', restricted,async(req,res)=>{
    try{
        const added = await addResource('projects',req.body)
        console.log(added)
        res.status(200).json('Hello World')
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router