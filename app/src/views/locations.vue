<template>
	<mu-row>
		<div class="locations">
			<mu-container class="demo-container is-stripe">
			<h1 style="font-weight: 300;">Locations</h1>

				<mu-row>
					<div class="spacer"></div>
					<mu-col span="12">
						<mu-button color="green500" @click="expandBottomSheetTool('create')"><mu-icon value="add"></mu-icon> Add</mu-button>
					</mu-col>
					<div class="spacer"></div>

					<mu-col span="12">
                        <mu-expansion-panel v-for="(location, index, key) in locations" v-bind:key="key" :expand="true">
                            <div slot="header">{{location.name}}</div>
							<h3>Units: <span>{{location.units}}</span></h3>

                            
                        </mu-expansion-panel>
					</mu-col>
				</mu-row>
			</mu-container>
			<mu-bottom-sheet :open.sync="bottomSheetOpen">
				<mu-list >
					<mu-sub-header><span class="barcode-title">Create Location</span> </mu-sub-header>
					<mu-sub-header ></mu-sub-header>
					<mu-sub-header ></mu-sub-header>
					<div v-if="bottomSheetTool === 'create'">
						<mu-container class="bottom_sheet_tool_header">
							<h3>Create</h3>
						</mu-container>
						<mu-container>
							<mu-form :model="create_form" class="mu-demo-form" label-position="top" label-width="100">
								<mu-form-item prop="input" label="Location Name">
									<mu-text-field	mu-text-field v-model="create_form.name"></mu-text-field>
								</mu-form-item>
								<mu-form-item>
									<mu-button color="primary" @click="create_location()" :disabled="create_form.created">Create<span v-if="create_form.created">d</span></mu-button>

									<!-- <mu-button color="primary" @click="create_inventory()">submit</mu-button> -->

								</mu-form-item>
							</mu-form>

						</mu-container>
					</div>
				</mu-list>
			</mu-bottom-sheet>
		</div>
	</mu-row>
</template>
<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

const dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'];
const monthLongList = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'];

const enDateFormat = {
	formatDateDisplay (date) {
		return `${dayList[date.getDay()]}, ${monthList[date.getMonth()]} ${date.getDate()}`;
	},
	formatMonth (date) {
		return `${monthLongList[date.getMonth()]} ${date.getFullYear()}`;
	},
	getWeekDayArray (firstDayOfWeek) {
		let beforeArray = [];
		let afterArray = [];
		for (let i = 0; i < dayAbbreviation.length; i++) {
			if (i < firstDayOfWeek) {
				afterArray.push(dayAbbreviation[i]);
			} else {
				beforeArray.push(dayAbbreviation[i]);
			}
		}
		return beforeArray.concat(afterArray);
	},
	getMonthList () {
		return monthList;
	}
};

export default {
	name: "locations",
	components:{
	
	},
	data () {
		return {
			panel: '',
            bottomSheetOpen: false,
			bottomSheetTool: 'menu',
			locations: [],
			enDateFormat,
			create_form:{
				name: '',
				created: false,
			}
		}
	},
	props: {
		msg: String,
	},
	methods:{
		closeBottomSheet () {
			this.bottomSheetOpen = false;
		},
		openBottomSheet () {
			this.bottomSheetOpen = true;
		},
		expandBottomSheetTool(tool){
			var vthis = this;
			vthis.bottomSheetTool = tool
			if(tool === 'create'){

			}
			vthis.openBottomSheet()
		},
		sio_get_locations(){
			var vthis = this;
			vthis.socket.emit("get_locations")
		},
		sio_location_create(){
			var vthis = this;
			vthis.socket.emit("location_create", {name: vthis.create_form.name})
		},
		create_location(){
			this.sio_location_create()
		}
	},
	mounted(){
		var vthis = this;
		vthis.socket.on("get_locations", async function(data){
			vthis.locations = data.locations
			
		})
		vthis.socket.on("location_create", async function(data){
			vthis.create_form.created = data.created
		})


		vthis.sio_get_locations()
	},
	watch: {
		bottomSheetOpen: function(new_value, old_value){
			if(new_value === false){
				this.bottomSheetTool = 'menu'
				this.create_form.name = ''
				this.create_form.created = false

			}else{

			}
		},
	}
}
</script>
<style lang="scss">
.breadcrumbs{
	text-align: center;
}

.locations{
	width: 100%;
}


</style>
