if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb://localhost/deltaTask3'
const passport = require('passport')
const initializePassport = require('./passport_config')
const flash = require('express-flash')
const session = require('express-session')


initializePassport(
    passport,
    email =>  data.find(user => user.email === email),
    id => data.find(user => user.id === id)
)


mongoose.connect(url,{useNewUrlParser: true})
const con = mongoose.connection
con.on('open',() =>{
    console.log("connected...")
})

const user =require('./routes/user')
const login_user = require('./routes/login_user')
const data = require('./model/data')


app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(express.json())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave:false.session,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




app.get('/',(req,res)=>{
res.render('index.ejs')
})

app.get('/login',(req,res)=>{
res.render('login.ejs')
})

app.get('/register',(req,res)=>{
res.render('register.ejs')
})


app.use('/users',user)
app.use('/logData',login_user)

app.listen(3000, ()=>{
    console.log('server started')
})