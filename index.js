const express=require('express')

const {connection}=require('./config/db')
const {userRouter}=require('./routes/user.Routes')
const {postRouter}=require('./routes/data.Routes')

const {authentication}=require('./middlewares/authentication')
require('dotenv').config()

const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())


app.get('/', (req,res) =>{
    res.send('Welcome to Home Page')
})

app.use('/users', userRouter)
app.use(authentication)
app.use('/posts', postRouter)

app.listen(process.env.port, async() =>{
    try {
        await connection
        console.log('Connected to DB')
    } catch (err) {
        console.log(err.message)
    }
    console.log(`Server is running at port http://localhost:${process.env.port}`);
})

