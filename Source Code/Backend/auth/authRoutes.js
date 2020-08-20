const User = require('./authController');
module.exports = (router) => {
    router.post('/login', (req,res)=>{User.loginUser(req, res)});
    router.post('/register',(req,res)=>{ User.registerUser(req, res)});
}