"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ajax_1 = require("rxjs/ajax");
const utils_1 = require("../utils/utils");
const operators_1 = require("rxjs/operators");
const login = express_1.Router();
login.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    if (correo == null) {
        res.json({ status: 400, message: "Falta correo" });
    }
    else if (contrasena == null) {
        res.json({ status: 400, message: "Falta contraseña" });
    }
    else {
        const args = {
            "from": "bqxxn48j6",
            "select": [3, 6, 7, 19, 28, 30, 31, 32, 33, 34, 35],
            "where": `{24.EX.${correo}}AND{25.EX.${contrasena}}`
        };
        ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.urlGET, method: 'POST', headers: utils_1.headers, body: args }).pipe(operators_1.timeout(60000), operators_1.retry(5)).subscribe((resp) => {
            resp.response.data.length < 1 ? res.json({
                status: 400,
                message: 'No se encontro un usuario en la base de datos, verificar usuario y contraseña por favor.'
            }) : !resp.response.data[0][28].value ? res.json({ status: 400, message: 'El usuario no esta autorizado' }) :
                res.json({
                    status: 200,
                    response: Object.fromEntries(utils_1.crearJSON(resp))
                });
        }, (errr) => {
            res.json({
                status: errr.status,
                response: errr.response
            });
        });
    }
});
exports.default = login;
