/**
 * Created by sbv23 on 16/03/2017.
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const response = require('../message');
const config = require('../config');
const functions = require('../functions');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const uploadController = require('../controller/upload_controller');
const async = require('async');
const socketIoClient = require('socket.io-client');

router.post('/file', function (req,res) {
    let form = new formidable.IncomingForm();
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
        let type = fields.type;
        let pk_sensor = req.decoded.pkSensor;
        console.log(JSON.stringify(files));
        if(err) return res.status(500).send(JSON.parse(response.msg("005", "Internal error", null)));

        let arrOut=[];
        async.filter(files, function(file, callback) {
            let file_name_o = file.name.split('.');

            uploadController.verifyExistFile(file_name_o[0], req.decoded.pkSensor, fields.type).then(function (data) {
                if (data.code === "001") {
                    let path_file = data.data.UPLOADPATH;
                    let pk_location = data.data.PK_LOCATION;
                    //no existe archivo insertar registro y subir archivo
                    uploadController.uploadFiles(file, path_file).then(function (data) {
                        if(data.code === "001"){
                            //actualizar registro
                            uploadController.insertFile(req.decoded.pkSensor,data.data.filePath,file_name_o[0],pk_location,fields.type).then(function (data) {
                                if(data.code === "001"){
                                    arrOut.push(data);
                                    callback(null,null);
                                }else{
                                    arrOut.push(data);
                                    callback("error",null);
                                }
                            })
                        }else{
                            arrOut.push(data);
                            callback("error",null);
                        }
                    })
                } else if (data.code === "002") {
                    let path_file = data.data.UPLOADPATH;
                    //existe archivo actualizar registro y reemplazar archivo
                    uploadController.uploadFiles(file, path_file).then(function (data) {
                        if(data.code === "001"){
                            //actualizar registro
                            uploadController.updateFile(req.decoded.pkSensor,data.data.filePath,file_name_o[0],fields.type).then(function (data) {
                                if(data.code === "001"){
                                    arrOut.push(data);
                                    callback(null,null);
                                }else{
                                    arrOut.push(data);
                                    callback("error",null);
                                }
                            })
                        }else{
                            arrOut.push(data);
                            callback("error",null);
                        }
                    })
                } else {
                    //error
                    arrOut.push(data);
                    callback("error",null);
                }
            });
        }, function(err,results) {
            // results now equals an array of the existing files
            console.log("termino", arrOut);
            if (err) return res.status(arrOut[0].hcode).send(JSON.parse(response.msg(arrOut[0].code, arrOut[0].msg, arrOut[0].data)));

            let i;
            let correct = 0;
            for(i in arrOut){
                if(arrOut[i].code === "001"){
                    correct++;
                }
            }
            if(correct === arrOut.length){
                let socket = socketIoClient('socket.plataformamec.com');
                socket.on('connect', function () {
                    socket.emit('uploadFile',`{"pk_sensor": "${pk_sensor}", "type": "${type}"}`);
                    socket.disconnect();
                });

                res.status(200).send(JSON.parse(response.msg("001", "Files inserted correctly", null)));
            }else{
                res.status(202).send(JSON.parse(response.msg("002", "No Files inserted correctly", null)));
            }
        });
    });
});

module.exports = router;
