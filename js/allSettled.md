```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"

Promise.myAllSellted = async function(pAry) {
  if (!Array.isArray(pAry)) return

  await new Promise(async resolve => {
    try {
      await Promise.all(pAry)
    } catch {}
    resolve()
  })


  return new Promise(resolve => {
    for (const p of pAry) {
      p.then(() => p.status = 'fulfilled').catch(() => p.status = 'rejected')
    }
    resolve(pAry)
  })
}

Promise.myAllSellted(promises).then((results) => results.forEach((result) => console.log(result.status)));
```
感觉实现的不好