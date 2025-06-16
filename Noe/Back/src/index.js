import express from 'express';
import path from 'path';
import { title } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//settings
const app = express()
app.set('PORT', 3000)
app.set('view engine', 'ejs'); // DEFINIMOS EJS COMO MOTOR DE PLANTILLAS
app.set("views", path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', (req, res) => {
  res.render("index", {
    title: "ParaDox - Bienvenida",
    currentView: 'bienvenida',
    css: 'bienvenida.css'
  });
});

// RUTA QUE MUESTRA PRODUCTOS DESPUES DE ENVIAR EL FORM
app.get("/productos", (req, res) => {
  const userName = req.query.userName || null; // SI NO EXISTE SERA NULL
  if (!userName){
    return res.redirect('/');
  }
  res.render("index", {
    title: 'ParaDox - Productos',
    currentView: 'productos',
    css: 'productos.css',
    userName: userName,
    isAdmin: false,
    cartItems: []
  });
});


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))




//listeners
app.listen(app.get("PORT"),()=>{
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
})
