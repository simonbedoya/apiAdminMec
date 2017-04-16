/**
 * Created by sbv23 on 15/03/2017.
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const response = require('../message');
const functions = require('../functions');
const gpsController = require('../controller/gps_controller');

router.post("/", function (req,res) {
    gpsController.verifyGPS(req.decoded.pkSensor).then(function (data) {
        if(data.code === "001"){
            gpsController.registerGPS(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.baudRate,req.body.msjNMEA,req.body.error).then(function (data) {
                res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
            })
        }else{
            res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
        }
    })
});

router.put('/',function (req,res) {
    gpsController.updateGPS(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.baudRate,req.body.msjNMEA,req.body.error).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

router.get('/', function (req,res) {
    gpsController.getGPS(req.decoded.pkSensor).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

module.exports = router;
