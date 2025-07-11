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
import adminDashboard from '../routes/admin.routes.js'
import corsMiddleware from '../middlewares/cors.middleware.js';
import Products from '../models/product-model.js'; // PARA PERMITIR LA ACTUALIZACION

import CompraLog from '../models/compras-log-model.js'; // ooooooooo

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

        await sequelize.sync({ alter: true }); // Crea/actualiza tablas /// CAMBIADO A ALTER
        console.log('Modelos sincronizados con la base de datos. (dios funciono)');


        // == 
        try {
            await Products.update(
            { activo: true },
            { where: { activo: null } }
        );
        console.log('Productos existentes actualizados con activo=true');
        } catch (error) {
            console.log(error);
            
        }
        



        return app;
    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
        process.exit(1);
    }
}


export default await startServer();