//find on grid in 9 by random.
//not a readonly grid. decide by webserver: socked.
//focus, change, blur.

var system = require('system');
var page = require('webpage').create();


if(system.args.length === 1){
	console.log('Usage: test/index.js <URL>');
	phantom.exit(1);
}

console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';

var url = system.args[1];

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.open(url, function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
    phantom.exit(1);
  } else {
  	page.includeJs("http://localhost:8080/node_modules/jquery/dist/jquery.js", function() {
  		page.evaluate(function(){

  			var gridNum = 9;

  			var _$ = function(trIndex, tdIndex){
				var selector = "tr:nth-child($trIndex) td:nth-child($tdIndex) input"
					.replace('$trIndex', trIndex+1)
					.replace('$tdIndex', tdIndex+1);
				return $(selector);
			}

			var getRandomChar = function(){
				var fro = 33;
				var to = 126;
				var random = fro + Math.floor((to-fro)*Math.random());
				return String.fromCharCode(random);
			}

    		setInterval(function(){
				var random = Math.floor(Math.random() * gridNum);
				var trIndex = Math.floor(random / 3);
				var tdIndex = random % 3;

				console.log(trIndex.toString() + tdIndex.toString() + ": focus");
				_$(trIndex, tdIndex).focus();	
				
				setTimeout(function(){
					var val = _$(trIndex, tdIndex).val() + getRandomChar();
					console.log(trIndex.toString() + tdIndex.toString() + ": change. " + val);
					_$(trIndex, tdIndex).val(val);
				}, 2000)

				setTimeout(function(){
					console.log(trIndex.toString() + tdIndex.toString() + ": blur");
					_$(trIndex, tdIndex).blur();	
					console.log('=========================');
				}, 4000);
    		}, 10000);
	    });
  	})
    
  }
  
});