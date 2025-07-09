import { Sequelize } from "sequelize";
import envs from "./envs.js";

const { database, host, user, password, port } = envs.db_config;
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",
    port: port,
    logging: false, // DESACIVA LOGS EN PRODUCCION
});


//  CREAMOS BD SI NO EXISTE
async function setupDatabase() {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS\`${database}\`;`);
        console.log(`Base de datos'${database}' verificada/creada.`);

        sequelize.options.database = database;
        await sequelize.authenticate();
        console.log("Database is connected with SEQUELIZE");
    } catch (error) {
        console.error('Error al configurar la base de datos', error.message);
        throw error; // SI LOS FALLOS SON CRITICO, DETIENE TODO
    }
}

await setupDatabase();

export default sequelize;