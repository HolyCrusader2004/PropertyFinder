const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const port = 3010
mongoose.connect(process.env.MONGO_URL,{
    dbName:'PropertyFinder',
}).then(()=>{
    app.listen(port, ()=>{
        console.log(`server port ${port}`)
    })
}).catch((err) => console.log(err))

const authRoute = require('./routes/auth')
const propertyRoute = require('./routes/property')
const userRoute = require('./routes/user')

app.use('/property', propertyRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)
