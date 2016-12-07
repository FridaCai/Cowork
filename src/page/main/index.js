import './style.less';
import LoginView from '../login/index';
import GridView from '../grid/index';
import {API, PAGE_ENUM} from 'API';

var MainView = React.createClass({
	getInitialState: function() {
        return {
        }
    },
    componentDidMount: function(){
        this._onPageRefresh();
        API.signal_page_navigate.listen(this._onPageRefresh);
    },

    _onPageRefresh: function(){
        var controller = (function(){
            switch(API.curPage){
                case PAGE_ENUM.LoginPage:
                    return LoginView;
                case PAGE_ENUM.GridPage:
                    return GridView;
            }
        })();

        var reactElement = React.createElement(controller);
        ReactDOM.render(reactElement, this.refs.page);
    },
    componentWillUnmount: function(){
        API.signal_page_navigate.unlisten(this._onPageRefresh);
    },
    render: function() {
    	return (
            <div ref='page'></div>
		);
    }
});

module.exports = MainView;
