import express from 'express';
import path from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//settings
const app = express()
app.set('PORT', 3000)
app.set('view engine', 'ejs'); // DEFINIMOS EJS COMO MOTOR DE PLANTILLAS
app.set("views", path.join(__dirname, '../Front/views')); 
app.use(express.static(path.join(__dirname, '../Front/public')));

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTES
app.use('/', viewsRouter);



//listeners
app.listen(app.get("PORT"),()=>{
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
})
