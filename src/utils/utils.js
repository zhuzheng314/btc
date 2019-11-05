function sum (x, y) { return x + y }

function square (x) { return x * x }

function boll (n, k, close, all) {
  let finArr = []
  for (let i = 0; i < 50; i++) {
    const arr = close.slice(i, i + n)
    const mid = arr.reduce(sum) / arr.length
    const sd = Math.sqrt(arr.map((x) => x - mid).map(square).reduce(sum) / arr.length)
    const item = all ? all[i].map((x, i) => i > 0 ? Number(x) : x) : []
    const high = item[2]
    const low = item[3]
    const open = item[1]
    const time = item[0]

    finArr.push({
      up: mid + sd,
      down: mid - sd,
      mid,
      close: close[i],
      item,
      itemStr: 'time, open, high, low, close, num, num',
      high,
      low,
      open,
      time
    })
  }
  return finArr
}

export {
  boll
}
