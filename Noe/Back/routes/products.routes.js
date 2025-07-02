import { Router } from 'express';
// AGREGAR EL UPDATEPRODUCT ACA ABAJO
import { getProducts, createProduct } from '../controllers/products.controller.js';
import multer from '../middlewares/upload.middle.js';

const router = Router();

router.get('/', getProducts);

router.post('/', multer.single("imagen"), createProduct) 

// router.put('/:id', isAdmin, multer.single('imagen'), updateProduct);

export default router;