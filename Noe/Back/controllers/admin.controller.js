import Admin from "../models/admin-model.js";
import Product from "../models/product-model.js"
import bcrypt from 'bcrypt';

// VALIDACION DE VARIOS INTENTOS
const intentosFallidos = new Map();
const MAX_INTENTOS = 3; //INTENTOS MAXIMOS PERMITIDOS
const LOCK_TIME = 15 * 60 * 1000; // TE BLOQUEA POR 15M


// CREAR ADMIN PRIMERO
export const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Todos los campos requeridos" });
        
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ error: "El admin ya existe" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newAdmin = await Admin.create({ email, password: hashedPassword});
        
        res
        .status(201)
        .json({ message: "Admin creado con éxito", payload: newAdmin });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error interno del servidor", err: error.message });
    }
};

// TRAER ADMINS CREADOS
export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            attributes: ['id', 'email'], 
        });

        if (!admins || admins.length === 0) {
            return res.status(404).json({ error: "No hay admins registrados" });
        }

        res.status(200).json({ admins });
    } catch (error) {
        console.error('Error al obtener admins:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// ================ admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    //  AGREGO VALIDAMCION PARA  QUE INGRESEN LOS CAMPOS REQUERIDOS 
    if(!email || !password) {
        return res.status(400).json({ error: " Email y contraseña son requeridos" });
    }
    
    try {
        // VERIFICAMOS INTENTOS FALLIDOS
        // const intentos = intentosFallidos.get(email) || { count: 0, lastAttempt: 0 }

        // if (intentos.count >= MAX_INTENTOS) {
        //     const tiempoUltimoIntento = Date.now() - intentos.lastAttempt;
            
        //     if(tiempoUltimoIntento < LOCK_TIME) {
        //         const tiempoRestante = Math.ceil(LOCK_TIME - tiempoUltimoIntento / 60000);
        //         return res.status(429).json({ error: `Demasiados intentos fallidos. Intente nuevamente en ${tiempoRestante} minutos.`})
        //     }else {
        //         // RESETEAMOS CONTADOR SI PASO EL TIEMPO DE BLOQUEO
        //         failedAttempts.delete(email);
        //     }
        // } ;

        // Buscar admin por email
        const admin = await Admin.findOne({ where: { email } });
        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!admin || !isMatch) {
            // INCREMENTAMOS INTENTOS FALLIDOS
            // const nuevoIntento = {
            //     count: attempts.count + 1,
            //     lastAttempt: Date.now()
            // };
            // failedAttempts.set(email, nuevoIntento);

            console.log('Credenciales incorrectas');
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Si todo está bien, redirigir al dashboard
        console.log('redirigiendo al dash');
        req.session.isAdmin= true;
        req.session.adminId = admin.id
        req.session.save(() => {
            res.json({success: true, redirect: '/api/admins/dashboard'})
        })

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