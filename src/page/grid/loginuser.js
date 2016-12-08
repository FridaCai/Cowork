import {API, PAGE_ENUM} from 'API';
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
		var label = `Hi ${API.loginUser}`;
		return (
			<div className='loginUser'>
			    <label>{label}</label>
			    <button onClick={this._onLogout}>logout</button>
			</div>
		)
	}
})
module.exports = LoginUser;






