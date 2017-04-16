/**
 * Created by sbv23 on 08/12/2016.
 */

const template = require('es6-template-strings');
const config = require('./config');

exports.msg = function msg(code, msg, data) {
    return template(config.struct_msg,{code: code, msg: msg, data: data});
};

