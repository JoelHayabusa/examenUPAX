const User =  require('./userController');
module.exports = (router) => {
    router.route('/user')
    .get((req, res) => {User.get(req, res)})
    .post((req, res) => {User.add(req, res)});

    router.get('/user/:id',(req, res) => {User.get(req, res)});
    router.put('/user/:id',(req, res) => {User.update(req, res)});
    router.delete('/user/:id',(req, res) => {User.deleteUser(req, res)});
}