<template>
    <div>
        <mu-appbar class="topNavBar" style="width: 100%;">
            <mu-button v-if="$store.getters.leftNavBarVisible" icon slot="left" v-on:click="setLeftNavBarOpen()">
                <div class="icon-container">
                    <mu-icon value="menu"></mu-icon>
                </div>
            </mu-button>
            <h3 class="logo-text">InvIntel</h3>

        </mu-appbar>
    </div>
</template>

<script>
export default {
    name: "topNavBar",
    methods: {
        setLeftNavBarOpen: async function(){
            var vthis = this;
            await this.$store.dispatch('setLeftNavBarOpen', !this.$store.getters.leftNavBarOpen)
        }
    },
    computed: {
        leftNavOpen(){
            var vthis = this;
            return this.$store.getters.leftNavOpen
        }
    },
    mounted() {
        var vthis = this;
    },

}
</script>

<style lang="scss">

.logo-text{
    font-family: 'Roboto Slab', serif;
    font-weight: 300;
}
.mu-appbar{
    background-color: #016bc2 !important;
    color: #fefefe !important;
}

.appbar-logo{
    float: left;
    height: 100%;
}
</style>