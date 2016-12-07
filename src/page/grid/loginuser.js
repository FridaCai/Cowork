import {API} from 'API';
var LoginUser = React.createClass({
	getInitialState(){
		return {
		};
	},

	componentDidMount(){
	},

	render(){
		var label = `Hi ${API.loginUser}`;
		return (
			<div className='loginUser'>
			    <label>{label}</label>
			    <button>logout</button>
			</div>
		)
	}
})
module.exports = LoginUser;






