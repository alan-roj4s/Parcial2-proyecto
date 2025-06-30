import  './config/envs.js'
import server from './services/server.js'

const PORT = process.env.PORT || 4400;
// const PORT = config.port;

//listeners
server.listen(PORT,() => {
    console.log(`Server on port http://localhost:${PORT}`);
})
