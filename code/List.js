class List {
  constructor(ary) {
    this.ary = ary
    let r = 0
    let fragment = document.createDocumentFragment()
    this.stage = document.querySelector('#stage')
    this.wrapper = document.querySelector('#list-wrapper')
    this.elementList = ary.map(e => {
      r = r + Math.PI / 5
      let red = Math.cos(r) * 127 + 128, green = Math.cos(r + 2 * Math.PI / 3) * 127 + 128, blue = Math.cos(r + 4* Math.PI / 3) * 127 + 128
      let color = `#${(red << 16 | green << 8 | blue).toString(16).padEnd(6, 0)}`
      let ele = document.createElement('div')
      let number = document.createElement('span')
      let sqr = document.createElement('div')
      ele.classList += 'element-wrapper'
      sqr.classList += 'element'
      sqr.dataset.color = color
      sqr.style = `padding-top: ${e * 10}px; background: ${color}`
      number.innerHTML = e
      number.classList += 'number'
      ele.appendChild(sqr)
      ele.appendChild(number)
      fragment.appendChild(ele)
      return ele
    })
    this.wrapper.appendChild(fragment)
  }
  async insertSort() {
    if (this.ary.length < 2) return
    await this.sleep(1000)
    this.stage.innerHTML = 'insertion sort'
    for (let i = 1; i < this.ary.length; i++) {
      let temp = this.ary[i], tempColor = this.elementList[i].children[0].dataset.color, j = i 
      for (; j > 0 && this.ary[j - 1] > temp; j--) {
        this.ary[j] = this.ary[j - 1]
        // animation
        let height = Number(this.elementList[j - 1].children[1].innerHTML), color = this.elementList[j - 1].children[0].dataset.color
        await this.changeValue(j, height, color)
      }
      this.ary[j] = temp
      await this.changeValue(j, temp, tempColor)
      // return
    }
  }
  async selectionSort() {
    if (this.ary.length < 2) return
    await this.sleep(1000)
    this.stage.innerHTML = 'selection sort'
    for (let i = 0; i < this.ary.length; i++) {
      let min = i
      for (let j = i + 1; j < this.ary.length; j++) {
        if (this.ary[j] < this.ary[min]) {
          min = j
        }
      }
    
      let temp = this.ary[min]

      let height1 = Number(this.elementList[i].children[1].innerHTML), color1 = this.elementList[i].children[0].dataset.color
      let height2 = Number(this.elementList[min].children[1].innerHTML), color2 = this.elementList[min].children[0].dataset.color

      this.ary[min] = this.ary[i]
      await this.changeValue(min, height1, color1)

      this.ary[i] = temp
      await this.changeValue(i, height2, color2)
    }
  }
  changeValue(idx, h, c) {
    this.elementList[idx].children[0].style = `padding-top: ${h * 10}px; background-color: ${c}`
    this.elementList[idx].children[0].dataset.color = c
    this.elementList[idx].children[1].innerHTML = h
    return this.sleep(2000)
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  // random()
  // init()
}