export default {

	state:{

		binance_symbol: "BNBBTC",

		symbol_changes: [],

		active_menu: 1,

		binance_stream_changes: [],

	},

	mutations: {

		symbol_changed(state, payload) {
	      	
	      	state.binance_symbol = payload.binance_symbol;

	      	let time = new Date();

	      	let change_message = payload.binance_symbol + ' is selected ( ' + time + ' )';

	      	state.symbol_changes.unshift(change_message);

    	},

    	menu_selected(state, payload) {

    		state.active_menu = payload.current_menu;

    	},

    	SOCKET_binance_data_changed(state, payload) {

    			state.binance_stream_changes.push(payload.data);

    	}

	},

	getters: {},

	actions: {}

}