import app from './app'
import './database'

app.listen(8080, ()=>{
    console.log('server running on port 8080'); 
})