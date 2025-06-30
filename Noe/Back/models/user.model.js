import { DataTypes  } from "sequelize";
import sequelize from "../config/db-sequelize.js";

const User = sequelize.define("User", {
    // COLUMNA ID
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    // COLUMNA EMAIL
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail:true,
        },
        unique: true,
    }
})

export default User;