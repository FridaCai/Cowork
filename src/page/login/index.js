import './style.less';
import Input from 'Input';
import {API, PAGE_ENUM} from 'API';

var LoginView = React.createClass({
	getInitialState: function() {
        return {
        }
    },
    componentDidMount: function(){
       API.signal_login_response.listen(this._onLoginResponse);
    },
    _onLoginResponse: function(e, value){
        API.curPage = PAGE_ENUM.GridPage;
        API.signal_page_navigate.dispatch();
    },
    componentWillUnmount: function(){

    },
    onOK: function(){
    	var loginUser = this.refs.takenByInput.getValue();;
    	if(!loginUser){
    		alert('Please enter login user!');
    		return;
    	}
        API.login(loginUser);
    },
    render: function() {
    	return (
            <div className='login'>
                <label>Who are u?</label>
                <Input ref='takenByInput' param={{}}/>
                <button onClick={this.onOK}>OK</button>
            </div>
		);
    }
});

module.exports = LoginView;
