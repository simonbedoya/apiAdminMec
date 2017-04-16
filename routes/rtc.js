/**
 * Created by sbv23 on 15/03/2017.
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const response = require('../message');
const functions = require('../functions');
const rtcController = require('../controller/rtc_controller');

router.post("/", function (req,res) {
    rtcController.verifyRTC(req.decoded.pkSensor).then(function (data) {
        if(data.code === "001"){
            rtcController.registerRTC(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.dateHour,req.body.error).then(function (data) {
                res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
            })
        }else{
            res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
        }
    })
});

router.put('/',function (req,res) {
    rtcController.updateRTC(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.dateHour,req.body.error).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

router.get('/', function (req,res) {
    rtcController.getRTC(req.decoded.pkSensor).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

module.exports = router;
