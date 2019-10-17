export default {

	install (Vue, options) {
  
	  	Vue.prototype.$BinanceConnect = function (binance_symbol) {
	    	
	  		let url = "wss://stream.binance.com:9443/ws/" + binance_symbol.toLowerCase() + "@depth@1000ms";


	  		if ( window.socket ) {

	  			window.socket.close(1000, 'ConnectionClosed');

	  			window.socket = new WebSocket(url);

	  		} else {

	  			window.socket = new WebSocket(url);

	  		}
	  	  		

	  		window.socket.onopen = function() {

			  console.log("Connected.");

			};

			window.socket.onclose = function(event) {

			  if (event.wasClean) {

			    console.log('Connection closed clean');

			  } else {

			    console.log('Connection lost');

			  }

			  console.log('Code: ' + event.code + ' reason: ' + event.reason);

			};


			window.socket.onerror = function(error) {

			  console.log("Error " + error.message);

			};


	  	}

	  	Vue.prototype.$BinanceClose = function() {
	  		
	  		window.socket.close(1000, 'ConnectionClosed');

	  	};	

	  	Vue.prototype.$BinanceTest = function (methodOptions) {
	    
	  		alert('hello world');

	  	}

	}
}




