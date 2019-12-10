## 过程
懒加载的实现分两步：
- 判断图片出现在当前视口
- 使用JS控制图片加载

## 判断图片出现在当前视口
外面要获取图片相对于视口的高度，可以通过如下代码获取
```js
img.getBoundingClientRect().top
```
当前视口高度
```js
document.documentElement.clientHeight
```
## 使用JS控制图片加载
图片先不设置src属性
```js
<img data-src="xxx.jpg">
```
然后监听window.scroll事件，为了性能考虑，对于事件处理函数要使用节流函数进行包装，推荐使用lodash
```js
_.throttle(f)
```
```js
// 初始化, (类数组转数组的ie兼容写法, 属性选择器原生写法为querySelectorAll('img[data-src]')， 好像ES5的元素选择器不能选属性)
// Array.protptype.call($('img[data-src]'))
let lazyLoadImgs = [].slice.call($('img[data-src]'))
let viewHegiht = document.documentElement.clientHeight

function lazyLoad() {
  let unLoadImgs = lazyLoadImgs.reduce(function(accAry, img) {
    if (img.getBoundingClientRect().top < viewHeight) {
      img.setAttribute('src', `${img.dataset.src}`)
      img.removeAttribute('data-src')
    } else {
      accAry.push(img)
    }
  }, [])
  lazyLoadImgS = unloadImgs
}

// 加载首页图片
lazyLoad()
window.addEventListener('scroll', _.throttle(lazyLoad, 1000))
```
chrome可以支持类数组对象直接使用forEach

## 更好的实现
IntersectionObserver API
```js
const imgs = document.querySelectorAll('img[data-src]')

const observer = new IntersectionObserver((imgs) => {
  imgs.forEach((img) => {
    // intersectionRatio
    if (img.isIntersecting) {
      const image = img.target
      image.src = img.dataset.src
      image.removeAttribute('data-src')
      observer.unobserve(image)
    }
  })
})
observer(imgs)
```
最新方案
```html
<img src="shanyue.jpg" loading="lazy">
```
img标签loading属性可以支持懒加载，但兼容性除了chrome，都不可用。