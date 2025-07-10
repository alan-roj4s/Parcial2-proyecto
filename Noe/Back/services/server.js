import express from 'express';
import viewsRouter from '../routes/views.routes.js';
// import { title } from 'process';
import middlewares from '../middlewares/index.js';
import productRouter from '../routes/products.routes.js';
import sequelize from '../config/db-sequelize.js';
import adminRouter from '../routes/admin.routes.js';
import corsMiddleware from '../middlewares/cors.middleware.js';
import session from "express-session";
import envs from "../config/envs.js";

//settings
const app = express()

middlewares(app);

// ROUTES
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/admins', adminRouter);
app.use(corsMiddleware);


// SINCRONIZA CON LA DB AL INICIAR
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la database establecida');

        await sequelize.sync({ force: false }); // Crea/actualiza tablas
        console.log('Modelos sincronizados con la base de datos.');
        
        return app;
    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
        process.exit(1);
    }
}

export default await startServer();