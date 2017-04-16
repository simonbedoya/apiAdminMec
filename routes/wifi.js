/**
 * Created by sbv23 on 15/03/2017.
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const response = require('../message');
const functions = require('../functions');
const wifiController = require('../controller/wifi_controller');

router.post("/", function (req,res) {
    wifiController.verifyWIFI(req.decoded.pkSensor).then(function (data) {
        if(data.code === "001"){
            wifiController.registerWIFI(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.ssid,req.body.ipAdr,req.body.macAdr,req.body.error).then(function (data) {
                res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
            })
        }else{
            res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
        }
    })
});

router.put('/',function (req,res) {
    wifiController.updateWIFI(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.ssid,req.body.ipAdr,req.body.macAdr,req.body.error).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

router.get('/', function (req,res) {
    wifiController.getWIFI(req.decoded.pkSensor).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

module.exports = router;
