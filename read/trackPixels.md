## track
几乎每一家网站例如facebook都会追踪网站，给用户推荐广告。不过用户可以听过adblocker来阻止third-party trackers跟踪。
## tracking pixels
它通常是1*1透明的gif。它的请求url不是https://www.facebook.com/tr/，而是https://www.facebook.com/tr/?the_website_you're_on。
利用类似crfs的方法，在其他网站上想Facebook服务器请求tracking pixels，会将Facebook的cookie携带上。
## tracking pixels的请求
在作者的文中，抱歉我没尝试出来，可能我没有Facebook账号或者网络条件不好。
tracking pixels的请求url为
```js
https://www.facebook.com/tr/?id=937725046402747&ev=PageView&dl=https%3A%2F%2Foldnavy.gap.com%2Fbrowse%2Fproduct.do%3Fpid%3D504753002%26cid%3D1125694%26pcid%3Dxxxxxx0%26vid%3D1%26grid%3Dpds_0_109_1%23pdp-page-content&rl=https%3A%2F%2Foldnavy.gap.com%2Fbrowse%2Fcategory.do%3Fcid%3D1135640%26mlink%3D5155%2Cm_mts_a&if=false&ts=1576684838096&sw=1920&sh=1080&v=2.9.15&r=stable&a=tmtealium&ec=0&o=30&fbp=fb.1.1576684798512.1946041422&it=15xxxxxxxxxx4&coo=false&rqm=GET
```
此时Facebook的服务器已经收到三个信息，
一个是作者浏览的网页
https://oldnavy.gap.com/browse/product.do?pid=504753002&cid=1125694&pcid=1135640&vid=1&grid=pds_0_109_1#pdp-page-content
二是引导作者浏览的引导网页
https://oldnavy.gap.com/browse/category.do?cid=1135640&mlink=5155,m_mts_a
三是作者的Facebook cookie（携带在tracking pixels上cookie上）
10oGXEcKfGekg67iy.AWVdJq5MG3VLYaNjz4MTNRaU1zg.Bd-kxt.KU.F36.0.0.Bd-kx6.
当作者再次登录Facebook，果然它的Facebook的cookie再次发到Facebook的服务器，印证了作者的想法。
## tracking pixels cookies are third-party cookies
跟第一方cookie相比，第三方cookie是为了追踪你浏览过那些网站。而Safari and Firefox both block many third-party cookies by default。但是chrome并没有，作者嘲讽到因为谷歌是一间广告公司。
## end
Like I expected, sites have lots of tracking pixels. For example, wrangler.com loaded 19 different tracking pixels in my browser from a bunch of different domains. The tracking pixels on wrangler.com came from: ct.pinterest.com, af.monetate.net, csm.va.us.criteo.net, google-analytics.com, dpm.demdex.net, google.ca, a.tribalfusion.com, data.photorank.me, stats.g.doubleclick.net, vfcorp.dl.sc.omtrdc.net, ib.adnxs.com, idsync.rlcdn.com, p.brsrvr.com, and adservice.google.com.
作者列举了使用pixel track的网站。
作者还列出了防范措施
- install an adblocker
- use Firefox/Safari instead of Chrome
- use the Facebook Container Firefox extension