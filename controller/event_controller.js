/**
 * Created by sbv23 on 01/05/2017.
 */
const db = require('../db/connection');
const sqlQuery = require('../sql/sql_api');
const template = require('es6-template-strings');
const config = require('../config');
const functions = require('../functions');

module.exports = {
    verifyEVENT: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_verifyEvent,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.length !== 0){
                        if(result[0].counter !== 0){
                            fullfill({hcode: 200 ,code: "003", msg:"Already events information registered", data: null});
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
    registerEVENT: function (pk_sensor,d_w_sta,d_w_lta,t_on,t_off,d_pre,d_pos,d_min) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_registerEvent,{pk_sensor: pk_sensor, d_w_sta: d_w_sta, d_w_lta: d_w_lta, t_on: t_on, t_off: t_off, d_pre: d_pre, d_pos: d_pos, d_min:d_min}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error insert", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"events information registered", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not events information registered", data: null});
                    }
                });
            }
        )
    },
    updateEVENT: function (pk_sensor,d_w_sta,d_w_lta,t_on,t_off,d_pre,d_pos,d_min) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_updateEvent,{pk_sensor: pk_sensor, d_w_sta: d_w_sta, d_w_lta: d_w_lta, t_on: t_on, t_off: t_off, d_pre: d_pre, d_pos: d_pos, d_min:d_min}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error update", data: null});

                    if(result.rowsAffected !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"events information updated", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not events information updated", data: null});
                    }
                });
            }
        )
    },
    getEVENT: function (pk_sensor) {
        return new Promise(
            function (fullfill) {
                db.query(template(sqlQuery.query_getEvent,{pk_sensor: pk_sensor}), function (err, result) {
                    if (err) return fullfill({hcode: 500, code: "005", msg: "Internal error get", data: null});

                    if(result.length !== 0){
                        fullfill({hcode: 200 ,code: "001", msg:"events Data", data: null});
                    }else{
                        fullfill({hcode: 202 ,code: "002", msg: "Not found events data", data: null});
                    }
                });
            }
        )
    }
};