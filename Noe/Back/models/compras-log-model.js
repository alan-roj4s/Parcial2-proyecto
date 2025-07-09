// En models/compra-log-model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequelize.js";

const CompraLog = sequelize.define("CompraLog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productos: {
        type: DataTypes.TEXT, // Almacenaremos JSON como texto
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha_compra: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'compras_log'
});

export default CompraLog;