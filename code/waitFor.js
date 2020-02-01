function waitFor(promise, time, cancel) {
  let timer
  return new Promise((res, rej) => {
    function throwTimeError() {
      let e = new Error('timeout')
      cancel()
      clearTimeout(timer)
      rej(e)
      return
    }
    function throwRunError(err) {
      if (err) {
        cancel()
        clearTimeout(timer)
        rej()
        console.log(err)
        return
      }
    }
    promise
    .then(data => {
      clearTimeout(timer)
      res(data)
    }).catch(throwRunError)
    timer = setTimeout(throwTimeError, time);
  })
}
let canceler
let p = new Promise((res, rej) => {
  canceler = rej
  setTimeout(() => {
    res('fullied')
  }, 2000)
})

// let newP = waitFor(p, 3000)
// newP.then(data => console.log(data)).catch(err => console.log(err))
async function main() {
  // promise成功则运行否则不执行下一句语句
  await waitFor(p, 1000, canceler).catch(() => console.log(p))
}
main()