const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router()
var jsonParser = bodyParser.json()
const data =require('../model/data')
const bcrypt = require('bcrypt')

router.get('/',async(req,res) => {

    try{
        const users = await data.find()
        res.send(users)
    } catch(err)
    {
        res.send('Error '+err)
    }
})

router.post('/',jsonParser,async(req,res) => {

    const hashedPassword = await bcrypt.hash(req.body.password,10)

    const user = new data({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try{
        const a1 = await user.save()
        res.redirect('/login')
    }catch(err)
    {
        res.send('error')
    }
})

module.exports =router