import Product from "../models/product-model.js";

export const renderHome = (req, res) => {
    res.render("index", {
        title: "ParaDox - Bienvenida",
        currentView: 'bienvenida',
        css: 'bienvenida.css'
    });
}

export const renderAdmin = (req, res) => {
    res.render("index", {
        title: 'ParaDox - Login',
        currentView: 'loginAdmin'
    })
}

// RUTA QUE MUESTRA PRODUCTOS DESPUES DE ENVIAR EL FORM
export const renderProducts = async (req, res) => {
    const userName = req.query.userName || null; // SI NO EXISTE SERA NULL
    if (!userName){
        return res.redirect('/');
    }
    try {
        const products = await Product.findAll({ //VOY A INDICAR LOS CAMPOS A DEVOLVER, PARA QUE NO SE FILTRE ALGUN DATO INDEBIDO
            attributes: ['id', 'nombre', 'categoria', 'plataforma', 'precio', 'imagen'],
        })

        res.render("index", {
            title: 'ParaDox - Productos',
            currentView: 'productos',
            css: 'productos.css',
            userName: userName,
            isAdmin: false,
            cartItems: [],
            products: products.map(p => p.toJSON())  //CONVIERTO LOS PRODUCTOS A UN DATO PLANO, PARA QUE SEA LEGIBLE
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render("index", {
            title: 'Error',
            currentView: 'error',
            css: 'error.css',
            errorMessage: 'No se pudieron cargar los productos'
        });
    }
}

export const renderTicket = (req, res) => {
    const { userName, cartItems, cartTotal } = req.body;

    res.render('index', {
        title: 'ParaDox - Ticket',
        currentView: 'ticket',
        userName,
        cartItems: JSON.parse(cartItems),
        cartTotal: parseFloat(cartTotal)
    })
}