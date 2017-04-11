<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: '首页'
      }
    },
    components: {
    },
    ready () {
      this.$http.get('https://route.showapi.com/213-1?keyword=海阔天空&page=1&showapi_appid=33436&showapi_timestamp=&showapi_sign=55504d2c49514f17b19d7a6a42acb401').then((response) => {
        console.log(response.data)
      }).catch(function(response) {
        console.log(response)
      });
    }
  }
</script>

<style scoped lang="sass">
body {
  font-family: Helvetica, sans-serif;

}
h1{
    display: flex;
}
</style>
