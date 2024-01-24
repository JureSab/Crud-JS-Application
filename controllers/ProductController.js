const Product = require('../models/ProductModel')

const getAllProducts = async(req,res) => {
    const allProducts = await Product.findAll()
    res.json(allProducts)
}

const createProduct = async(req,res) => {
    const newProduct = req.body
    const addProduct = await Product.create(newProduct)
    res.status(200).json(addProduct)
}

const editProduct = async(req,res) => {
    const editProduct = req.body
    const newProduct = await Product.update(
        { 
            product_name : editProduct.product_name,
            product_supp : editProduct.product_supp,
            product_price : editProduct.product_price
        },{
            where:{
                id : editProduct.id
            }
        })
    res.status(200).json(newProduct)
}

const deleteProduct = async(req,res) => {
    const productID = req.body.id
    const deletedProduct = await Product.destroy({
        where : {
            id : productID
        }
    })
    res.status(200).json(deletedProduct)
}

module.exports = {getAllProducts,createProduct,editProduct,deleteProduct}