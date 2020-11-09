import { Router, Request, Response } from "express";
import { ajax } from "rxjs/ajax";
import { urlPOST, createXHR, headers } from '../utils/utils';
import { retry, timeout } from 'rxjs/operators';

const clean = Router();

clean.post('/clean', (req:Request, res:Response) => {

    const info:any[] = req.body;
    let data:any[] = [];

    !Array.isArray(info) ? res.json({status: 400, message: 'Se necesita un arreglo para insertar información.'}) : null;

    for (const item of info) {
        data.push({
            "7"  : {  "value": item.appUser  },
            "8"  : {  "value": item.safeArea },
            "11" : {  "value": item.key      }
        });
    }

    const body = {
        "to": "bqyctsc8q",
        "data": data
    };

      ajax({ createXHR,  url: urlPOST,   method: 'POST', body,   headers}).pipe(
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

export default clean;