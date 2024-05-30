import app from './app'
import './database'

app.listen(3000, ()=>{
    console.log('server running on port 3000');
})