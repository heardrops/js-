function byId(id) {
	return typeof(id) === "string" ? document.getElementById(id) : id;
}

var index = 0;
var timer = null;
var dots = byId("dots").getElementsByTagName("span");
var prev = byId("prev");
var next = byId("next");
var pics = byId("banner").getElementsByTagName("div");
var len = pics.length;
var menu = byId("menu-content");
var menuItems = menu.getElementsByClassName("menu-item");
var subMenu = byId("sub-menu");
var innerBox = subMenu.getElementsByClassName("inner-box");

function slideImage() {
	var main = byId("main");
	//滑过清除定时器，离开继续
	main.onmouseover = function() {
		//清除定时器
		if (timer) {
			clearInterval(timer);
		}
	}

	main.onmouseout = function() {
		timer = setInterval(function() {
			index++;
			if(index >= len) {
				index = 0;
			}
			//切换图片
			changeImg();
		},3000);
	}
	//自动在main上触发onmouseout事件
	main.onmouseout();

	//点击圆点，切换图片
	for(var d= 0; d < len; d++) {
		dots[d].id = d;
		dots[d].onclick = function() {
			//改变index为当前span的索引
			index = this.id;
			changeImg();
		}
	}

	//下一张
	next.onclick = function() {
		index++;
		if(index >= len) {
			index = 0;
		}
		changeImg();
	}

	//上一张
	prev.onclick = function() {
		index--;
		if(index < 0) {
			index = len - 1;
		}
		changeImg();
	}

	//导航菜单
	for(var i = 0; i < menuItems.length; i++) {
		menuItems[i].setAttribute("data-index",i);//增加自定义属性
		menuItems[i].onmouseover = function() {
			subMenu.className = "sub-menu";
			var idx = this.getAttribute("data-index");
			for(var j = 0; j < innerBox.length; j++) {
				innerBox[j].style.display = "none";
				menuItems[j].style.background = "none";
			}
			menuItems[idx].style.background = "rgba(0, 0, 0, 0.3)";
			innerBox[idx].style.display = "block";		
		}
	}

	menu.onmouseout = function() {
		subMenu.className = "sub-menu hide";
	}

	subMenu.onmouseover = function() {
		this.className = "sub-menu";
	}

	subMenu.onmouseout = function() {
		this.className = "sub-menu hide";
	}
}

//切换图片
function changeImg() {
	//需要遍历banner下多有的div,将其隐藏
	for(var i = 0; i < len; i++) {
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = "block";
	dots[index].className = "active";
}

slideImage();
