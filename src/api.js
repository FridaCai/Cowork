import Signal from 'Signal';

var PAGE_ENUM = {
    LoginPage: Symbol(),
    GridPage: Symbol()
};

var API = {
	signal_page_navigate: new Signal(),
	signal_coworkerlist_update: new Signal(),
    signal_login_response: new Signal(),
    signal_logout_response: new Signal(),
    signal_grid_update: new Signal(),
    signal_grid_create: new Signal(),
	
	curPage: PAGE_ENUM.LoginPage,

	connection: null,

    MSG_TYPE_SEND: {
        'login': 'login',
        'logout': 'logout',
        'setId': 'setId',
        'getGrid': 'getGrid',
        'gridFocus': 'gridFocus',
        'gridBlur': 'gridBlur',
        'gridChange': 'gridChange'
        
    },
    MSG_TYPE_RECEIVE: {
        'coworkerlist': 'coworkerlist',
        'loginResponse': 'loginResponse',
        'logoutResponse': 'logoutResponse',
        'getGrid': 'getGrid',
        'updateGrid': 'updateGrid'
    },

    coworkerlist: [],
    loginUser: null,

    connect: function(random){
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        this.connection = new WebSocket('ws://127.0.0.1:8081', 'echo-protocol');

        this.connection.onopen = (function () {
            var obj = {
                type: API.MSG_TYPE_SEND.setId,
                value: random
            }
            this.connection.send(JSON.stringify(obj));
        }).bind(this);

        this.connection.onerror = (function (error) {
            alert('backend error');
        }).bind(this);

        this.connection.onmessage = (function (message) {
            try {
                var {type, value} = JSON.parse(message.data);

                switch(type){
                    case API.MSG_TYPE_RECEIVE.coworkerlist:
                        API.coworkerlist = value;
                        API.signal_coworkerlist_update.dispatch();
                        break;
                    case API.MSG_TYPE_RECEIVE.loginResponse:
                        API.loginUser = value;
                        API.signal_login_response.dispatch(value);
                        break;
                    case API.MSG_TYPE_RECEIVE.getGrid:
                        API.signal_grid_create.dispatch(value);
                        break;
                    case API.MSG_TYPE_RECEIVE.updateGrid:
                        API.signal_grid_update.dispatch(value);
                        break;
                }
            } catch (e) {
                console.log(e.stack);
            }
        }).bind(this);
    },
    login: function(loginUser){
        var obj = {
            type: API.MSG_TYPE_SEND.login,
            value: loginUser
        }
        this.connection.send(JSON.stringify(obj));
    },
    logout: function(loginUser){
        var obj = {
            type: API.MSG_TYPE_SEND.logout,
            value: loginUser
        }
        this.connection.send(JSON.stringify(obj));
    },
    getGrid: function(){
        var obj = {
            type: API.MSG_TYPE_SEND.getGrid
        }
        this.connection.send(JSON.stringify(obj));
    },
    gridFocus: function(line, column){
        var obj = {
            type: API.MSG_TYPE_SEND.gridFocus,
            value: {
                line: line,
                column: column
            }
        }
        this.connection.send(JSON.stringify(obj));
    },
    gridBlur: function(line, column){
        var obj = {
            type: API.MSG_TYPE_SEND.gridBlur,
            value: {
                line: line,
                column: column
            }
        }
        this.connection.send(JSON.stringify(obj));
    },
    gridChange: function(line, column, value){
        var obj = {
            type: API.MSG_TYPE_SEND.gridChange,
            value: {
                line: line,
                column: column, 
                value: value
            }
        }
        this.connection.send(JSON.stringify(obj));
    }
}

exports.API = API;
exports.PAGE_ENUM = PAGE_ENUM;