import { Router, Request, Response } from 'express';
import { urlGET, createXHR, headers, crearJSONS } from '../utils/utils';
import { ajax } from 'rxjs/ajax';
import { timeout, retry } from 'rxjs/operators';

const safe = Router();

safe.get('/safe/:id', (req:Request, res:Response) => {

    const id = req.params.id;
    let data:any[] = [];

    const args = {
        "from": "bqxyzp3ux",
        "select": [ 3,6,9,7,13,8,23 ],
        "where": `{10.EX.${id}}`
    };

    ajax({ createXHR, url: urlGET, method: 'POST', headers, body: args }).pipe(
        timeout(60000),
        retry(5)
    ).subscribe( resp => {

        for (let it2 of resp.response.data) {
            data.push(crearJSONS(resp.response.fields, it2));
        }

        resp.status === 200 ? res.json({    status: 200,    response: data }) : null;
    }, err => {
        res.json({
            status: err.status,
            response: err.response
        });
    });

});

export default safe;