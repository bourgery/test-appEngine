import App from './App';
import * as http from 'http';

App.set('port', 8080);
const server = http.createServer(App);
server.listen(8080);
