import dotenv from "dotenv"
dotenv.config()

// VALIDACION DE VARIABLES REQUERIDAS
const requiredEnvVars = ["DB_NAME", "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_PORT"];
console.log('Variables cargadas:', {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER
});

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.log(`Falta la variable de entorno: ${envVar}`);
        
    }
}
export default {
    port: process.env.PORT || 4000,
    db_config: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port:process.env.DB_PORT || 3307,
    },
};

