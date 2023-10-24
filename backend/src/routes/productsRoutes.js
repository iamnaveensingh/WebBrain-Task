import express from 'express'
import { createProduct, readProduct, deleteProduct, findProduct, updateProduct, addToCart, getCart, deleteCart, readInStock, readSold } from '../../controller/productController.js';
import auth from '../../middlewares/auth.js'


const router = express.Router()

router.post('/create', auth, createProduct)
router.get('/read', readProduct)
router.get('/read-InStock', readInStock)
router.get('/read-Sold', readSold)
router.post('/cart', auth, addToCart)
router.get('/getCart', auth, getCart)
router.delete('/deleteCart/:id', auth, deleteCart)
router.get('/find/:id', auth, findProduct)
router.put('/update/:id', auth, updateProduct)
router.delete('/delete/:id', auth, deleteProduct)

export default router;
