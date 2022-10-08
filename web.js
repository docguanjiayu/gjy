//1.在每个span后面添加close节点
var myNodelist = document.getElementsByTagName("li")//返回带有指定标签名的对象的集合  getElementsByTagName()可以获取任何类型的html元素列表

for (var i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("span");
    /*
    document.createElement(tagName,[options]);
    该方法用创建一个标签名为tagName的指定标签元素。
    参数：
    tagName:指定要创建的元素类型的字符串，再html文档上调用createElement()方法创建元素之前会将tagName转化成小写
    options:一个可选的参数ElementCreationOptions是包含一个属性为is的对象，该对象的值是用customElements.define()方法定义过的一个自定义元素的标签名。
     */

    var txt = document.createTextNode("\u00D7");
    /*
    document.createTextNode("\u00D7");
    创建一个新的文本节点
     */
    span.className = "close";
    span.appendChild(txt);
    /*
    .appendChild(node)
    向节点添加最后一个子节点
    参数：node是必须的，希望添加的节点对象
     */
    myNodelist[i].appendChild(span);

}

//2.处理删除事件
var close = document.getElementsByClassName("close")
for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        //parentElement表示返回当前节点的父元素节点
        var div = this.parentElement
        div.style.display = "none"
    }
}

//3.处理任务完成事件
var list = document.querySelector("ul")
/*
document.querySelector(selectors);
文档对象模型Document引用的querySelector()方法返回文档中与指定选择器或选择器组匹配的第一个Element对象，如果找不到匹配项则返回null。
selectors:包含一个或多个要匹配的选择器的DOM字符串DOMString。该字符串必须是有效的CSS选择器字符串，如果不是则引发异常。
 */
console.log(list)
list.addEventListener('click', function (ev) {
    //event.target属性可以用来实现事件委托，例如将事件绑定在ul上，但是点击li时可以被触发
    //tagName是获取元素的标签名，返回事件的大写标签
    if (ev.target.tagName === 'LI') {
        //toggle方法是在元素中切换类名，在被选元素上进行hide（）和show（）之间的切换
        //classList对元素的class继续操作
        ev.target.classList.toggle('check')
    }
}, false);

//4.处理点击add按钮，列表中添加一个待办事项

function addElement() {
    var things = document.getElementById('things').value

    // alert(localStorage.setItem("mutodolist",JSON.stringify(things)))

    var li = document.createElement('li')

    var t = document.createTextNode(things)

    if (things == '') {
        alert("请输入待办事件")
    }
    else {
        list.appendChild(li)
        li.appendChild(t)
    }

    var span = document.createElement('span')
    var txt = document.createTextNode('\u00D7')

    span.className = 'close'
    span.appendChild(txt)
    li.appendChild(span)

    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement
            div.style.display = "none"
        }
    }
}
