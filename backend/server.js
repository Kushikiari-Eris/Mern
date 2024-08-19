const express = require('express') //pang setup ng server
const mongoose = require('mongoose') // para mapadali comonnect sa MongoDb
const cors = require('cors')  //para sa API, para di masyadong magulo
const bodyParser = require('body-parser') //para ma parse yung data into json
const bcrypt = require('bcrypt') // para ma hash yung password    
const jwt = require('jsonwebtoken') //para siyang cookie, basta diko pa ma gets pero cookie ata talaga to
//schema
const User = require('./models/userSchema')//galing ito sa userSchema na file na ginawa

const SECRET_KEY = 'secretkey'


//connect to express
const app = express()

//connect MongoDb
const dbURL = 'mongodb+srv://kushikiari6:7MayX3FNiMWa6H1V@cluster0.tba2e.mongodb.net/UsersDb?retryWrites=true&w=majority&appName=Cluster0'
mongoose
.connect(dbURL,{
   
})
.then(() => {
    app.listen(3001, () => {
        console.log('Server is Connected to Port 3001 and Connected to MongoDb')
    })
})
.catch((error) => {
    console.log('Unable to Connect to Server and MongoDb')
});
//middleware
app.use(bodyParser.json())
app.use(cors())




//routes
//USER REGISTRATION
//POST REGISTRATION
app.post('/register', async (req, res) =>{
    try{
        const { email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User Created Successfully'})
    }
    catch (error) {
        res.status(500).json({ error: 'Error Signing Up' })
    }
})

//GET REGISTRATION
app.get('/register', async (req, res) => {
    try{
        const users = await User.find()
        res.status(201).json(users)
    }
    catch (error){
        res.status(501).json({error: 'Unable to get users'})
    }
})

//GET LOGIN
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        if(!user) {
            return res.status(401).json({ error: 'Invalid Credentials'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid Credentials'})
        }
        const token = jwt.sign({ userId : user._id}, SECRET_KEY, { expiresIn: '1hr'})
        res.json({ message: 'Login Successful'})
    }
    catch (error) {
        res.status(500).json({ error: 'Error logging In'})
    }
})