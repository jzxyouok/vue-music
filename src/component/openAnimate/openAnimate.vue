<template>
    <div >
        <div  v-if="is_init" transition="expend"  @click="gohome"></div>
    </div>
</template>
<script>
    export default{
        name: "openAnimate",
        components: {},
        data(){
            return {
                name: "进入音乐",
                is_init:true
            }
        },
        methods: {
            gohome () {
                this.is_init = false;
                setTimeout(()=>{
                    this.$route.router.go({name: "home"})
                },1000)
            }
        }
    }
</script>
<style lang="sass" scoped>
    .expend-transition{
        position:fixed;
        transition: all 1s ease;
        width:100%;
        height: 43.24rem;
        background: url("./img/open.jpg")  no-repeat ;
        background-size:contain ;
    }
    .expend-enter{
        opacity: 0;
    }
    .expend-leave{
        opacity: 0;
    }
</style>