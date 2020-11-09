"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ajax_1 = require("rxjs/ajax");
const utils_1 = require("../utils/utils");
const operators_1 = require("rxjs/operators");
const clean = express_1.Router();
clean.post('/clean', (req, res) => {
    const info = req.body;
    let data = [];
    !Array.isArray(info) ? res.json({ status: 400, message: 'Se necesita un arreglo para insertar información.' }) : null;
    for (const item of info) {
        data.push({
            "7": { "value": item.appUser },
            "8": { "value": item.safeArea },
            "11": { "value": item.key }
        });
    }
    const body = {
        "to": "bqyctsc8q",
        "data": data
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
exports.default = clean;
