const express = require('express')
const sequelize = require('./config/dbConn')
const bodyParser = require('body-parser')
const Product = require('./models/ProductModel')
const {getAllProducts,createProduct,editProduct,deleteProduct} = require('./controllers/ProductController')

const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('index.html')
})

//Product routes
app.get('/products',getAllProducts)
app.post('/products',createProduct)
app.put('/products',editProduct)
app.delete('/products',deleteProduct)

async function start(){
    try{
        await sequelize.authenticate()
        app.listen(process.env.PORT, console.log(`Server running db connected on http://localhost:${process.env.PORT}`))
    }catch(e){
        console.log(`Error: ${e}`)
    }
}
start()


