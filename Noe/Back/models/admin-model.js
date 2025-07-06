import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequelize.js";

const Admin = sequelize.define("Admins", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false, // Deshabilita los timestamps automáticos
});

export default Admin;