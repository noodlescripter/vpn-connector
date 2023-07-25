const express = require('express')
const app = express();
const { info, log, error } = require('console')
const path = require('path')
const mate = require('ejs-mate');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const mongo = require('mongoose')
const NetworkInfo = require('./Models/NetworkInfo');
const db = mongo.connection;
require('dotenv').config();
//making ejs work
app.set(
    'views',
    path.join(__dirname, 'views')
)
app.set(
    'view engine',
    'ejs'
)
app.use(express.static('views'));
//connection
//connection
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('ejs', mate);

// db connection
mongo.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin'
});
//QNajBzYsdRBU8Vcz
db.on(
    'error', 
    console.error.bind(console, 'Unable to connect to the database!!!!!!')
);
db.once(
    'open', () => {log('Connected to db!!!!')}
);

app.get('/', function(req, res){
    res.render('pages/index');
});

app.get('/connect', function(req, res){
    res.render('pages/connect.ejs');
});

app.get('/status', function(req, res){
    res.render('pages/status.ejs');
});

app.post('/networkinfos', async function(req, res){
    const info = req.body;
    log(info);
    const addInfo = new NetworkInfo(info);
    await addInfo.save().then(() => {
        res.render('pages/success');
    }).catch((err) => {
        res.render('pages/error', {err});
    })    
})

app.get('/show/allowme', async (req, res) => {
    const allInfos = await NetworkInfo.find({});
    res.render('pages/showinfo.ejs', {allInfos});
});
//server
app.listen(9999, function(){
    log("app is up on http://localhost:9999");
})
