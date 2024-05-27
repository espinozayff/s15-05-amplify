import express from 'express'
import albumsRoutes from "./routes/albums.routes"

const app = express()

app.use("/albums", albumsRoutes)

export default app;