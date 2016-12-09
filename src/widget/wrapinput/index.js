import Input from 'Input';
import Util from 'Util';
import './style.less';

var WrapInput = React.createClass({
	getInitialState(){
		return {
			status: this.props.param.status,
			user: this.props.param.user,
			value: this.props.param.label,
		}
	},
	getValue(){
		return this.refs.input.getValue();
	},

	render(){
		var style = {};
		var hint = '';
		var user = this.state.user;
		if(Object.keys(user).length != 0 && this.state.status != 3){
			style = {borderColor: Util.convertIntColorToHex(user.color)};
			hint = user.name;
		}

		var param = {
			value: this.state.value,
			onChange: this.props.param.onChange,
			onBlur: this.props.param.onBlur,	
			onFocus: this.props.param.onFocus,
			scope: this.props.param.scope,
			isReadOnly: this.props.param.isReadOnly,
			className: this.props.param.className,
			style: style
		}
        return (
        	<div className='wrapInput'>
        		<Input param={param}/>
        		<label>{hint}</label>
        	</div>
            
        )
	}
})
module.exports = WrapInput;

