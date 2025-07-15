require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const routes=require('./routes')
const cookieParser=require('cookie-parser')

const app=express()

// env constants
const PORT=process.env.PORT || 5000
const DB_URL=process.env.DB_URL ||''

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(routes)


async function start(){
    try{
        await mongoose.connect(DB_URL).then(()=>{
            console.log('MongoDB Connected')
        }).catch(err=>{
            console.log('MongoDB connect error: '+err)
        })
        app.listen(PORT,()=>{
        console.log(`Server has been started on port: ${PORT}...`)
        })
    }catch (e) {
        console.log(e)
    }
}

start()