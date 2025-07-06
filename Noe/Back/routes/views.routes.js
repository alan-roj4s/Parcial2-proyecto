import { Router } from 'express';
import { renderHome, 
    renderAdmin, 
    renderProducts,
    renderTicket} from '../controllers/views.controller.js';
import { renderDashboard} from '../controllers/admin.controller.js';
import { requireAdminAuth } from '../middlewares/authAdmin.js';


const router = Router();


router.get('/', renderHome);
router.get('/admin', renderAdmin);
// Nueva ruta para dashboard
router.get('/productos', renderProducts);
router.post('/procesar-compra', renderTicket);


export default router;


