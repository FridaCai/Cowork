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

	
	curPage: PAGE_ENUM.LoginPage,


	connection: null,
    

    MSG_TYPE_SEND: {
        'login': 'login',
        'logout': 'logout',
        
    },
    MSG_TYPE_RECEIVE: {
        'coworkerlist': 'coworkerlist',
        'loginResponse': 'loginResponse',
        'logoutResponse': 'logoutResponse'
    },

    coworkerlist: [],
    loginUser: null,

    connect: function(){
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        this.connection = new WebSocket('ws://127.0.0.1:8081', 'echo-protocol');


        this.connection.onopen = function () {
            console.log('open');
        };

        this.connection.onerror = function (error) {
            alert('backend error');
        };

        this.connection.onmessage = (function (message) {
            try {
                var {type, value} = JSON.parse(message.data);

                switch(type){
                    case this.MSG_TYPE_RECEIVE.coworkerlist:
                        API.coworkerlist = value;
                        API.signal_coworkerlist_update.dispatch();
                        break;
                    case this.MSG_TYPE_RECEIVE.loginResponse:
                        API.loginUser = value;
                        API.signal_login_response.dispatch(value);
                        break;
                }
            } catch (e) {
                console.log(e.message);
            }
        }).bind(this);
    },
    login: function(loginUser){
        var obj = {
            type: this.MSG_TYPE_SEND.login,
            value: loginUser
        }
        this.connection.send(JSON.stringify(obj));
    },
    logout: function(loginUser){
        var obj = {
            type: this.MSG_TYPE_SEND.logout,
            value: loginUser
        }
        this.connection.send(JSON.stringify(obj));
    }
}

exports.API = API;
exports.PAGE_ENUM = PAGE_ENUM;