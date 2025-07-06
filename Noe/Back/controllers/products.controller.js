import Product from "../models/product-model.js";
import { createProduct } from "../services/product.service.js";

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

// CREAR PRODUCTO - ESTO ES PARA EL ADMIN
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

// MODIFICAR PRODUCTO
// export const updateProduct = async (req, res) => {

// }