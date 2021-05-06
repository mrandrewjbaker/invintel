<template>
	<div id="app">
		<topNavBar></topNavBar>
		<leftNavBar></leftNavBar>

		<div class="router-frame">
			<router-view/>
		</div>
	</div>
</template>

<script>
import topNavBar from './components/topNavBar'
import leftNavBar from './components/leftNavBar'

export default {
	name: "App",
	data() {
		return {
			user:{},
			company: {},
			plants: [],
			webapp_url: "",
			webapp_subdomain: "",
		}
	},
	components:{
		topNavBar,
		leftNavBar
	},
	computed:{
		darkmode: async function(){
			return await this.$store.getters.darkmode
		}
	},
	methods: {

	},
	watch: {
		darkmode: async function(new_value, old_value){
			var vthis = this
			if(await new_value){
				// vthis.$refs.body.
				// vthis.$refs.body.$el.classList.value = vthis.$refs.body.$el.classList.value + 'darkmode'
				document.getElementById("body").classList.add("darkmode")

			}else{
				// console.log('no dark')
				document.getElementById("body").classList.remove("darkmode")

			}
		}
	},
	afterCreate() {
		this.READ_url()

		
	}
}
</script>

<style lang="scss">

	@import "../node_modules/muse-ui/dist/muse-ui.css";

	body{
		background-color: #222222;
		color: #eaeaea;

		.spacer{
			width: 100%;
			height: 2rem;
		}

		.mu-bottom-sheet{
			background-color: #222222;


			.bottom_sheet_tool_header{
				text-align:center;
			}

			*{
				color: #fefefe;
			}
		}

		.mu-form{
			*{
				color: #eaeaea;
			}
		}
		.mu-form-item{

			.mu-form-item-content{
				.mu-input{
					background-color: #404040 !important;
				}
			}

		}



		.mu-input .mu-select{
			background-color: #404040;

			

			.is-disabled{
				background-color: #404040 !important;

				input[disabled]{
					background-color: #404040 !important;

				}
			}
		}



		button.mu-button[disabled]{
			background-color: #606060;
			*{
				background-color: #606060;

			}
		}

		.leftNavBar{
			.mu-paper{
				background-color: #222222;
				color: #eaeaea;

				.mu-list{
					.mu-item-wrapper{
						.mu-item-action{
							color: #eaeaea;

						}
						.mu-item-title{
							
							color: #eaeaea;
							*{
								color: #eaeaea;

							}
						}
					}
				}
			}	
		}

		.mu-drawer.is-right{
			background-color: #222222;
			color: #eaeaea;

			// *{
			// 	background-color: #222222;
			// 	color: #eaeaea;
			// }


			.mu-paper{
				background-color: #222222;
				color: #eaeaea;

				.mu-list{
					.mu-item-wrapper{
						.mu-item-action{
							color: #eaeaea;

						}
						.mu-item-title{
							
							color: #eaeaea;
							*{
								color: #eaeaea;

							}
						}
					}
				}
			}	
		}



		.card{
			z-index: 1;
		}

	}
</style>
