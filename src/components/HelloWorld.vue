<template>
  <div class="hello">
    123
  </div>
</template>

<script>
// var urllib = require('urllib')
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    callMe () {
      var audio = new Audio('https://www.w3school.com.cn/i/horse.ogg')
      audio.play()
    }
  },
  mounted () {
    axios.get(`https://www.okex.me/api/futures/v3/instruments/BTC-USD-191227/candles?&granularity=86400`).then(res => {
      console.log(res)
    })

    this.callMe()
    // this.timer = setInterval(this.callMe, 2000)
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
