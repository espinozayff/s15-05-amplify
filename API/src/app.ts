import express from 'express'
import apiRouter from './routes/index.router'

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use("/", apiRouter)

export default app;