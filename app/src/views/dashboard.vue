<template>
    <mu-container class="demo-container">
        <mu-row gutter>
            <mu-col span="12">
                <div class="grid-cell breadcrumbs">
                    <h2>Dashboard</h2>
                    <mu-list>
                    <mu-list-item button @click="play()">
                        <mu-list-item-action>
                        <mu-icon value="add" color="green"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>Create</mu-list-item-title>
                    </mu-list-item>
                    </mu-list>
                </div>
            </mu-col>
        </mu-row>
    </mu-container>
</template>
<script>

export default {
    name: "dashboard",
    data () {
        return {

        }
    },
    methods:{
        play: function(){
            var vthis = this;
            console.log('playing sounds')
            var sound = new vthis.Howl({
                src: ['../beep.mp3']
            });
            sound.play();
        }
    }
}
</script>
<style lang="scss">
.breadcrumbs{
    text-align: center;
}
</style>
