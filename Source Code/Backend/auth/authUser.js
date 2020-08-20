const sql = require('./../config/mySqlConnection');

const registerUser = (objQuery) => {
  return new Promise(async (resolve, reject) =>{
    let query =`INSERT INTO user (email, name, surname, urluserpic, password) VALUES ('${objQuery.email}', '${objQuery.name}', '${objQuery.surname}', '','${objQuery.password}');`;
    console.log(query);
    let result = await sql.excQuery(query);
    if(result){
        resolve(result);
    }else{
        reject(new Error('Error al ejecutar el query!!'));
    }
  });
}
const authenticateUser = (objQuery) => {
    return new Promise(async (resolve, reject) =>{
        let query =`SELECT * FROM user WHERE email='${objQuery.email}' AND password= '${objQuery.password}';`;
        console.log(query);
        let result = await sql.excQuery(query);
        if(result){
            resolve(result);
        }else{
            reject(new Error('Error al ejecutar el query!!'));
        }
      });
}
module.exports = {authenticateUser, registerUser};