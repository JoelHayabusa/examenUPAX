const User = require('./authUser');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const SECRET_KEY = '@27ng7gRT#';

const registerUser = async (req,res,next) => {
    let newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }
    try{
        let resultado = await User.registerUser(newUser);
        newUser.id = resultado.insertId;
        const expiresIn = 900000;
        const accessToken = jwt.sign(
                                        {id: newUser.id}, 
                                        SECRET_KEY,
                                        {expiresIn: expiresIn}
                                    );
        const dataUser ={
                            name: newUser.name,
                            surname: newUser.surname,
                            email: newUser.email,
                            id: newUser.id,
                            accessToken: accessToken,
                            expiresIn: expiresIn
                        }
        res.json(dataUser);
    }catch(err){
        //Falta hacer el manejo para correo repetido.
        res.status(500).send('Error en el servidor');
    }
}
const loginUser = async (req, res, next) => {
    const userLoginData = {
        email: req.body.email,
        password: req.body.password
    }
    try{
        let user = await User.authenticateUser(userLoginData);
        if(user.length>0){
            const expiresIn = 900000;
            const accessToken = jwt.sign(
                                            {id: user[0].id}, 
                                            SECRET_KEY,
                                            {expiresIn: expiresIn}
                                );
            const dataUser ={
                                name: user[0].name,
                                surname: user[0].surname,
                                email: user[0].email,
                                id: user[0].id,
                                urluserpic: user[0].urluserpic,
                                accessToken: accessToken,
                                expiresIn: expiresIn
                            }
            res.json({dataUser: dataUser});
        }else{
            res.status(409).send({message:'Algo ha salido mal'});
        }
    }catch(err){
                 console.log ('Error en servidor: '+err);
                 return res.status(500).send('Error en el servidor');
    }
}

module.exports = {loginUser, registerUser};