const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const locationController = require('../controllers/locationController');
// const display = require('../views/display/display.js');
// const edit = require('../views/edit/edit.js')
// const create = require('../views/create/create.js')
const services = require('../services')


router.get('/', (req, res,next) => {
  res.render('../views/index', { title: 'index' })
})



router.get('/locations/', services.displays);
router.get('/locations/editview/:id', services.updateLocation);
router.get('/locations/create', services.addlocation);

// router.get('/display', services.displays);
// router.get('/editview', services.updateLocation);
// router.get('/create', services.addlocation);


router.get('/location/', locationController.findAll);

router.post('/locations/', locationController.create);

router.post('/locations/edit/:id', locationController.update)

router.post('/locations/delete/:id', locationController.delete)






module.exports = router;