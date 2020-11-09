"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ajax_1 = require("rxjs/ajax");
const utils_1 = require("../utils/utils");
const operators_1 = require("rxjs/operators");
const objects = express_1.Router();
objects.get('/objects', (req, res) => {
    const { id } = req.body;
    const args = {
        "from": "bqxyzr7bb",
        "select": [10, 7, 6, 12, 8],
        "where": `{12.EX.${id}}`
    };
    ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.urlGET, method: 'POST', headers: utils_1.headers, body: args }).pipe(operators_1.timeout(60000), operators_1.retry(5)).subscribe(resp => {
        let data = [];
        for (const it2 of resp.response.data) {
            Object.keys(it2).forEach(val => {
                for (const it1 of resp.response.fields) {
                    if (val === String(it1.id)) {
                        data.push([String(it1.label).replace(/[ #]/g, "_"), it2[val]["value"]]);
                    }
                }
            });
        }
        res.json(data);
    }, err => {
        res.json({
            status: err.status,
            response: err.response
        });
    });
});
exports.default = objects;
