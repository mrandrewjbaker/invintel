<template>
	<mu-row>
		<div class="inventory">
			<mu-container class="demo-container is-stripe">
				<h1 style="font-weight: 300;">Inventory</h1>

				<mu-row>
					<div class="spacer"></div>
					<mu-col span="12">
						<mu-paper :z-depth="1">
							<mu-data-table :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="inventory">
							<template slot-scope="scope">
								<td class="is-left">{{scope.row.namel}}</td>
								<td class="is-left">{{scope.row.quantity}}</td>
								<td class="is-left">{{scope.row.barcode}}</td>

								<td class="is-left">{{scope.row.location}}</td>
								<td class="is-left">{{scope.row.create_datetime}}</td>
								<td class="is-left">{{scope.row.iron}}%</td>
							</template>
							</mu-data-table>
						</mu-paper>
					</mu-col>
				</mu-row>
			</mu-container>
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
	name: "inventory",
	components:{
	
	},
	data () {
		return {
			panel: '',
			bottomSheetOpen: false,
			enDateFormat,
			inventory: [],
			sort: {
				name: '',
				order: 'asc'
			},
			columns: [
				{ title: 'Name', name: 'namel', align: 'left', sortable: true },
				{ title: 'Quantity', name: 'quantity', width: 100, align: 'left', sortable: true },
				{ title: 'Barcode', name: 'barcode', width: 200, align: 'left', sortable: true },
				{ title: 'Location', name: 'location', width: 200, align: 'left', sortable: true },
				{ title: 'Received DateTime', name: 'received_datetime', width: 200, align: 'center', sortable: true },
			],
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
		},
		handleSortChange ({name, order}) {
			var vthis = this
		// this.inventory = this.inventory.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
		vthis.sort(vthis.inventory).by(
			[
				{[vthis.sort.order]: i => i[name]} 
			]
		)

		},
		sio_get_inventory(){
			var vthis = this;
			vthis.socket.emit("get_inventory")
		},


	},
	mounted(){
		var vthis = this;
		vthis.socket.on("get_inventory", async function(data){
			vthis.inventory = data.inventory
		})


		vthis.sio_get_inventory()
	},
	watch: {
		bottomSheetOpen: function(new_value, old_value){
			if(new_value === false){
				this.bottomSheetTool = 'menu'

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

.inventory{
	width: 100%;
}


</style>
