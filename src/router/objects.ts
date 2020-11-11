import { Router, Request, Response } from 'express';
import { ajax } from 'rxjs/ajax';
import { urlGET, headers, createXHR, crearJSONS } from '../utils/utils';
import { timeout, retry } from 'rxjs/operators';

const objects = Router();

objects.get('/objects/:id', (req:Request, res:Response) => {

    const id = req.params.id;

    const args = {
        "from": "bqxyzr7bb",
        "select": [ 10,7,6,12,8 ],
        "where": `{12.EX.${id}}`
    };

    ajax({ createXHR, url: urlGET, method: 'POST', headers, body: args }).pipe(
        timeout(60000),
        retry(5)
    ).subscribe( resp => {
        let data = [];

        for (let it2 of resp.response.data) {
            data.push(crearJSONS(resp.response.fields, it2));
        }

        res.json( data  );

    }, err => {
        res.json({
            status: err.status,
            response: err.response
        });
    });

});

export default objects;