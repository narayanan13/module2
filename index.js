const express=require("express")
const cors=require("cors")
const app=express()

app.use(cors({
    origin:"*",
}))

app.use(express.json())

require('./conn')

const categoryRoutes = require('./Routes/categoryRoutes')
app.use(categoryRoutes)

const PORT = process.env.port ||8001
app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`);
})
