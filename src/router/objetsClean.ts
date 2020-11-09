import { Router, Request, Response } from 'express';
import { ajax } from 'rxjs/ajax';
import { urlPOST, headers, createXHR } from '../utils/utils';
import { timeout, retry } from 'rxjs/operators';

const obj = Router();

obj.post('/cleanObject', (req:Request, res:Response) => {
    const { boolClean, object, cleanLog} = req.body;

    const body = {
        "to": "bqyctzwgj",
        "data": [{
              "6": { "value": boolClean },
              "7": { "value": object    },
              "9": { "value": cleanLog  }
        }]
    };

    ajax({ createXHR, url: urlPOST, method: 'POST', body, headers}).pipe(
        timeout(60000),
        retry(5)
    ).subscribe(resp => {

        resp.status === 207 ? res.json(resp.response.metadata.lineErrors) :
        resp.status === 200 ? res.json({status: 200, message: 'Registro(s) guardado correctamente.'}) : null;

    }, err => {
        res.json({
            status: err.status,
            respuesta: err.response
        });
    });
});

export default obj;