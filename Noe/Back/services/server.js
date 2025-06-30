import express from 'express';
import viewsRouter from '../routes/views.routes.js';
// import '..models/user.model.js';
import { title } from 'process';
import middlewares from '../middlewares/index.js';
import productRouter from '../routes/products.routes.js';
import sequelize from '../config/db-sequelize.js';


//settings
const app = express()

middlewares(app);

// app.set('PORT', 3000)

// ROUTES
app.use('/', viewsRouter);
app.use('/api/products', productRouter);

// SINCRONIZA CON LA DB AL INICIAR
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la database establecida');

        await sequelize.sync({ alter: true }); // Crea/actualiza tablas
        console.log('Modelos sincronizados con la base de datos.');
        
        return app;
    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
        process.exit(1);
    }
}

export default await startServer();