import {API} from 'API';
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
							return (<div key={user} className="coworker">{user}</div>)
						})	
					}
				</div>
			
			</div>
		)
	}
})
module.exports = CoWorkerList;