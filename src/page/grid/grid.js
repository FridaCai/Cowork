import Input from 'Input';

var GridView = React.createClass({
	getInitialState: function() {
        return {
            lineNum: this.props.lineNum || 3,
            columnNum: this.props.columnNum || 3
        }
    },
    componentDidMount: function(){
       //Request.connect to server
       //send login user

       //component did unmount
       //logout user.

       //focus: occupy grid.

       //change: change grid value.

       //blur: release grid.

       //server will notify all clients when grid is taken.
    },

    componentWillUnmount: function(){

    },
    _getLine: function(lineIndex){
        var dom = [];
        for(let j=0; j<this.state.columnNum; j++){
            var label = `${lineIndex}${j}`;
            let key = `td_${j}`;
            let param = {
                value: label,
                onChange: function(value){
                    console.log(`${lineIndex}${j}: onChange. value: ${value}.`);
                },
                onBlur: function(){
                    console.log(`${lineIndex}${j}: onBlur.`);
                },
                onFocus: function(){
                    console.log(`${lineIndex}${j}: onFocus.`);
                },
                scope: this,
                isReadOnly: false,
                className: ''
            };
            dom.push(
                <td key={key}><Input param={param}/></td>
            )
        }
        return dom;
    },
    _getBody: function(){
        var dom = [];
        for(let i=0; i<this.state.lineNum; i++){
            let key = `tr_${i}`;
            dom.push(<tr key={key}>
                {this._getLine(i)}
            </tr>)   
        }
        return dom;
    },
    render: function() {
    	return (
            <table className="gridview">
              <tbody>
                  {this._getBody()}
              </tbody>
            </table>
		);
    }
});

module.exports = GridView;