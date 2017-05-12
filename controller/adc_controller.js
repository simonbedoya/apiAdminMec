/**
 * Created by sbv23 on 16/04/2017.
 */
const db = require('../db/connection');
const sqlQuery = require('../sql/sql_api');
const template = require('es6-template-strings');
const config = require('../config');
const functions = require('../functions');

module.exports = {
    verifyADC: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_verifyAdc,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        if(result[0].counter !== 0){
                            fullfill({hcode: 200 ,code: "003", msg:"Already adc information registered", data: null});
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
    registerADC: function (pk_sensor, status, descript, sample, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_registerAdc,{pk_sensor: pk_sensor, status: status, descript: descript, samples: sample, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"adc information registered", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not adc information registered", data: null});
                    }
                });
            }
        )
    },
    updateADC: function (pk_sensor, status, descript, samples, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_updateAdc,{pk_sensor: pk_sensor, status: status, descript: descript, samples: samples, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error update", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"ADC information updated", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not adc information updated", data: null});
                    }
                });
            }
        )
    },
    getADC: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_getAdc,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error get", data: null});

                    if(result.length !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"ADC Data", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not found adc data", data: null});
                    }
                });
            }
        )
    }
};
