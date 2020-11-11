import { Router, Response, Request } from 'express';
import { createXHR, headers, crearJSONS, urlGET } from '../utils/utils';
import { ajax } from 'rxjs/ajax';
import { timeout, retry } from 'rxjs/operators';

const log = Router();

log.post('/log', (req:Request, res:Response) => {

    const {idUser, idSafeArea, fecha} = req.body;
    let data:any[] = [];

    const args = {
        "from": "bqxy2eeke",
        "select": [ 1,3,8,9,10 ],
        "where": `{11.EX.${fecha}}AND{6.EX.${idUser}}`
    };

    const $obs1 = ajax({ createXHR, url: urlGET, method: 'POST', headers, body: args }).pipe(
        timeout(60000),
        retry(5)
    );
    
    $obs1.subscribe( resp => {

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

export default log;