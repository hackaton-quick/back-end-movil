import { Router, Request, Response } from 'express';
import { ajax } from 'rxjs/ajax';
import { urlGET, headers, createXHR, crearJSON } from '../utils/utils';
import { timeout, retry } from 'rxjs/operators';

const objects = Router();

objects.get('/objects', (req:Request, res:Response) => {

    const {id} = req.body;

    const args = {
        "from": "bqxyzr7bb",
        "select": [ 10,7,6,12,8 ],
        "where": `{12.EX.${id}}`
    };

    ajax({ createXHR, url: urlGET, method: 'POST', headers, body: args }).pipe(
        timeout(60000),
        retry(5)
    ).subscribe( resp => {

        let data:any[] = [];

        for (const it2 of resp.response.data ) {
            Object.keys(it2).forEach(val => {
                for (const it1 of resp.response.fields) {
                    if(val === String(it1.id)) {
                        data.push([String(it1.label).replace(/[ #]/g, "_"), it2[val]["value"]]);
                    }
                }
            });
        }

        res.json( data);

    }, err => {
        res.json({
            status: err.status,
            response: err.response
        });
    });

});

export default objects;