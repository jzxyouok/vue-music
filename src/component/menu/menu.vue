<template>
    <div class="menu" @click="showMyMenu">
    </div>
    <div class="mask" v-show="menuShow" @click="showMyMenu">

    </div>
    <div class="mymenu"  :class="{'showMeun':menuShow}"></div>
</template>
<script>
    export default{
        name: "menu",
        components: {},
        data(){
            return {
                name: "菜单",
                menuShow:false
            }
        },
        methods:{
            showMyMenu(){
                this.menuShow?this.menuShow=false:this.menuShow =true;
            }
        }
    }
</script>
<style lang="sass">
    .menu{
        position: absolute;
        width: 10%;
        height: 2.333rem;
        background: url("./img/menu.png") no-repeat;
        background-size: 80%;
        background-position: center;
        z-index: 1111;
        background-color: #ff8833;
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 3000;
    }
    .mymenu{
        position: fixed;
        top: 0px;
        left:-20rem;
        width: 20rem;
        height: 100%;
        background: url("./img/set.png") no-repeat;
        background-size: cover;

        transition: all .3s ease;
        z-index: 3001;
    }
    .showMeun {
        left: 0;
    }
</style>