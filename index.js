var express = require('express');
var app = express();
var env = require('dotenv').config({silent:true})
const router = require('./routes/router')
const dotenv = require('dotenv');

// app.use('/', router)
// app.use(express.static(__dirname+'/public/'))
const mongoose = require("mongoose")
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', true)
mongoose.set('useCreateIndex', true)

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
// require('dotenv').config({ path: 'ENV_FILENAME' });

// const vars = dotenv.config({ path: '.env' });
// if (vars.error) {
//     throw vars.error;
// }

const port = process.env.PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next){
//   res.header('Access-Control-Allow_origin', "*");
//   res.setHeader('Access-Control-Allow_origin-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   res.header('Access-Control-Allow-Header',"Origin, X-Requested-With, Content-Type, Accept");
// })

app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) =>{
  app.listen(port, function() {
    return "Connected to Database"
   
 })
}).catch((e) => {
  console.log(e,"--error")
})
app.use(require('./routes/router.js'))