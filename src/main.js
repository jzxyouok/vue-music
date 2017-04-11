import Vue from 'vue'
/*import App from './App.vue'*/
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
require('./style/reset.css')
require('./commonjs/adaption')
Vue.use(VueRouter);
Vue.use(VueResource);
var app = Vue.extend({});
//实例化VueRouter
var router = new VueRouter({
    // 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});
//路由表
router.map({
    '/':{
        //开机画面
        component:require('./component/openAnimate/openAnimate.vue')
    },
    '/home':{
        //首页
        name:'home',
        component:require('./component/home/home.vue'),
        /*subRoutes: {
            '/': {
                // 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
                // 一个Bar组件
                component: require('./component/my/my.vue')
            },
            '/Recommend': {
                // Baz也是一样，不同之处是匹配的路由会是/foo/baz
                component: require('./component/Recommend/Recommend.vue')
            },
            '/songType': {
                // Baz也是一样，不同之处是匹配的路由会是/foo/baz
                component: require('./component/songType/songType.vue')
            }
        }*/
    }
})
router.start(app, '#app')
/*new Vue({
  el: 'body',
  components: { App }
})*/



