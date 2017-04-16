/**
 * Created by sbv23 on 16/04/2017.
 */
const db = require('../db/connection');
const sqlQuery = require('../sql/sql_api');
const template = require('es6-template-strings');
const config = require('../config');
const functions = require('../functions');

module.exports = {
    verifyAcc: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_verifyAcc,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        if(result[0].counter !== 0){
                            fullfill({hcode: 200 ,code: "003", msg:"Already accelerometer information registered", data: null});
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
    registerAcc: function (pk_sensor, status, descript, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_registerAcc,{pk_sensor: pk_sensor, status: status, descript: descript, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"accelerometer information registered", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not accelerometer information registered", data: null});
                    }
                });
            }
        )
    },
    updateAcc: function (pk_sensor, status, descript, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_updateAcc,{pk_sensor: pk_sensor, status: status, descript: descript, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"Accelerometer information updated", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not accelerometer information updated", data: null});
                    }
                });
            }
        )
    },
    getAcc: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_getAcc,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"ACCELEROMETER Data", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not found accelerometer data", data: null});
                    }
                });
            }
        )
    }
};
