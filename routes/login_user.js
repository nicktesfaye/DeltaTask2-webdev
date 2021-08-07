const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router()
var jsonParser = bodyParser.json()
const data =require('../model/data')
const passport = require('passport')

router.get('/',async(req,res) => {

    try{
        const users = await data.find()
        res.send(users)
    } catch(err)
    {
        res.send('Error '+err)
    }
})

router.post('/',jsonParser,passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/login',
    failureFlash:true
}))

module.exports =router