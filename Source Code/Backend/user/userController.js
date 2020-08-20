const User = require('./user');

const add = async (req,res,next) => {
    console.log('add');
    let newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    }
    try{
        let resultado = await User.existEmail(newUser);
        if(!resultado){
            resultado = await User.add(newUser);
            newUser.id = resultado.insertId;
            const dataUser ={
                                name: newUser.name,
                                surname: newUser.surname,
                                email: newUser.email,
                                id: newUser.id
                            }
            res.json(dataUser);
        }else{
            res.status(500).send('Error el correo que intenta ingresar ya ha sido utilizado');
        }
    }catch(err){
        res.status(500).send('Error en el servidor');
    }
}

const get = async (req,res,next) => {
    try{
        let resultado
        if(req.params.id){
            resultado = await User.get(req.params.id);
        }else{
            resultado = await User.get();
        }
        res.json({usuarios: resultado});
    }catch{
        res.status(500).send('Error en el servidor');
    }
}
const update = async (req,res,next) => {
    let newDataUser = {
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        id: req.params.id
                    };   
    try{
        let resultado = await User.update(newDataUser);
    
        const dataUser ={
                            name: newDataUser.name,
                            surname: newDataUser.surname,
                            email: newDataUser.email
                        }
        res.json({message:'usuario actualizado ', updatedFields : dataUser});
    }catch(err){
        console.log(err);
        res.status(500).send('Error en el servidor');
    }
}
const deleteUser = async (req,res,next) => {
    try{
        const { id } = req.params;
        let resultado = await User.deleteUser(req.params.id);
        res.json({message: `Usuario con id: ${id} eliminado exitosamente`});
    }catch{
        res.status(500).send('Error en el servidor');
    }
}
module.exports = {add, get, update, deleteUser};