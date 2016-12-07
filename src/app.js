import MainView from './page/main/index.js';
import {API} from 'API';

ReactDOM.render(<MainView/>, $("#domContainer")[0]);
API.connect();

