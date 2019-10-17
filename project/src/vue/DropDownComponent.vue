<template>
	
	<div class="m-0 p-0" id="dropDown">	

		<div class="px-4 w-100 m-0" id="symbol_selector">
			<select class="w-100 w-sm-25 py-2 rounded bg-indigo"  v-model="binance_symbol">

				  <option value="0" disabled>Select Binance Symbol</option>

				  <option value="BTCUSDT">BTCUSDT</option>

				  <option value="BNBBTC">BNBBTC</option>

				  <option value="ETHBTC">ETHBTC</option>

			</select>
		</div>

		<div 

			v-if="symbol_changes" 

			class="row mt-2 px-4 w-100 h-100 m-0" 

			id="changes-list" 		

		>
			
			<div class="col m-0 p-0 py-2 bg-white">
				
				<ul class="px-2" v-for="change_message in symbol_changes">

					<li class="border">

						<span id="changes-list-item">{{ change_message }}</span> 
					
					</li>   
						
				</ul>
			
			</div>

		</div>
		

	</div>

</template>

<script>
	
	export default {

		name: 'drop-down-component',

		created() {

			this.$store.commit('menu_selected', {

				current_menu: 2,

			});

		},

		mounted() {

			window.addEventListener('resize', this.adjust_height);

			$('#symbol_selector').change(this.mutate);

			this.set_height();

			let vm = this;

			this.$store.subscribe((mutation, state) => {


				if ( mutation.type === 'menu_selected' ) {

					if ( +mutation.payload.current_menu === 2 ) {

						setTimeout(()=>vm.adjust_height(), 0);	

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

				binance_symbol: 0,				

			}

		},

		computed: {

			symbol_changes() {

				return this.$store.state.binance_stream_changes.reverse();

			}

		},

		methods: {

			mutate: function() {

				let vm = this;

				this.$store.commit('symbol_changed', {

					binance_symbol: vm.binance_symbol,

				});

				//console.log(window.socket);				

			},
			

			set_height: function(){

				let header = document.querySelector('#header');

				let symbol_selector = document.querySelector('#symbol_selector');

				let dropDownBlock = document.querySelector('#dropDown');



				let window_height = document.documentElement.clientHeight;

				let header_height = header.clientHeight;

				let symbol_selector_height = symbol_selector.clientHeight;


				let height = window_height - header_height - symbol_selector_height - 120;


				dropDownBlock.style.height = height + 'px';

			},

			adjust_height: function() {

				if ( Math.abs (this.clientWidth - document.documentElement.clientWidth) < 30) return;

				this.clientWidth = document.documentElement.clientWidth;

				this.set_height();

			},

		},

	}

</script>