"use strict";

var http = require("http");
const express=require('express')
const app=express.Router()
var LocationSchema = require('../models/location')
let bodyParser = require('body-parser');
const cons = require('consolidate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.post('/createLocation', async (req, res) => {
//     const location = new LocationSchema({
//         locationName: req.body.locationName,
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         radius: 100,
//       });
//      location.save(err => {
//              if(err) {
//                 let status = err.status || err.statusCode || err.code || 500;
//         res.status(status).send({ status, error: err });
//              }
//                  res.send({ status: 200, response: "Location Create Successfully" });
//       } )
// })

exports.create = (req, res) => {
    console.log(req.body,"--body is here--")

    const location = new LocationSchema({
        locationName: req.body.locationName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 100,
      });
     location.save(err => {
             if(err) {
                let status = err.status || err.statusCode || err.code || 500;
        res.status(status).send({ status, error: err });
             }
                //  res.send({ status: 200, response: "Location Create Successfully" });
                res.redirect('/locations/');
      } )
}

// List all the locations

// app.get('/', async(req,res) =>{
//     try{
//         const locations = await LocationSchema.find()
//         res.json(locations)
//     }
//     catch(err){
//         res.send('Error' + err)
//     }
// })

exports.findAll = (req, res) => {
    LocationSchema.find()
    .then(locations => {
        res.send(locations);
        console.log(locations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving locations."
        });
    });
}



// Get the loaction by Id


exports.findOne = (req, res) => {
    LocationSchema.findById(req.params.locationId)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });            
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "location not found with id " + req.params.locationId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving location with id " + req.params.locationId
        });
    });
}

// app.get('/getLocation/:id', async(req, res) =>{
//     try{
//         const location = await LocationSchema.findById(req.params.id)
//         res.json(location)
//     }
//     catch(err){
//         res.send('Error' + err)
//     }
// })


// Update the location

exports.update = (req, res) => {
    console.log(req.body, "=====> UPDATE DATA")

    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;

    LocationSchema.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                // res.send(data)
                res.redirect('/locations/')

            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

// app.put('/editLocation/:id', async(req, res) =>{
//     const id = parseInt(req.params.id)
//     try{
//         const updateLocation = LocationSchema.updateOne({ _id: id},{
//             $set: {
//                 locationName : req.body.locationName,
//             }
            
//         })
//         res.json(updateLocation)
       
//     }
//     catch(err){
//         res.send('Error' + err)
//     }
// })


exports.delete = (req, res) => {
    const id = req.params.id;


    console.log(id);
    LocationSchema.findByIdAndRemove(id)
    .then(location => {
        console.log("=========================> inside loop");
        console.log(id);
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + id
            });
        }
        // res.send({message: "Location deleted successfully!"});
        res.redirect('/locations')
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Location not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Location with id " + id
        });
    });
}

// app.delete('/deleteLocation', async (req, res) => {
//       LocationSchema.deleteOne(req.body)
//           if(err) {
//         let status = err.status || err.statusCode || err.code || 500;
// res.status(status).send({ status, error: err });
//      }
//          res.send({ status: 200, response: "Location deleted Successfully" });
//     })


// module.exports = app;