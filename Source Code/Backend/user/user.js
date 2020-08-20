const sql = require('./../config/mySqlConnection');
 
const add = (objQuery) => {
    return new Promise(async (resolve, reject) =>{
      let query =`INSERT INTO user (email, name, surname, urluserpic) VALUES ('${objQuery.email}', '${objQuery.name}', '${objQuery.surname}', '');`;
      console.log(query);
      let result = await sql.excQuery(query);
      if(result){
          resolve(result);
      }else{
          reject(new Error('Error al ejecutar el query!!'));
      }
    });
}
const get = (id) =>{
    return new Promise(async (resolve, reject) =>{
        let query=`SELECT  id, email, name, surname, urluserpic FROM user`;
        if(id){
            query+=` WHERE id = ${id}`;
        }
        query+=`;`;
        console.log(query);
        let result = await sql.excQuery(query);
        if(result){
            resolve(result);
        }else{
            reject(new Error('Error al ejecutar el query!!'));
        }
    });
}
const existEmail = async (objQuery) => {
    const email = objQuery.email;
    let query = `SELECT * FROM user WHERE email = '${email}';`; 
    let resultado = await sql.excQuery(query);
    if(resultado.length>0){
        return true;
    }else{
        return false;
    }
}
const update = (objQuery) => {
    return new Promise(async (resolve, reject) =>{
        let counter=0;
        let query='';
        for (const prop in objQuery) {
            if(objQuery[prop]!==undefined){
                counter++;
            }  
        }
        if(counter>0){
            query=`UPDATE user SET `;
            for (const prop in objQuery) {
                if(objQuery[prop]!==undefined && prop !='id'){
                   query+=` ${prop} = '${objQuery[prop]}',`
                }  
            }
            query = query.substr(0,query.length-1);
            query+=` WHERE id = ${objQuery.id}`;
            query+=`;`;
            console.log(query);
            let result = await sql.excQuery(query);
            if(result){
                console.log(result);
                resolve(result);
            }else{
                reject(new Error('Error al ejecutar el query!!'));
            }
        }  
    });
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) =>{
        let query=`DELETE FROM user WHERE id = ${id};`;
        console.log(query);
        let result = await sql.excQuery(query);
        if(result){
            resolve(result);
        }else{
            reject(new Error('Error al ejecutar el query!!'));
        }
    });
}
module.exports = {add, get, existEmail, update, deleteUser};