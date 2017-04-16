/**
 * Created by sbv23 on 16/04/2017.
 */
const db = require('../db/connection');
const sqlQuery = require('../sql/sql_api');
const template = require('es6-template-strings');
const config = require('../config');
const functions = require('../functions');

module.exports = {
    verifyRTC: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_verifyRtc,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        if(result[0].counter !== 0){
                            fullfill({hcode: 200 ,code: "003", msg:"Already rtc information registered", data: null});
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
    registerRTC: function (pk_sensor, status, descript, dateHour, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_registerRtc,{pk_sensor: pk_sensor, status: status, descript: descript, dateHour: dateHour, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"rtc information registered", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not rtc information registered", data: null});
                    }
                });
            }
        )
    },
    updateRTC: function (pk_sensor, status, descript, dateHour, error) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_updateRtc,{pk_sensor: pk_sensor, status: status, descript: descript, dateHour: dateHour, error: error, date: functions.datetime()}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error update", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"rtc information updated", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not rtc information updated", data: null});
                    }
                });
            }
        )
    },
    getRTC: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_getRtc,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error get", data: null});

                    if(result.length !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"rtc Data", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not found rtc data", data: null});
                    }
                });
            }
        )
    }
};