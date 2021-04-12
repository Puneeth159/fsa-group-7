const dotenv = require('dotenv');
var env = require('dotenv').config({ silent: true })
const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const engines = require('consolidate');
const expressLayouts = require('express-ejs-layouts');
const port = process.env.PORT || 3001


const app = express();


app.use(express.static('public'));

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engines.ejs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Use Express middleware to configure routing
const routing = require('./routes/router.js');

app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)
app.set('views', path.join(__dirname, './views/'))
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

const router = require('./routes/router')
app.use('/', router)
app.use(bodyParser.json({ type: "application/*+json" }));

app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/location/'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    app.listen(port, function() {
        return "Connected to Database"
    })
}).catch((e) => {
    console.log(e, "--error")
})