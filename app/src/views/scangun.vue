<template>
	<mu-row>
		<div class="scangun-viewfinder">
			<StreamBarcodeReader id="scangun-viewfinder-video" v-if="scangun_active"
			@decode="(a, b, c) => onDecode(a, b, c)"
			@loaded="() => onLoaded()"
			></StreamBarcodeReader>
			<mu-bottom-sheet :open.sync="bottomSheetOpen">
				<mu-list >
					<mu-sub-header><span class="barcode-title">{{scanned_value}}</span> - <span v-if="!scanned_item_exists" class="exist-title">Does Not Exist</span><span v-if="scanned_item_exists" class="exist-title">Exists</span></mu-sub-header>
					<mu-sub-header ></mu-sub-header>
					<mu-sub-header ></mu-sub-header>
					<div v-if="scanned_item_exists" class="scanned-item-info">
						<h3>Name: <span>{{scanned_item.name}}</span></h3>
						<h3>Location: <span>{{scanned_item.location_name}}</span></h3>
						<h3>Quantity: <span>{{scanned_item.quantity}}</span></h3>
						<h3>Received Date: <span>{{scanned_item.create_datetime}}</span></h3>



					</div>
					<div v-if="bottomSheetTool === 'menu'">
						<mu-list-item v-if="!scanned_item_exists" button @click="expandBottomSheetTool('create')">
							<mu-list-item-action>
							<mu-icon value="add" color="green"></mu-icon>
							</mu-list-item-action>
							<mu-list-item-title>Create</mu-list-item-title>
						</mu-list-item>

						<mu-list-item v-if="scanned_item_exists" button @click="expandBottomSheetTool('move')">
							<mu-list-item-action>
							<mu-icon value="open_with" color="orange"></mu-icon>
							</mu-list-item-action>
							<mu-list-item-title>Move</mu-list-item-title>
						</mu-list-item>

						<mu-list-item v-if="scanned_item_exists" button @click="expandBottomSheetTool('consume')">
							<mu-list-item-action>
							<mu-icon value="close_fullscreen" color="red" ></mu-icon>
							</mu-list-item-action>
							<mu-list-item-title>Consume</mu-list-item-title>
						</mu-list-item>

						<mu-list-item v-if="scanned_item_exists" button @click="expandBottomSheetTool('receive')">
							<mu-list-item-action>
							<mu-icon value="call_received" color="blue"></mu-icon>
							</mu-list-item-action>
							<mu-list-item-title>Receive Stock</mu-list-item-title>
						</mu-list-item>
					</div>
					<div v-if="bottomSheetTool === 'create'">
						<mu-container class="bottom_sheet_tool_header">
							<h3>Create</h3>
						</mu-container>
						<mu-container>
							<mu-form :model="create_form" class="mu-demo-form" label-position="top" label-width="100">
								<mu-form-item prop="input" label="Item Name">
									<mu-text-field	mu-text-field v-model="create_form.name"></mu-text-field>
								</mu-form-item>
								<mu-form-item prop="select" label="Location">
									<mu-select v-model="create_form.location_value">
										<mu-option v-if="create_form.location_value === 0" :value="0" label="Select a Location">Select a Location</mu-option>
										<mu-option v-for="(option, index, key) in locations" :key="key" :label="option.name" :value="option.id"></mu-option>
									</mu-select>
								</mu-form-item>
								<mu-form-item prop="input" label="Quantity">
									<mu-text-field v-model="create_form.quantity" @input="validate_quantity()"></mu-text-field>
								</mu-form-item>
								<mu-col span="12" lg="4" sm="6">
									<mu-date-input  icon="today"  v-model="create_form.create_datetime" :date-time-format="enDateFormat" label="Receive DateTime" type="dateTime" container="dialog" label-float ></mu-date-input>
								</mu-col>
								<mu-form-item>
									<mu-button v-if="create_form.created" color="primary" @click="create_inventory()" disabled>Created</mu-button>
									<mu-button v-if="!create_form.created" color="primary" @click="create_inventory()">Create</mu-button>

									<!-- <mu-button color="primary" @click="create_inventory()">submit</mu-button> -->

								</mu-form-item>
							</mu-form>

						</mu-container>
					</div>

					<div v-if="bottomSheetTool === 'move'">
						<mu-container class="bottom_sheet_tool_header">
							<h3>Move</h3>
						</mu-container>
						<mu-container>
							<mu-form :model="move_form" class="mu-demo-form" label-position="top" label-width="100">
								<mu-form-item prop="select" label="Location">
									<mu-select v-model="move_form.location_value">
										<mu-option v-if="move_form.location_value === 0" :value="0" label="Select a Location">Select a Location</mu-option>
										<mu-option v-for="(option, index, key) in locations" :key="key" :label="option.name" :value="option.id"></mu-option>
									</mu-select>
								</mu-form-item>
								<mu-form-item>
									<mu-button v-if="move_form.moved" color="primary" @click="move_inventory()" disabled>Moved</mu-button>
									<mu-button v-if="!move_form.moved" color="primary" @click="move_inventory()">Move</mu-button>
								</mu-form-item>
							</mu-form>


						</mu-container>
					</div>

					<div v-if="bottomSheetTool === 'consume'">
						<mu-container class="bottom_sheet_tool_header">
							<h3>Consume</h3>
						</mu-container>
						<mu-container>
							<mu-form :model="consume_form" class="mu-demo-form" label-position="top" label-width="100">
								<mu-form-item prop="input" label="Quantity">
									<mu-text-field v-model="consume_form.quantity" @input="validate_quantity()"></mu-text-field>
								</mu-form-item>
								<mu-form-item>
									<mu-button v-if="consume_form.consumed" color="red500" @click="consume_inventory()" disabled>Consumed</mu-button>
									<mu-button v-if="!consume_form.consumed" color="red500" @click="consume_inventory()">Consume</mu-button>
								</mu-form-item>
							</mu-form>


						</mu-container>
					</div>


					<div v-if="bottomSheetTool === 'receive'">
						<mu-container class="bottom_sheet_tool_header">
							<h3>Receive</h3>
						</mu-container>
						<mu-container>
							<mu-form :model="receive_form" class="mu-demo-form" label-position="top" label-width="100">
								<mu-form-item prop="input" label="Quantity">
									<mu-text-field v-model="receive_form.quantity" @input="validate_quantity()"></mu-text-field>
								</mu-form-item>
								<mu-form-item>
									<mu-button v-if="receive_form.consumed" color="green500" @click="receive_inventory()" disabled>Received</mu-button>
									<mu-button v-if="!receive_form.consumed" color="green500" @click="receive_inventory()">Receive</mu-button>
								</mu-form-item>
							</mu-form>


						</mu-container>
					</div>

				</mu-list>
			</mu-bottom-sheet>
			<!-- <p>{{scanned_value}}</p> -->
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
	name: "scangun",
	components:{
		StreamBarcodeReader
	},
	data () {
		return {
			scangun_active: true,
			scanned_id: null,
			scanned_value: "",
			scanned_item_exists: false,
			stream: {},
			bottomSheetOpen: false,
			bottomSheetTool: 'menu',
			enDateFormat,
			locations: [],
			scanned_item:{
				barcode_value: "",
				name: "",
				location_value: 0,
				location_name: '',
				quantity: 0

			},
			create_form:{
				barcode_value: '',
				name: '',

				location_value: 0,
				quantity: 0,
				create_date: Date(),
				create_datetime: Date(),
				created: undefined
			},
			move_form:{
				location_value: 0,
				location_name: '',
				moved: false,
			},
			consume_form:{
				quantity: 0,
				consumed: false
			},
			receive_form: {
				quantity: 0,
				received: false
			}
		}
	},
	props: {
		msg: String,
	},
	methods:{
		onDecode(a, b, c) {
			console.log(a, b, c);
			this.scanned_value = a;
			this.sio_inventory_exists();
			this.bottomSheetTool = 'menu'
			this.openBottomSheet();
			var vthis = this;
			var sound = new vthis.Howl({
				src: ['../beep.mp3']
			});
			sound.play();

		},
		onLoaded() {
			console.log("load");
		},
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
				vthis.sio_get_locations()
			}

			if(tool === 'move'){

			}

			if(tool === 'ship'){

			}
		},
		validate_quantity(){
			
		},
		create_inventory(){
			var vthis = this;
			vthis.sio_inventory_create()
		},
		move_inventory(){
			var vthis = this;
			vthis.sio_inventory_move()
		},
		consume_inventory(){
			var vthis = this;
			vthis.sio_inventory_consume()
		},
		sio_inventory_exists(){
			var vthis = this;
			vthis.socket.emit("inventory_exists", {barcode: vthis.scanned_value})
		},
		sio_inventory_item(){
			var vthis = this;
			vthis.socket.emit("inventory_item", {barcode: vthis.scanned_value})
		},
		sio_inventory_create(){
			var vthis = this;
			vthis.socket.emit("inventory_create", {barcode: vthis.scanned_value, name: vthis.create_form.name, location: vthis.create_form.location_value, quantity: vthis.create_form.quantity, create_datetime: vthis.create_form.create_datetime})
		},
		sio_inventory_move(){
			var vthis = this;
			vthis.socket.emit("inventory_move", {barcode: vthis.scanned_value, location: vthis.move_form.location_value})
		},
		sio_inventory_consume(){
			var vthis = this;
			vthis.socket.emit("inventory_consume", {barcode: vthis.scanned_value, quantity: vthis.consume_form.quantity})
		},
		sio_inventory_receive(){
			var vthis = this;
			vthis.socket.emit("inventory_receive", {barcode: vthis.scanned_value, quantity: vthis.consume_form.quantity})
		},
		sio_get_locations(){
			var vthis = this;
			vthis.socket.emit("get_locations")
		},

	},
	mounted(){
		var vthis = this;

		vthis.sio_get_locations()


		vthis.socket.on("inventory_exists", async function(data){
			console.log(data)
			vthis.scanned_item_exists = await data.exists
			if(vthis.scanned_value != ""){
				vthis.sio_inventory_item()
			}
		})
		vthis.socket.on("inventory_create", async function(data){
			vthis.create_form.created = data.created
			vthis.scanned_item_exists = data.created
			if(data.created){
				vthis.bottomSheetTool = 'menu'
				vthis.create_form.barcode_value = ''
				vthis.create_form.name = ''
				vthis.create_form.location_value = ''
				vthis.create_form.quantity = 0,
				vthis.create_form.create_date =  Date(),
				vthis.create_form.create_datetime = Date(),
				vthis.create_form.created = undefined
				vthis.sio_inventory_item()

			}
		})
		vthis.socket.on("inventory_move", async function(data){
			vthis.move_form.moved = data.moved
			console.log(data)
			// vthis.scanned_item_exists = data.created
			if(data.moved){
				vthis.bottomSheetTool = 'menu'
				vthis.move_form.location_value = 0
				vthis.move_form.moved = false


				vthis.sio_inventory_item()

			}
		})
		vthis.socket.on("inventory_consume", async function(data){
			vthis.consume_form.consumed = data.consumed
			console.log(data)
			// vthis.scanned_item_exists = data.created
			if(data.consumed){
				vthis.bottomSheetTool = 'menu'
				vthis.consume_form.quantity = 0
				vthis.consume_form.consumed = false


				vthis.sio_inventory_item()

			}
		})
		vthis.socket.on("inventory_item", async function(data){
			console.log(data)
			vthis.scanned_item.name = data.name
			vthis.scanned_item.location_value = data.location_id
			vthis.scanned_item.location_name = data.location_name
			vthis.scanned_item.quantity = data.quantity
			vthis.scanned_item.create_datetime = data.create_datetime
		})

		vthis.socket.on("get_locations", async function(data){
			vthis.locations = data.locations
		})
		
	},
	watch: {
		bottomSheetOpen: function(new_value, old_value){
			if(new_value === false){
				this.bottomSheetTool = 'menu'
				this.scangun_active = true


			}else{
				this.scangun_active = false
			}
		},
		bottomSheetTool: function(new_value, old_value){

		}
	}
}
</script>
<style lang="scss">
.breadcrumbs{
	text-align: center;
}

.scangun-viewfinder{
	width: 100%;
	height: 100vh;

	#scangun-viewfinder-video{
		width: 100%;
		top: 0;

		video{
			top: 0;

			width: 100%;
			padding-bottom: 10vh;
		}
		.overlay-element{
			// clip-path: none;
		}
		
	}
}

.mu-bottom-sheet{
	background-color: #222222;

	.mu-sub-header{
		text-indent: 2%;
		line-height: 25px;
		padding: 5px;
		span.barcode-title{
			font-size: 1.5rem;
		}
		span.exist-title{
			line-height: 2rem;
			
		}
		
	}
	.scanned-item-info{
		h3{
			span{
				font-weight: 300;
			}
		}
	}

	.bottom_sheet_tool_header{
		text-align:center;
	}

	*{
		color: #fefefe;
	}
}

</style>
