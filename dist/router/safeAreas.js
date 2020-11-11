"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../utils/utils");
const ajax_1 = require("rxjs/ajax");
const operators_1 = require("rxjs/operators");
const safe = express_1.Router();
safe.get('/safe/:id', (req, res) => {
    const id = req.params.id;
    let data = [];
    const args = {
        "from": "bqxyzp3ux",
        "select": [3, 6, 9, 7, 13, 8],
        "where": `{10.EX.${id}}`
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
exports.default = safe;
