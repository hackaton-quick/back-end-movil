"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ajax_1 = require("rxjs/ajax");
const utils_1 = require("../utils/utils");
const operators_1 = require("rxjs/operators");
const login = express_1.Router();
login.get('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const args = {
        "from": "bqxxn48j6",
        "select": [6, 7, 19],
        "where": `{24.EX.${correo}}AND{25.EX.${contrasena}}`
    };
    ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.url, method: 'POST', headers: utils_1.headers, body: args }).pipe(operators_1.timeout(60000), operators_1.retry(5), operators_1.pluck('response', 'data')).subscribe(resp => {
        resp.length < 1 ? res.json({
            mensaje: 'No se encontro un usuario en la base de detos, verificar usuario y contraseña por favor.'
        }) : res.json(resp);
    }, (errr) => {
        res.json({
            status: errr.status,
            respuesta: errr.response
        });
    });
});
exports.default = login;
