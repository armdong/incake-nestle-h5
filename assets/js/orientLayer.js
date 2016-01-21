$(function() {
	var orientLayer = document.getElementById("orientLayer");
	//判断横屏竖屏
	function checkDirect() {
	    if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
	        return "portrait";
	    } else {
	        return "landscape";
	    }
	}
	//显示屏幕方向提示浮层
	function orientNotice() {
	    var orient = checkDirect();
	    if (orient == "portrait") {
	        orientLayer.style.display = "none";
	    } else {
	        orientLayer.style.display = "block";
	    }
	}
	function init() {
	    orientNotice();
	    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
	        setTimeout(orientNotice, 200);
	    })
	}
	init();
});
