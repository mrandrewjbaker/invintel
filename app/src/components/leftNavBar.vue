<template>
	<div class="leftNavBar">
		<mu-drawer :open.sync="$store.state.leftNavBarOpen" :docked="docked" :right="position === 'right'">
			<mu-list toggle-nested>
				<mu-list-item button ripple to="/dashboard/" >
					<mu-list-item-action ripple>
						<mu-icon color="lime500" value="widgets"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>Dashboard</mu-list-item-title>
				</mu-list-item>

				<mu-list-item button ripple to="/locations/">
					<mu-list-item-action ripple>
						<mu-icon color="purple500" value="location_on"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>Locations</mu-list-item-title>
				</mu-list-item>

				<mu-list-item button ripple to="/inventory/">
					<mu-list-item-action ripple>
						<mu-icon color="blue500" value="inventory"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>Inventory</mu-list-item-title>
				</mu-list-item>

				<mu-list-item button ripple to="/scangun/">
					<mu-list-item-action ripple>
						<mu-icon color="red500" value="qr_code"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>ScanGun</mu-list-item-title>
				</mu-list-item>

				<mu-list-item button ripple to="/demos/" >
					<mu-list-item-action ripple>
						<mu-icon color="orange500" value="help_outline"></mu-icon>
					</mu-list-item-action>
					<mu-list-item-title>Demo Guide</mu-list-item-title>
				</mu-list-item>
			</mu-list>
		</mu-drawer>
	</div>
</template>

<script>
export default {
	name: "leftNavBar",
	props:[],
	data() {
		return {
			docked: false,
			open: false,
			position: "left",
			menu_opened: "send",
			switch_darkmode: false
		}
	},
	computed: {
		darkmode(){
			return this.$store.getters.darkmode
		}
	},
	mounted(){
		var vthis = this;


	},
	watch: {

	}

}
</script>
<style lang="scss">



</style>