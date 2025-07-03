import Product from "../models/product-model.js";
import Admin from "../models/admin-model.js";
import bcrypt from 'bcrypt';


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
    });
};


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

// ================ admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Buscar admin por email
        const admin = await Admin.findOne({ where: { email } });
        
        if (!admin) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Si todo está bien, redirigir al dashboard
        res.json({ success: true, redirect: '/dashboard' });

    } catch (error) {
        console.error('Error en login admin:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export const renderDashboard = async (req, res) => {
    try {
        // Obtener estadísticas de productos (ejemplo)
        const activeProducts = await Product.count();
        // const inactiveProducts = await Product.count({ where: { estado: 'inactivo' } });
        
        res.render("index", {
            title: 'ParaDox - Admin Dashboard',
            currentView: 'dashboard',
            stats: {
                activeProducts,
                inactiveProducts: 0 // Cambiar cuando tengas el campo estado
            }
        });
    } catch (error) {
        console.error('Error al cargar dashboard:', error);
        res.redirect('/admin');
    }
};