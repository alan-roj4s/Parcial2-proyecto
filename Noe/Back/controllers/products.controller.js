import Product from "../models/product-model.js";

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
export const createProduct = async (req, res) => {
    try {
        const producto = await Product.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}