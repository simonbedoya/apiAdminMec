/**
 * Created by sbv23 on 01/05/2017.
 */
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const response = require('../message');
const functions = require('../functions');
const gpsController = require('../controller/gps_controller');

router.post("/", function (req,res) {
    gpsController.verifyEVENT(req.decoded.pkSensor).then(function (data) {
        if(data.code === "001"){
            gpsController.registerEVENT(req.decoded.pkSensor,req.body.d_w_sta,req.body.d_w_lta,req.body.t_on,req.body.t_off,req.body.d_pre,req.body.d_pos,req.body.d_min).then(function (data) {
                res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
            })
        }else{
            res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
        }
    })
});

router.put('/',function (req,res) {
    gpsController.updateEVENT(req.decoded.pkSensor,req.body.d_w_sta,req.body.d_w_lta,req.body.t_on,req.body.t_off,req.body.d_pre,req.body.d_pos,req.body.d_min).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

router.get('/', function (req,res) {
    gpsController.getEVENT(req.decoded.pkSensor).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

module.exports = router;