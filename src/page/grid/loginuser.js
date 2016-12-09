import {API, PAGE_ENUM} from 'API';
import Util from 'Util';

var LoginUser = React.createClass({
	getInitialState(){
		return {
		};
	},

	
	_onLogout(){
		API.logout();
		API.curPage = PAGE_ENUM.LoginPage;
		API.signal_page_navigate.dispatch();
	},
	render(){
		var user = API.loginUser;

		var label = user.name;
		var color = Util.convertIntColorToHex(user.color);

		var style = {
			background: color,
			width: '5px',
			height: '5px'
		}

		return (
			<div className='loginUser'>
			    <label>Hi <span style={style}>{label}</span></label>
			    <button onClick={this._onLogout}>logout</button>
			</div>
		)
	}
})
module.exports = LoginUser;






