'use stric'
const cors = require('cors');
const express = require ('express');
const properties = require('./config/properties')
const port = properties.PORT;
const authRoutes = require('./auth/authRoutes');
const userRoutes = require('./user/userRoutes');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(cors());
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

authRoutes(router);
userRoutes(router);
router.get('/home/:id',async (req,res)=>{
    res.send('Hello fasasasrom Hoasasme');
});
app.use(router);
app.use('/api', router);
app.listen(port,() => console.log(`Servidor escuchando en http://localhost:${port}`));