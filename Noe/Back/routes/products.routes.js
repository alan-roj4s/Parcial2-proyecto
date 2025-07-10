import { Router } from 'express';
import { getProducts, addProduct, getProductToEdit, updateProductEdit, renderAgregarProducto } from '../controllers/products.controller.js';
import multer from '../middlewares/upload.middle.js';
import { requireAdminAuth } from '../middlewares/authAdmin.js';


const router = Router();


router.get('/', getProducts);

// APLICA LA AUTENTICACION DEL ADMIN EN TODAS LAS RUTAS
router.use(requireAdminAuth);
router.get('/add-product', renderAgregarProducto);
router.post('/add-product', multer.single("imagen"), addProduct) 
router.get('/edit-product/:id', getProductToEdit)
router.put('/edit-product/:id', multer.single("imagen"), updateProductEdit)

// ACA VAN LAS RUTAS DE DELETE Y ACTIVACION - HAY QUE TRAER (Y CREAR) LAS FUNCIONES DESDE PRODUCT CONTROLLER 
// router.put('/:id', isAdmin, multer.single('imagen'), updateProduct);

export default router; 