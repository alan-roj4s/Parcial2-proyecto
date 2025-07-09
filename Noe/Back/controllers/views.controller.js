import Product from "../models/product-model.js";
import CompraLog from "../models/compras-log-model.js";

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

export const renderTicket = async (req, res) => {
    console.log('Datos recibido en renderTicket: ', req.body);

    const { userName, formCartItems, formCartTotal } = req.body;

    if (!formCartItems) {
        return res.status(400).send("Datos del carrito faltantes");
    }

    try {
        const parseItems = JSON.parse(formCartItems);

        // REGISTRAR COMPRA EN TABLA ======
        await CompraLog.create({
            nombre_cliente: userName || "Cliente no identificado",
            productos: formCartItems, // Guardamos el JSON completo
            total: parseFloat(formCartTotal)
        });
        // ==============



        res.render("index", {
            title: 'ParaDox - Ticket',
            currentView: 'ticket',
            userName: userName || "Cliente no identificado",
            cartItems: parseItems,
            cartTotal: parseFloat(formCartTotal)
        });
    } catch (error) {
        return res.status(400).send("Formato de carrito inválido");
    }
}


