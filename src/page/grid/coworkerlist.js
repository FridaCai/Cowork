import {API} from 'API';
import Util from 'Util';

var CoWorkerList = React.createClass({
	getInitialState(){
		return {
			coworkerlist: API.coworkerlist
		};
	},

	componentDidMount(){
		API.signal_coworkerlist_update.listen(this._onUpdate);
	},
	componentWillUnmount(){
		API.signal_coworkerlist_update.unlisten(this._onUpdate);
	},
	_onUpdate(e){
		var coworkerlist = API.coworkerlist;
		this.setState({
			coworkerlist: coworkerlist,
		})
	},

	render(){
		return (
			<div className='coworkerlist'>
				<label>Other Coworkers</label>
				<div className='list'>
					{
						this.state.coworkerlist.map(function(user){
							var name = user.name;
							var color = user.color;

							var style = {
								background: Util.convertIntColorToHex(color)
							};
							return (<div key={name} style={style} className="coworker">{name}</div>)
						})	
					}
				</div>
			
			</div>
		)
	}
})
module.exports = CoWorkerList;