const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const User = require('../models/user')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/userProfilePictures/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.post('/register', upload.single('profileImage'), async (req, res) => {
  
    try{
        const {firstName, lastName, email, password, confirmPassword} = req.body
        const profileImage = req.file

        if(!profileImage){
            return res.status(400).send("No file uploaded")
        }

        if(firstName.trim().length === 0 || lastName.trim().length === 0){
            return res.status(400).json({message: 'the first name / last name should have at least 4 characters'})
        }

        if(!email.includes('@')){
            return res.status(400).json({message: 'invalid email'})
        }

        if(password.length < 6){
            return res.status(400).json({message: 'password should have at least 6 characters'})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message: "passwords don't match"})   
        }
        const profileImagePath = profileImage.path
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: 'user already exists'})
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImage:profileImagePath
        })

        await newUser.save()
        res.status(200).json({message: 'User saved successfully', user: newUser})
    }catch(err){
        res.status(400).json({message:'registration failed', error: err.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        // console.log(email)
        // console.log(password)
        
        if(!email.includes('@')){
            return res.status(400).json({message: 'invalid email'})
        }
        if(password.length < 6){
            return res.status(400).json({message: 'password should have at least 6 characters'})
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({message: 'user does not exist'})
        }
        const match = await bcrypt.compare(password, existingUser.password)
        if(!match){
            return res.status(400).json({message: 'invalid credentials'})
        }
        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET)

        res.status(200).json({token, user:existingUser})
    } catch (error) {
        res.status(500).json({message: 'login failed', error: error.message})
    }
})

module.exports = router
