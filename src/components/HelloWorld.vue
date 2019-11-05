<template>
  <div class="hello">
    <el-card
      class="box-card"
      :key="index + 'btcArr'"
      v-for="(item, index) in btcArr"
    >
      <span class="span" :class="{ 'red': item.status === -1, 'green': item.status === 1,  'grey': item.status === 0}"></span>
      级别:{{ item.name }}
      操作:{{filterStr(item.status)}}
      最新更新时间: {{item.nowTime}}
    </el-card>

    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>历史消息</span>
      </div>
      <div v-for="o in flagArr" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
// var urllib = require('urllib')
import { boll } from '../utils/utils'
import moment from 'moment'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      timer: null,
      flagArr: [],
      btcArr: [
        {
          granularity: 300, // 时间力度 5min
          name: '5min',
          status: 0 // -1 sell, 0 null, 1buy
        },
        {
          granularity: 3600, // 时间力度 5min
          name: '1hour',
          status: 0
        },
        {
          granularity: 86400, // 时间力度 5min
          name: '1day',
          status: 0
        }
      ]
    }
  },
  methods: {
    callMe () {
      var audio = new Audio('https://www.w3school.com.cn/i/horse.ogg')
      audio.play()
    },
    filterStr (status) {
      const obj = {
        '-1': '做空',
        '0': '无操作',
        '1': '做多'
      }
      return obj[status.toString()]
    },
    setBtcArrByGranularity (granularity, status) {
      this.btcArr.forEach(x => {
        if (x.granularity === granularity) {
          x.name = this.getNameByGranularity(granularity)
          x.granularity = granularity
          x.status = status // -1 sell, 0 null, 1 buy
          x.nowTime = moment().format('')
        }
      })
    },
    getNameByGranularity (granularity) {
      const obj = {
        60: '1分钟',
        300: '5分钟',
        3600: '1小时',
        7200: '2小时',
        14400: '4小时',
        86400: '1天'
      }
      return obj[granularity]
    },
    catchYou (data, granularity) {
      const {
        high,
        low,
        // open,
        time,
        close,
        up, // boll
        down // boll
      } = data

      this.setBtcArrByGranularity(granularity, 0)

      if (close > up) {
        if (low < up) {
          this.setBtcArrByGranularity(granularity, 1)
          console.log('close:', close, 'down:', down, '多多', granularity)
          let flagStr = time + granularity

          if (!this.flagArr.includes(flagStr)) {
            this.flagArr.push(flagStr)
            this.callMe()
          }
        }
      } else if (close < down) {
        if (high > down) {
          console.log('close:', close, 'down:', down, '做空做空', granularity)
          this.setBtcArrByGranularity(granularity, -1)
          let flagStr = time + granularity
          if (!this.flagArr.includes(flagStr)) {
            this.flagArr.push(flagStr)
            this.callMe()
          }
        }
      }
    },
    start (time) {
      this.$axios
        .get(
          `https://www.okex.me/api/futures/v3/instruments/BTC-USD-191227/candles?&granularity=${time}`
        )
        .then(res => {
          const close = res.data.map(x => Number(x[4]))
          let bollArr = boll(50, 1, close, res.data)
          this.catchYou(bollArr[1], time)
        })
    }
  },
  mounted () {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.start(300) // 5min
      this.start(3600) // 1hour
      this.start(86400) // 1day
    }, 5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box-card {
  width: 300px;
  text-align: left;
  float: left;
  margin: 5px;
  .span{
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 20px;
    border-radius: 8px;
  }
}
.list-card{
  width: 500px;
  text-align: left;
}
.red {
  background-color: #EE7785;
}
.green {
  background-color: #67D5B5;
}
.grey {
  background: #E0E3DA;
}
</style>
