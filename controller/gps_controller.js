/**
 * Created by sbv23 on 16/04/2017.
 */
const db = require('../db/connection');
const sqlQuery = require('../sql/sql_api');
const template = require('es6-template-strings');
const config = require('../config');
const functions = require('../functions');

module.exports = {
    verifyGPS: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_verifyGps,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        if(result[0].counter !== 0){
                            fullfill({hcode: 200 ,code: "003", msg:"Already gps information registered", data: null});
                        }else{
                            fullfill({hcode: 200 ,code: "001", msg:"no exist info", data: null});
                        }
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Error", data: null});
                    }
                });
            }
        )
    },
    registerGPS: function (pk_sensor, status, descript, baudRate, msjNMEA, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_registerGps,{pk_sensor: pk_sensor, status: status, descript: descript, baudRate: baudRate, msjNMEA: msjNMEA, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"gps information registered", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not gps information registered", data: null});
                    }
                });
            }
        )
    },
    updateGPS: function (pk_sensor, status, descript, baudRate, msjNMEA, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_updateGps,{pk_sensor: pk_sensor, status: status, descript: descript, baudRate: baudRate, msjNMEA: msjNMEA, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error update", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"gps information updated", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not gps information updated", data: null});
                    }
                });
            }
        )
    },
    getGPS: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_getGps,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error get", data: null});

                    if(result.length !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"gps Data", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not found gps data", data: null});
                    }
                });
            }
        )
    }
};