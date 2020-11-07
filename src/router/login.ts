import { Router, Request, Response } from "express";
import { ajax } from 'rxjs/ajax';
import { createXHR, headers, url, crearJSON } from '../utils/utils';
import { pluck, timeout, retry } from 'rxjs/operators';
import { ErrorQuick, Respuesta } from '../interfaces/interfaces';

const login = Router();

login.get('/login', (req:Request, res:Response) => {
    
    const { correo, contrasena } = req.body;

    if( correo == null ) {
        res.json({ message: "Falta correo" })
    } else if( contrasena == null ) {
        res.json({ message: "Falta contraseña" })
    } else {
        const args = {
            "from": "bqxxn48j6",
            "select": [ 3,6,7,19,28,30,31,32,33,34,35 ],
            "where": `{24.EX.${correo}}AND{25.EX.${contrasena}}`
        };
    
        ajax({  createXHR,  url, method: 'POST', headers, body: args}).pipe(
            timeout(60000),
            retry(5),
        ).subscribe( (resp) => {

            resp.response.data.length < 1 ? res.json({
                mensaje: 'No se encontro un usuario en la base de datos, verificar usuario y contraseña por favor.'
            }) : !resp.response.data[0][28].value ? res.json({mensaje: 'El usuario no esta autorizado'}) :
            res.json(Object.fromEntries(crearJSON(resp)));
    
        }, (errr:ErrorQuick) => {
            res.json({
                status: errr.status,
                respuesta: errr.response
            });
        });    
    }
});

export default login;