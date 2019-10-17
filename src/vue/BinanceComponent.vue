<template>
	
	<div class="m-0 px-2" id="binance_block">

		<div class="text-center " v-if="+asks.length ===  0">{{binance_symbol + ' is loading..'}}</div>

		<div class="text-center" v-if="asks.length > 0 || bids.length > 0" >{{binance_symbol}}</div>
		
		<div 

			v-if="+asks.length ===  0"  

			class="text-center my-5"

		>

			<div  class="spinner-border align-self-center" role="status">
					
				<span class="sr-only">Loading..</span>

			</div>

		</div>
		
		<div 

			v-if="asks.length > 0 || bids.length > 0" 

			class="row w-100 m-0 text-center" id="data-header"

		>
				
			<div class="col-6 m-0 p-0">

				<div class="row m-0 p-0">

					<div class="col-6 col-sm-4 border bg-white m-0 p-0 py-2">Amount</div>

					<div class="col-6 col-sm-4 border bg-white m-0 p-0 py-2">Price</div>

					<div class="col-4 border d-none d-sm-block bg-white m-0 p-0 py-2">Total</div>

				</div>		

			</div>

			<div class="col-6 m-0 p-0">

				<div class="row m-0 p-0">

					<div class="col-6 col-sm-4 border bg-white p-0 m-0 py-2">Amount</div>

					<div class="col-6 col-sm-4 border bg-white p-0 m-0 py-2">Price</div>

					<div class="col-4 border d-none d-sm-block bg-white p-0 m-0 py-2">Total</div>

				</div>				

			</div>			

		</div>

		
		<div 

			v-if="asks.length > 0 || bids.length > 0" 

			class="row w-100 m-0 text-center" 

			id="data-list" 

			@mouseout="adjust_width_no_scrollbar" 

			@mouseover="adjust_width_with_scrollbar"

		>
			
			<div class="col-6 m-0 p-0">
				
				<div class="row m-0 p-0" v-for="ask in asks">
					
					<div class="col-6 col-sm-4 border bg-white p-0 m-0">{{ask[0]}}</div>

					<div class="col-6 col-sm-4 border bg-white p-0 m-0">{{ask[1]}}</div>

					<div class="col-4 border d-none d-sm-block bg-white p-0 m-0">{{ ask[2]}}</div>

				</div>

			</div>


			<div class="col-6 m-0 p-0">
				
				<div class="row m-0 p-0"   v-for="bid in bids">
					
					<div class="col-6 col-sm-4 border bg-white m-0 p-0">{{bid[0]}}</div>

					<div class="col-6 col-sm-4 border bg-white m-0 p-0">{{bid[1]}}</div>

					<div class="col-4 border d-none d-sm-block bg-white m-0 p-0">{{bid[2]}}</div>	

				</div>

			</div>

		</div>


	</div>

</template>

<script>
	
	export default {

		name: 'binance-component',	

		created() {

			this.load_data();

			this.$store.commit('menu_selected', {

				current_menu: 1,

			});

		},

		mounted() {
			
			window.addEventListener('resize', this.adjust_height);


			this.$BinanceConnect(this.binance_symbol);

			this.add_socket_listener();

			let vm = this;

			this.$store.subscribe((mutation, state) => {

				if ( mutation.type === 'symbol_changed' ) {

					let binance_symbol = mutation.payload.binance_symbol;

					vm.reload_data();

					vm.$BinanceConnect(binance_symbol);

					vm.add_socket_listener();

				}

				if ( mutation.type === 'menu_selected' ) {

					if ( +mutation.payload.current_menu === 1 ) {

						setTimeout(()=>vm.set_height(), 0);
					
						setTimeout(()=>vm.adjust_width_with_scrollbar(), 0);

						setTimeout(()=>vm.adjust_font_size(), 0);

						window.addEventListener('resize', this.adjust_height);

					} else {

						window.removeEventListener('resize', this.adjust_height);

					}

				}

			});

		},

		beforeDestroy() {

			window.removeEventListener('resize', this.adjust_height);

		},

		data: function() {

			return {

				data: '',

				asks: [],

				bids: [],

			
				limit: 500,


				width_diff: 0,


				clientWidth: document.documentElement.clientWidth,


			}

		},

		computed: {

		    binance_symbol() {


		      	return this.$store.state.binance_symbol;

		    }

		 },

		methods: {

			load_data: function() {				

				let url = 'https://cors-anywhere.herokuapp.com/https://www.binance.com/api/v1/depth?symbol=' + this.binance_symbol + '&limit=' + this.limit;
				
				axios.get(url)

				.then( response => {					

					//console.log(response.data);

					this.asks = response.data['asks'];

					this.bids = response.data['bids'];


					this.asks.map( item => {

						item[0] = (+item[0]).toFixed(6);						

						item[1] = (+item[1]).toFixed(2);

						let price = (item[0] * item[1]).toFixed(3)

						item.push(price);

					});

					this.bids.map( item => {

						item[0] = (+item[0]).toFixed(6);						

						item[1] = (+item[1]).toFixed(2);

						let price = (item[0] * item[1]).toFixed(3)

						item.push(price);

					});


					//console.log(this.asks);


				})

				.catch( error => {

					console.log(error);

				})

				.finally ( () => {

					//setTimeout( () => this.adjust_width(), 5000);

					this.set_height();
					
					this.adjust_width_with_scrollbar();

					this.adjust_font_size();

				});

							
			},

			reload_data: function() {

				this.asks = [];

				this.bids = [];

				let url = 'https://cors-anywhere.herokuapp.com/https://www.binance.com/api/v1/depth?symbol=' + this.binance_symbol + '&limit=' + this.limit;
				
				axios.get(url)

				.then( response => {					

					//console.log(response.data);

					this.asks = response.data['asks'];

					this.bids = response.data['bids'];


					this.asks.map( item => {

						item[0] = (+item[0]).toFixed(6);						

						item[1] = (+item[1]).toFixed(2);

						let price = (item[0] * item[1]).toFixed(3)

						item.push(price);

					});

					this.bids.map( item => {

						item[0] = (+item[0]).toFixed(6);						

						item[1] = (+item[1]).toFixed(2);

						let price = (item[0] * item[1]).toFixed(3)

						item.push(price);

					});


					//console.log(this.asks);


				})

				.catch( error => {

					console.log(error);

				});			
							
			},


			set_height: function(){

				let header = document.querySelector('#header');

				let dataHeader = document.querySelector('#data-header');

				let binance_block = document.querySelector('#binance_block');



				let window_height = document.documentElement.clientHeight;

				let header_height = header.clientHeight;

				let dataHeader_height = dataHeader.clientHeight;


				let height = window_height - header_height - dataHeader_height - 120;


				binance_block.style.height = height + 'px';

			},

			adjust_height: function() {

				if ( Math.abs (this.clientWidth - document.documentElement.clientWidth) < 30) return;

				this.clientWidth = document.documentElement.clientWidth;			
				

				this.set_height();

				this.adjust_font_size();

			},

			adjust_font_size: function() {

				let dataList = document.querySelector('#data-list');

				if (document.documentElement.clientWidth < 767) {					

					dataList.style.fontSize = 10 + 'px';

				} else {

					dataList.style.fontSize = 14 + 'px';

				}

			},

			adjust_width_with_scrollbar() {




				let dataHeader = document.querySelector('#data-header');

				let dataList = document.querySelector('#data-list');


				dataList.style.overflowY = 'auto';

				

				let dataHeaderInnerWidth = dataHeader.clientWidth;				

				let listInnerWidth = dataList.clientWidth;



				let diff = dataHeaderInnerWidth - listInnerWidth;

				

				dataList.style.paddingRight = 0;

				dataList.style.paddingLeft = diff + 'px';

				dataHeader.style.paddingLeft = diff + 'px';

				dataHeader.style.paddingRight = diff + 'px';

			 	this.width_diff = diff;		

			 	//alert(this.width_diff);		

			},

			adjust_width_no_scrollbar(event) {

				//let dataHeader = document.querySelector('#data-header');

				//if (event.relatedTarget.tagName  !== 'body') return;

				let dataList = document.querySelector('#data-list');

				dataList.style.overflow = 'hidden';				

				//let dataHeaderInnerWidth = dataHeader.clientWidth;				

				//let list_inner_width = dataList.clientWidth;



				//let diff = tableHeaderInnerWidth - list_inner_width;
				
				//alert(this.width_diff);		

				dataList.style.paddingRight = this.width_diff + 'px';

			},

			add_socket_listener: function() {

				let vm = this;

				window.socket.onmessage = function(event) {

				  	console.log("Получены данные " + event.data);

				  	vm.$store.commit('SOCKET_binance_data_changed', {

						data: event.data,

					});
				  
				};

			},

		}

	}

</script>