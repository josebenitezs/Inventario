const mongoose = require ('mongoose');

const getConnection = async () => {
    try {
const url ='mongodb://usuario-prueba:hYxkPzFrJS3cvdT3@ac-9z0ot5h-shard-00-00.vdpdvnt.mongodb.net:27017,ac-9z0ot5h-shard-00-01.vdpdvnt.mongodb.net:27017,ac-9z0ot5h-shard-00-02.vdpdvnt.mongodb.net:27017/inventario-iud?ssl=true&replicaSet=atlas-xbj410-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(url);

        console.log ('connexion exitosa');
        
    } catch (error) {
        console.log(error);
    }
  
}

module.exports = {
    getConnection,
}
