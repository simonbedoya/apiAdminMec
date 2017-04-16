/**
 * Created by sbv23 on 15/03/2017.
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const response = require('../message');
const functions = require('../functions');
const cpuController = require('../controller/cpu_controller');

router.post("/", function (req,res) {
    cpuController.verifyCPU(req.decoded.pkSensor).then(function (data) {
        if(data.code === "001"){
            cpuController.registerCPU(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.error).then(function (data) {
                res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
            })
        }else{
            res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
        }
    })
});

router.put('/',function (req,res) {
    cpuController.updateCPU(req.decoded.pkSensor,req.body.status,req.body.descript,req.body.error).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

router.get('/', function (req,res) {
    cpuController.getCPU(req.decoded.pkSensor).then(function (data) {
        res.status(data.hcode).send(JSON.parse(response.msg(data.code, data.msg, data.data)));
    })
});

module.exports = router;
