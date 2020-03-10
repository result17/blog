class RmNumList {
  constructor(range) {
    if (range > 0) {
      this.rangeList = [...Array(range).keys()]
      this.rangeLen = range
      this.cache = new Set()
    }
  }

  pick(n, clearCache = true) {
    // 逻辑上有死循环的危险, 当缓存较多时，数组长度会永远无法 = n
    if (n <= 0 || !Number.isInteger(n) || n >= this.rangeLen) return
    this.checkAndClearCache(clearCache)
    let num, res = []
    while (res.length < n) {
      num = Math.floor(Math.random() * this.rangeLen) + 1
      if (!this.cache.has(num)) {
        res.push(num)
        this.cache.add(num)
      }
    }
    return res.sort((a, b) => a - b)
  }

  static clear() {
    this.cache.clear()
  }

  static checkAndClearCache(clearCache) {
    if (this.cache && clearCache && this.cache.size * 2 >= this.rangeLen) {
      this.clear()
    }
  }
}

