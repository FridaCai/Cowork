import MainView from './page/main/index.js';
import {API} from 'API';


ReactDOM.render(<MainView/>, $("#domContainer")[0]);

//for debug
var timestamp = Date.now();
API.connect(timestamp);

$("#domContainer").append(`<div>${timestamp}</div>`);

