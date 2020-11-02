import { Router, Request, Response } from "express";
import { ajax } from 'rxjs/ajax';
import { createXHR, headers, url } from '../utils/utils';
import { pluck, timeout, retry } from 'rxjs/operators';
import { ErrorQuick } from '../interfaces/interfaces';

const router = Router();

router.get('/login', (req:Request, res:Response) => {
    
    const { correo, contrasena } = req.body;
    const args = {
        "from": "bqxxn48j6",
        "select": [ 6,7,19 ],
        "where": `{24.EX.${correo}}AND{25.EX.${contrasena}}`
    };

    ajax({  createXHR,  url, method: 'POST', headers, body: args}).pipe(
        timeout(60000),
        retry(5),
        pluck('response', 'data')
    ).subscribe( resp => {

        resp.length < 1 ? res.json({
            mensaje: 'No se encontro un usuario en la base de detos, verificar usuario y contraseña por favor.'
        }) : res.json(resp);

    }, (errr:ErrorQuick) => {

        res.json({
            status: errr.status,
            respuesta: errr.response
        });

    });

});

export default router;