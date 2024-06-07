import app from './app'
import "dotenv/config"
import './database'

app.listen(process.env.PORT, ()=>{
    console.log('server running on port 8080'); 
})