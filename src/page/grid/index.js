import GridView from './grid';
import CoWorkerList from './coworkerlist';
import LoginUser from './loginuser';
import './style.less';

var MainView = React.createClass({
	getInitialState: function() {
        return {
        }
    },
    componentDidMount: function(){
    },

    componentWillUnmount: function(){

    },
   
    render: function() {
    	return (
            <div>
                <LoginUser/>
                <CoWorkerList/>
                <GridView/>
            </div>
		);
    }
});

module.exports = MainView;