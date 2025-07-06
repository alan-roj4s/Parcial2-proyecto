import { createAdmin, getAdmins, loginAdmin, renderDashboard } from "../controllers/admin.controller.js";
import { Router } from 'express';

const router = Router();

router.post("/admins", createAdmin); // VCREAR ADMIN 
router.get("/", getAdmins); // TRAER ADMINS CREADOS
router.post('/login', loginAdmin); // Nueva ruta POST para login
router.get('/dashboard', renderDashboard); 

export default router;