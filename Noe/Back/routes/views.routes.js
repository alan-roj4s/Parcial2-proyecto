import { Router } from 'express';

const router = Router();

//  RUTA HOME
router.get('/', (req, res) => {
    res.render("index", {
        title: "ParaDox - Bienvenida",
        currentView: 'bienvenida',
        css: 'bienvenida.css'
    });
});

router.get("/admin", (req, res) => {
    res.render("index", {
        title: 'ParaDox - Login',
        currentView: 'loginAdmin'
    })
})

// RUTA QUE MUESTRA PRODUCTOS DESPUES DE ENVIAR EL FORM
router.get("/productos", (req, res) => {
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

// RUTA DE TICKET
router.post("/procesar-compra", (req, res) => {
    const { userName, cartItems, cartTotal } = req.body;

    res.render('index', {
        title: 'ParaDox - Ticket',
        currentView: 'ticket',
        userName,
        cartItems: JSON.parse(cartItems),
        cartTotal: parseFloat(cartTotal)
    })
})

export default router;


