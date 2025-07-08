import Product from "../models/product-model.js";
import { createProduct, findPkProduct, updateProduct } from "../services/product.service.js";

export const getProducts = async (req, res) => {
    try {
        const productos = await Product.findAll({
            attributes: ['id', 'nombre', 'categoria', 'plataforma', 'precio', 'imagen'],
            raw: true 
        });
        res.json(productos);

    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
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
