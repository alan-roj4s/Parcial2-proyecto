import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import envs from '../config/envs.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
    app.set('view engine', 'ejs'); // DEFINIMOS EJS COMO MOTOR DE PLANTILLAS
    app.set("views", path.join(__dirname, '../../Front/views')); 
    app.use(express.static(path.join(__dirname, '../../Front/public')));
    
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    app.use(session(envs.session_config));

    console.log('Vistas en:', path.join(__dirname, '../../Front/views'));
    // ACA SE PUEDE AGREGAR EL MIDDLEWARE DE CORS..


}