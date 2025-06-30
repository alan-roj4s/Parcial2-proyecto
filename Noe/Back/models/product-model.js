import { DataTypes  } from "sequelize";
import sequelize from "../config/db-sequelize.js";

const Products = sequelize.define("Products", {
    // COLUMNA ID
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plataforma: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
    },
    // stock: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 10
    // }
},{
    timestamps:true

})

export default Products;