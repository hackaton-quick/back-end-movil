"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../utils/utils");
const ajax_1 = require("rxjs/ajax");
const operators_1 = require("rxjs/operators");
const log = express_1.Router();
log.get('/log/:idUser/:fecha', (req, res) => {
    // const {idUser, idSafeArea, fecha} = req.body;
    const idUser = req.params.idUser;
    const fecha = req.params.fecha;
    let data = [];
    const args = {
        "from": "bqxy2eeke",
        "select": [1, 3, 8, 9, 10],
        "where": `{11.EX.${fecha}}AND{6.EX.${idUser}}`
    };
    const $obs1 = ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.urlGET, method: 'POST', headers: utils_1.headers, body: args }).pipe(operators_1.timeout(60000), operators_1.retry(5));
    $obs1.subscribe(resp => {
        for (let it2 of resp.response.data) {
            data.push(utils_1.crearJSONS(resp.response.fields, it2));
        }
        resp.status === 200 ? res.json({ status: 200, response: data }) : null;
    }, err => {
        res.json({
            status: err.status,
            response: err.response
        });
    });
});
log.post('/log', (req, res) => {
    const { idUser, idSafeArea } = req.body;
    let data = [];
    const body = {
        "to": "bqxy2eeke",
        "data": [{
                "6": { "value": idUser },
                "7": { "value": idSafeArea },
            }]
    };
    ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.urlPOST, method: 'POST', headers: utils_1.headers, body }).pipe(operators_1.timeout(60000), operators_1.retry(5)).subscribe(resp => {
        resp.status === 200 ? res.json({ status: 200, message: 'Registro guardado correctamente.' }) : null;
    }, err => {
        res.json({
            status: err.status,
            response: err.response
        });
    });
});
exports.default = log;
