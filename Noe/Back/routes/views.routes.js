import { Router } from 'express';
import { renderHome, 
    renderAdmin, 
    renderProducts,
    renderTicket,
    renderDashboard,
    loginAdmin,
    } from '../controllers/views.controller.js';

const router = Router();

//  RUTA HOME
router.get('/', renderHome);
router.get('/admin', renderAdmin);
router.post('/admin/login', loginAdmin); // Nueva ruta POST para login
router.get('/dashboard', renderDashboard); // Nueva ruta para dashboard
router.get('/productos', renderProducts);
router.get('/procesar-compra', renderTicket);


export default router;


