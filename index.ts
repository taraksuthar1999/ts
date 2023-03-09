import express from 'express'
import { connectToDatabase } from './src/services/database.service'
import { gamesRouter } from './src/routes/games.router'
const port = process.env.PORT || 3333
const app = express()
connectToDatabase().then(()=>{
    app.use(express.json())
    app.use('/games',gamesRouter)
    app.listen(port,()=>{
        console.log(`app running on port: ${port}...`)
    })
}).catch((error: Error)=>{
    console.error('error occurred ',error)
    process.exit()
})
