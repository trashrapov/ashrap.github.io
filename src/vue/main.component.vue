<template>

	<div class="ui-block m-0 p-0 h-100 w-100 border">	
		
		<nav class="nav nav-pills nav-justified" id="header">			  
		  	
		  	<router-link 

				class="nav-item nav-link mr-1" 

				v-bind:class="{active: +active_menu === 1}"

				data-toggle="pill"

				to="/"		

			>Binance</router-link>
		 
		  	<router-link 

				class="nav-item nav-link ml-1"

				v-bind:class="{active: +active_menu === 2}"		

				data-toggle="pill"				

				to="/drop"					

			>DropDown</router-link>
		 
		</nav>	

		<keep-alive>

			<router-view></router-view>

		</keep-alive>
		

	</div>

</template>

<script>
	
	export default {

		name: 'main-component',


		mounted(){

			this.disableScroll();	

			window.addEventListener('resize', this.adjust_width);

			window.addEventListener('resize', this.adjust_height);

			this.adjust_width();

			this.adjust_height();
			
		},

		data: function() {

			return {

				clientWidth: 0,

				clientHeight: 0,

			}

		},

		computed: {

			active_menu: function() {

				return this.$store.state.active_menu;

			},

		},

		methods: {	

			disableScroll: function() {
		        
		        $("body").addClass("modal-open");

		        let vm = this;
		        
		        document.body.addEventListener('touchmove', vm.preventScrollEvent, { passive: false });

		    },

		    adjust_width: function() {

		    	if ( Math.abs (this.clientWidth - document.documentElement.clientWidth) < 30) return;

				

		    	if ( document.documentElement.clientWidth < 576 ) {

		    		$('#app').attr('class', 'container-flex');		    		

		    	} else {

		    		$('#app').attr('class', 'container');

		    	}


		    	this.clientWidth = document.documentElement.clientWidth;

		    },

		    adjust_height: function() {

		    	if ( Math.abs (this.clientHeight - document.documentElement.clientHeight) < 30) return;

		    	let height = document.documentElement.clientHeight - 80;

		    	$('#app').height(height);

		    	this.clientHeight = document.documentElement.clientHeight;

		    },	   

	    },

	    watch: {

		    $route (to, from){		        

		        let current_menu;

		        if (to.fullPath === '/') {

		        	current_menu = 1;

		        } else {

		        	current_menu = 2;

		        }


		        this.$store.commit('menu_selected', {

					current_menu: current_menu,

				});

		    }

		}, 	

	}

</script>