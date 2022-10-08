//对底部进行年份的更新
var year = document.getElementById("bottom_span");
var tody = new Date();
year.innerHTML = "Copyright@ " + tody.getFullYear() + " todolist.cn";

//点击添加事项时弹窗编辑框
function add() {
    var thing = document.getElementById("top_button");
    var add = document.getElementById("addContent");
    thing.onclick = function () {
        add.style.display = "block";
    }
}
// 点击关闭按钮时关闭编辑框        
function close() {
    var close = document.getElementById("close");
    var add = document.getElementById("addContent");
    var textarea = document.getElementById("textarea");
    //这里获取textarea中内容只能使用value，不能使用innerHTML
    close.onclick = function () {
        textarea.value = null;
        add.style.display = "none";
    }
}

//不能这样使用count，每次重新加载count的值都是从1开始
// var count = 1;
var j;
var count;
//点击保存按钮对编辑的内容存入浏览器本地
function save() {
    var save = document.getElementById("save");
    //获取编辑框中的内容
    var content = document.getElementById("textarea").value;
    //以浏览器的数据条数作为计数
    count = localStorage.length + 1;
    var key_number = count + "_data";
    console.log("数据条数=" + count);
    save.onclick = function () {
        // 如果编辑框内的内容不为空
        if (content != null && content != "" && content != undefined) {
            //存入数据                
            localStorage.setItem(key_number, content);
        }
        //删除展示数据列表当中的所有数据
        deleteChild();
        //删除后再对本地浏览器进行一次查询将所有数据展示出来
        showManage();
    }
}

//删除展示数据列表当中的所有数据
function deleteChild() {
    var div = document.getElementById("manage");
    // 获取div下的所有子元素
    var all_child = div.childNodes;
    for (j = all_child.length - 1; j > 1; j--) {
        div.removeChild(all_child[j]);
    }
}

var i;
var manage = document.getElementById("manage");
// 对已经完成的事件展示在下方列表中
function showManage() {
    // 获取存于浏览器本地的数据
    var length = localStorage.length;
    var key;
    for (i = 0; i < length; i++) {
        //键值
        key = i + 1 + "_data";
        if (localStorage.getItem(key) != null) {
            //获取对应键值的内容 不存在键值的话会返回一个null
            key_data = localStorage.getItem(key);
            // 获取key_data中的标题
            var title = (key_data.split("\n"))[0];
            // 获取创建的日期
            var endDate = getDate();
            title = title + "           " + endDate;
            //可以输出分隔符"    "
            console.log("title=" + title);
            // 创建元素节点
            var node = document.createElement("li");
            // 对每一个<li>元素赋予唯一的id
            node.id = key;
            // 新建文本节点
            var textnode = document.createTextNode(title);
            node.appendChild(textnode);
            // 创建新的元素列表
            manage.appendChild(node);
        }
    }
}

// 获取日期
function getDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDay();
    var end_Date = year + "/" + month + "/" + day;
    return end_Date;
}


// 更新正在进行下方的内容
function update_doing() {
    //获取编辑框中的内容
    var content = document.getElementById("textarea").value;
    //  用一个换行符将字符串进行分割 返回一个字符串数组
    var arr = content.split("\n");
    //获取第一行内容 (标题)
    var title = arr[0];
    //替换正在进行的内容
    var update_content = document.getElementById("update_content");
    update_content.innerHTML = title;
}


// 双击完成的列表中的任务会显示具体内容
function showListContent() {
    //添加一个双击事件
    document.body.addEventListener("dblclick", function (e) {
        event = e.srcElement ? e.srcElement : e.target;
        // console.log("event="+event);                
        if (event.tagName == "LI") {
            //获取该元素的id
            key_id = event.id;
            // 数据内容
            data = localStorage.getItem(key_id);
            // 展示数据内容
            var show = document.getElementById("show_data");
            var cover_show_data = document.getElementById("cover_show_data");
            show.innerHTML = data;
            cover_show_data.style.display = "block";
        }
    })
}

// 对展示的数据进行关闭
function closeList() {
    var clear_img = document.getElementById("clear_img");
    var cover_show_data = document.getElementById("cover_show_data");
    clear_img.onclick = function () {
        cover_show_data.style.display = "none";
    }
}

function execute() {
    add();
    update_doing();
    save();
    close();
    showListContent();
    closeList();
}
// 清除本地浏览器所有内容
// localStorage.clear();
// console.log("本地浏览器数据条数："+localStorage.length);
setInterval(execute, 2000);
