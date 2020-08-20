const mySQL = require('mysql-await');
const dbConf = require('./properties').DB;

const getConection = async () => {
    try { 
        let mySQLClient = mySQL.createConnection(dbConf);
        await mySQLClient.awaitConnect();
        if(mySQLClient.connection.state=='authenticated'){
            return mySQLClient;
        }
    }catch(err){
        console.log(err);
    }     
}
const excQuery = async (query) =>{
    let mySQLClient =await getConection();
    try{
        let resultado = await mySQLClient.awaitQuery(query);
        return resultado;
    }catch(err){
        console.log('Error en base de datos : ' +err);
    }finally{
        await mySQLClient.awaitEnd();
    }
    
}

module.exports.excQuery = excQuery;