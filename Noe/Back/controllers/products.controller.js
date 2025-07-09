import Product from "../models/product-model.js";
import { createProduct, findPkProduct, updateProduct, deleteProduct } from "../services/product.service.js";

export const getProducts = async (req, res) => {
    try {
        const productos = await Product.findAll({
            where: { activo: true }, // SOLO ACTIVOS SE MUESTRAN
            attributes: ['id', 'nombre', 'categoria', 'plataforma', 'precio', 'imagen'],
            raw: true 
        });
        res.json(productos);

    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
};

// EXCLUSIVO PARA EL DASHBOARD
export const getProductsForDashboard = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8; // 8 productos por página
        const offset = (page - 1) * limit;

        const { count, rows: productos } = await Product.findAndCountAll({
            attributes: ['id', 'nombre', 'categoria', 'plataforma', 'precio', 'imagen', 'activo'],
            limit,
            offset,
            order: [['id', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            productos,
            currentPage: page,
            totalPages,
            totalProducts: count
        });
    } catch (error) {
        console.error('Error en getProductsForDashboard:', error);
        res.status(500).json({error: error.message});
    }
};



// MUESTRA EL FORM
export const renderAgregarProducto = (req, res) => {
    res.render ("index", {
        title: 'Agregar Producto - Admin',
        currentView: 'crearProducto',
        isAdmin: true,
    })
}



// CREAR PRODUCTO 
export const addProduct = async (req, res) => {
    try {
        console.log('Archivo recibido:', req.file);
        console.log('Datos recibidos:', req.body);

        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                error: 'La imagen es obligatoria' });
        }
        const { nombre, categoria, plataforma, precio } = req.body;
        const imagen = req.file ? `/${req.file.filename}` : null;

        const productData = { nombre, categoria, plataforma, precio, imagen };
        const newProduct = await createProduct(productData);
        
        res.status(201).json({
            success: true,
            product: newProduct
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error.message ||  "Error al crear el producto" });
    }
};

// TRAIGO PRIMERO EL PRODUCTO A EDITAR
export const getProductToEdit = async (req, res) => {
    try {
        const producto = await findPkProduct(req.params.id);
        if(!producto) {
            // SI NO ENCUENTRA EL PRODUCTO..
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.render ("index", {
            title: 'Editar Producto - Admin',
            currentView: 'edit-product',
            isAdmin: true,
            producto: producto
        })
        
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error.message ||  "Error al traer producto" });
    }
};

// PROCESO MODIFICACION/ACTUALIZACION DEL PRODUCTO ENVIANDOLA CON PUT
export const updateProductEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await findPkProduct(id);
        if(!producto) {
            // SI NO ENCUENTRA EL PRODUCTO..
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const { nombre, categoria, plataforma, precio } = req.body;
        const imagen = req.file ? req.file.filename : undefined;

        const productData = { nombre, categoria, plataforma, precio, imagen }

        if (imagen) productData.imagen = imagen;

        await updateProduct(productData, id);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error.message ||  "Error al editar producto" });
    }
}

// SE LLAMA PARA BORRAR EL PRODUCTO
export const destroyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProduct(id); // Llama al servicio
        res.json({ success: true, message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ======== USADA PARA ACTIVAR / DESACTIVAR UN PRODUCTO
export const toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id); // Cambia Products por Product
        
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await product.update({ activo: !product.activo });
        res.json({ 
            success: true, 
            newStatus: product.activo 
        });
    } catch (error) {
        console.error('Error en toggleProductStatus:', error);
        res.status(500).json({ error: error.message });
    }
};