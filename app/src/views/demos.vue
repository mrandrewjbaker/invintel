<template>
	<mu-row>
		<div class="demos">
			<mu-row class="demo-scenarios">
				<h2>Scan the blue QR code to open the Web App on your Mobile Device and begin scanning</h2>
				<mu-col span="12">
						<img width="200" src="../../public/webapp.bc.png">
					
				</mu-col>
				<h1>Keep Open on Desktop <mu-icon value="computer" color="white"></mu-icon></h1>
				<div class="spacer"></div>
				<mu-col span="4">
					<div class="scenario-container">
						<img  src="../../public/01000.bc.png">
						<p>01000</p>
						<ul>
							<li>Open the ScanGun from the menu</li>
							<li>Scan the above barcode</li>
							<li>Create or delete the item</li>
						</ul>
					</div>
				</mu-col>
				<mu-col span="4">
					<div class="scenario-container">
						<img  src="../../public/02000.bc.png">
						<p>02000</p>
						<ul>
							<li>Open the ScanGun from the menu</li>
							<li>Scan the above barcode</li>
							<li>Create or delete the item</li>
						</ul>
					</div>
				</mu-col>
				<mu-col span="4">
					<div class="scenario-container">
						<img  src="../../public/03000.bc.png">
						<p>03000</p>
						<ul>
							<li>Open the ScanGun from the menu</li>
							<li>Scan the above barcode</li>
							<li>Create or delete the item</li>
						</ul>
					</div>
				</mu-col>
			</mu-row>
		</div>
	</mu-row>
</template>
<script>


export default {
	name: "demos",
	components:{
	
	},
	data () {
		return {
			bottomSheetOpen: false,
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
	},
	mounted(){
		var vthis = this;
	},
	watch: {

	}
}
</script>
<style lang="scss">

.demos{
	width: 100%;
}

.demo-scenarios{
	text-align: center;
	align-content: center;
		justify-content: center;

	h1, h2{
		width: 100%;
		font-weight: 300;
		.mu-icon{
			height: 2rem;
			line-height: 2rem;
		}
	}

	.col{
		display: flex;
		justify-content: center;
		align-content: center;
		text-align: center;
	}
	img{

	}
}

</style>
