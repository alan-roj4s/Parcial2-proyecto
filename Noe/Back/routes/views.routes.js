import { Router } from 'express';
import { renderHome, 
    renderAdmin, 
    renderProducts,
    renderTicket } from '../controllers/views.controller.js';

const router = Router();

//  RUTA HOME
router.get('/', renderHome);
router.get('/admin', renderAdmin);
router.get('/productos', renderProducts);
router.get('/procesar-compra', renderTicket);


export default router;


