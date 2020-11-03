import Server from './server/server';
import login from './router/login';

const port = process.env.PORT || 3005;
 const server = Server.init(Number(port));
 server.app.use(login);

 server.start( () => {
     console.log('Servidor corriendo ' + Number(port));
 });