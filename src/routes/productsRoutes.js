import express from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from '../controllers/productsControllers.js'

const router = express.Router()

// Rutas publicas
router.get('/', getAllProducts) // Obtener todos los productos
router.get('/:id', getProductById) // Obtener producto por id

// Rutas protegidas (Solo administradores pueden modificar productos)
router.post('/', createProduct) // crear producto
router.put('/:id', updateProduct) // actualizar producto
router.delete('/:id', deleteProduct) // eliminar producto

export default router
