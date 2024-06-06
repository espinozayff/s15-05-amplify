import app from './app'
import "dotenv/config"

app.listen(process.env.PORT, ()=>{
    console.log('server running on port 8080'); 
})