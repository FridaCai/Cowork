import Input from 'Input';
import WrapInput from 'WrapInput';
import {API} from 'API';

var GridView = React.createClass({
    focusLine: -1,
    focusColumn: -1,

	getInitialState: function() {
        return {
            grid: undefined
        }
    },
    componentDidMount: function(){
        API.getGrid(); //todo.
        API.signal_grid_create.listen(this._createGrid);
        API.signal_grid_update.listen(this._updateGrid);
    },

    componentWillUnmount: function(){
        API.signal_grid_create.unlisten(this._createGrid);
        API.signal_grid_update.unlisten(this._updateGrid);
    },

    _createGrid: function(e, param){
        this.setState({grid: param});
    },


    _updateGrid: function(e, grids){
        grids.map((function(row, i){
            row.map((function(cell, j){
                if(i === this.focusLine && j === this.focusColumn){
                    //do nothing
                }else{
                    var {status, user, label} = cell;
                    var refKey = `grid${i}${j}`;
                    this.refs[refKey].setState({
                        status: status,
                        user: user,
                        value: label
                    });
                }
            }).bind(this))
        }).bind(this))



        //console.log(param);

        //todo: update gird seperately, rather than set state and update all.


        //ignore editing grid. check editing grid status with backend data. whether there is error? 

        //init status, obtain grid data from server.
    },


    _getLine: function(lineIndex){
        var dom = [];
        var column = this.state.grid[lineIndex];

        for(let j=0; j<column.length; j++){
            var key = `${lineIndex}${j}`;
            
            var {status, label, user} = column[j];

            let param = {
                status: status,
                label: label,
                user: user,
                 
                onChange: (function(value){
                    API.gridChange(lineIndex, j, value);
                }).bind(this),
                onBlur: (function(){
                    this.focusLine = -1;
                    this.focusColumn = -1;
                    API.gridBlur(lineIndex, j);
                }).bind(this),
                onFocus: (function(){
                    this.focusLine = lineIndex;
                    this.focusColumn = j;

                    API.gridFocus(lineIndex, j);
                }).bind(this),
                scope: this,
                isReadOnly: false,
                className: ''
            };

            var ref = `grid${lineIndex}${j}`;
            dom.push(
                <td key={key}><WrapInput ref={ref} param={param}/></td>
            )
        }
        return dom;
    },
    _getBody: function(){
        var dom = [];
        var lineNum = this.state.grid.length;

        for(let i=0; i<lineNum; i++){
            let key = `tr_${i}`;
            dom.push(<tr key={key}>
                {this._getLine(i)}
            </tr>)   
        }
        return dom;
    },
    render: function() {
        if(!this.state.grid)
            return null;

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