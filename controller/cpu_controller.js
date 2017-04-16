/**
 * Created by sbv23 on 16/04/2017.
 */
const db = require('../db/connection');
const sqlQuery = require('../sql/sql_api');
const template = require('es6-template-strings');
const config = require('../config');
const functions = require('../functions');

module.exports = {
    verifyCPU: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_verifyCpu,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        if(result[0].counter !== 0){
                            fullfill({hcode: 200 ,code: "003", msg:"Already cpu information registered", data: null});
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
    registerCPU: function (pk_sensor, status, descript, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_registerCpu,{pk_sensor: pk_sensor, status: status, descript: descript, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"cpu information registered", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not cpu information registered", data: null});
                    }
                });
            }
        )
    },
    updateCPU: function (pk_sensor, status, descript, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_updateCpu,{pk_sensor: pk_sensor, status: status, descript: descript, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error update", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"cpu information updated", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not cpu information updated", data: null});
                    }
                });
            }
        )
    },
    getCPU: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_getCpu,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error get", data: null});

                    if(result.length !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"cpu Data", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not found cpu data", data: null});
                    }
                });
            }
        )
    }
};