import Server from './server/server';
import login from './router/login';
import clean from './router/cleaningLog';
import obj from './router/objetsClean';
import objects from './router/objects';

 const port = process.env.PORT || 3005;
 const server = Server.init(Number(port));

 server.app.use(login);
 server.app.use(clean);
 server.app.use(obj);
 server.app.use(objects);

 server.start( () => {
     console.log('Servidor corriendo ' + Number(port));
 });