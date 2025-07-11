import { Op } from "sequelize";
import Products from "../models/product-model.js";

export const getProducts = async ({ limit = 10, offset = 0 }) => {
    return await Products.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: ['id', 'nombre', 'categoria', 'plataforma', 'precio', 'imagen'],
    });
};

export const createProduct = async (productData) => {
    if (productData.precio <= 0) throw new Error('Precio invalido. Tiene que ingresar un precio');
    return await Products.create(productData);
};

export const findPkProduct = async (id) => {
    return await Products.findByPk(id);
};

export const updateProduct = async (productData, id) => {
    return await Products.update(productData, { where: { id: id } });
};

// FALTARIA EL DE DELETE
export const deleteProduct = async (id) => {
    return await Products.destroy({ where: { id } });
};
