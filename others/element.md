## code link
https://github.com/doctorwth/interface-js/blob/master/interface.user.js
## code
```js
function element(){
	var parent
	var lasttag
	var createdtag
	var toreturn={}
	for(var i=0;i<arguments.length;i++){
		var current=arguments[i]
		if(current){
			if(current.nodeType){
				parent=lasttag=current
			}else if(Array.isArray(current)){
				for(var j=0;j<current.length;j++){
					if(current[j]){
						if(!j&&typeof current[j]=="string"){
							var tagname=current[0].split("#")
							lasttag=createdtag=document.createElement(tagname[0])
							if(tagname[1]){
								toreturn[tagname[1]]=createdtag
							}
						}else if(current[j].constructor==Object){
							if(lasttag){
								for(var value in current[j]){
									if(value!="style"&&value in lasttag){
										lasttag[value]=current[j][value]
									}else{
										lasttag.setAttribute(value,current[j][value])
									}
								}
							}
						}else{
							var returned=element(lasttag,current[j])
							for(var k in returned){
								toreturn[k]=returned[k]
							}
						}
					}
				}
			}else if(current){
				createdtag=document.createTextNode(current)
			}
			if(parent&&createdtag){
				parent.appendChild(createdtag)
			}
			createdtag=0
		}
	}
	return toreturn
}
```
```js
element(
		["form#form",{
			name:"post",
			// action:serverurl+"post.php",
			method:"post",
			enctype:"multipart/form-data",
			class:"greenPostForm",
			// onsubmit:submitGreenPost
		},
			["input",{
				name:"thread",
				// value:threadId,
				type:"hidden"
			}],
			["div",{
				class:"persona"
			},
				["button",{
					type:"button",
					class:"greenToggle pressed",
					title:"[s4s] Interface",
					onclick:event=>{
						showPostFormQRX(1)
					}
				},"!"],
				["input#name",{
					name:"username",
					class:"field",
					placeholder:"Name",
					size:1,
					// value:nameField.value
				}],
				["input#options",{
					name:"options",
					class:"field",
					placeholder:"Options",
					size:1,
					// value:optionsField.value
				}]
			],
			["textarea#comment",{
				name:"text",
				class:"field",
				placeholder:"Comment",
				// value:commentField.value
			}],
			["div",{
				class:"file-n-submit"
			},
				["input",{
					type:"submit",
					value:"Submit"
				}]
			]
		]
	)
  ```
现在用框架多了，对于这些封装原生Dom构造函数不熟悉。
```js
class Element {
  constructor(...args) {
    let parent
    let lasttag
    let createdtag
    // 返回的是key为id，value为id队形的dom对象
    // var toreturn = {}
    for (let i = 0; i < args.length; i++) {
      let current = args[i]
      if (current) {
        if (current.nodeType) {
          parent = lasttag = current
        } else if (Array.isArray(current)) {
          for (let j = 0; j < current.length; j++) {
            if (current[j]) {
              // 数组的第一个元素，标签名
              if (!j && typeof current[j] === "string") {
                let tagname = current[0].split('#')
                // 更新lasttag指针
                lasttag = createdtag = document.createElement(tagname[0])
                if (tagname[1]) {
                  // tagname[1]是id
                  this[tagname[1]] = createdtag
                }
              } else if (Object.prototype.toString.call(current[j]) === '[object Object]') {
                if (lasttag) {
                  // 用此对象给lasttage指向的dom对象添加属性
                  for (let value in current[j]) {
                    if (value !== "style" && value in lasttag) {
                      lasttag[value] = current[j][value]
                    } else {
                      lasttag.setAttribute(value, current[j][value])
                    }
                  }
                }
              } else if (Array.isArray(current[j])) {
                // 遇到新的标签结构，使用递归定义并传入lasttage使得lasttage指向的dom节点添加子节点，并将其所有属性添加到toreturn中
                let returned = new Element(lasttag, current[j])
                // 观察可知当其有id属性时，returned才不等于{}
                for (let k in returned) {
                  this[k] = returned[k]
                }
              }
            }
          }
        } else if (typeof current) {
          // 字符串则创建文本节点
          createdtag = document.createTextNode(current)
        }
        if (parent && createdtag) {
          parent.append(createdtag)
        }
        createdtag = undefined
      }
    }  
  }
}
```
改写成class形式