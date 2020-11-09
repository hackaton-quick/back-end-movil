"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ajax_1 = require("rxjs/ajax");
const utils_1 = require("../utils/utils");
const operators_1 = require("rxjs/operators");
const obj = express_1.Router();
obj.post('/cleanObject', (req, res) => {
    const { boolClean, object, cleanLog } = req.body;
    const body = {
        "to": "bqyctzwgj",
        "data": [{
                "6": { "value": boolClean },
                "7": { "value": object },
                "9": { "value": cleanLog }
            }]
    };
    ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.urlPOST, method: 'POST', body, headers: utils_1.headers }).pipe(operators_1.timeout(60000), operators_1.retry(5)).subscribe(resp => {
        resp.status === 207 ? res.json(resp.response.metadata.lineErrors) :
            resp.status === 200 ? res.json({ status: 200, message: 'Registro(s) guardado correctamente.' }) : null;
    }, err => {
        res.json({
            status: err.status,
            respuesta: err.response
        });
    });
});
exports.default = obj;
