var web = 'http://dl.xintutech.cn/index.php?m=api';

var host = "http://dl.xintutech.cn/";


function logData(data){
	console.log(JSON.stringify(data));
}


/**
 * @description 判断网络状态
 */
function GetNetWorkState() {
    var NetStateStr = '未知';
    var types = {};
    types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
    types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
    types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
    types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
    types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
    types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
    types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
    NetStateStr = types[plus.networkinfo.getCurrentType()];

    return NetStateStr;
};

//判断是否有网络
function hasNet(){
    var IsCanUseNetWork = false;
    if (GetNetWorkState() == '未知' || GetNetWorkState() == '未连接网络') {
        IsCanUseNetWork = false;
    } else {
        IsCanUseNetWork = true;
    }
    return IsCanUseNetWork;
}

function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
//打开一个网页
function openurl(url,title){
	mui.openWindow({
		url: 'browser.html',
		id: 'browser',
		waiting: {
			autoShow: true
		},show: {
			aniShow: 'pop-in'
		},
		styles: {
			popGesture: 'hide'
		},extras: {
			url: url,
			title:title
		}
	});
}

(function(w){


// 处理点击事件
var openw=null,waiting=null;
/**
 * 打开新窗口
 * @param {URIString} id : 要打开页面url
 * @param {boolean} wa : 是否显示等待框
 * @param {boolean} ns : 是否不自动显示
 * @param {JSON} ws : Webview窗口属性
 */
w.clicked=function(id,wa,ns,ws){
	if(openw){//避免多次打开同一个页面
		return null;
	}
	if(w.plus){
		wa&&(waiting=plus.nativeUI.showWaiting());
		ws=ws||{};
		ws.scrollIndicator||(ws.scrollIndicator='none');
		ws.scalable||(ws.scalable=false);
		var pre='';//'http://192.168.1.178:8080/h5/';
		openw=plus.webview.create(pre+id,id,ws);
		//ns||openw.addEventListener('loaded',function(){//页面加载完成后才显示
//		setTimeout(function(){//延后显示可避免低端机上动画时白屏
			openw.show();
			closeWaiting();
//		},200);
		//},false);
		openw.addEventListener('close',function(){//页面关闭后可再次打开
			openw=null;
		},false);
		return openw;
	}else{
		w.open(id);
	}
	return null;
};
/**
 * 关闭等待框
 */
w.closeWaiting=function(){
	waiting&&waiting.close();
	waiting=null;
}
})(window);



(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.username.length < 2) {
			return callback('账号最短为 2 个字符');
		}
		if (loginInfo.password.length < 3) {
			return callback('密码最短为 3 个字符');
		}
		
		var ret;
		mui.ajax({
			url: web+"&c=user&a=login",
			data:loginInfo,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				console.log('login服务器返回信息：'+JSON.stringify(data));
				if (data.status == 1) {
					loginInfo.userid = data.userinfo.id;
					loginInfo.photo = data.userinfo.photo;
					loginInfo.password = data.userinfo.password;
					loginInfo.truename = data.userinfo.truename;
					loginInfo.role_id = data.userinfo.role_id;
					loginInfo.tel = data.userinfo.tel;
					plus.nativeUI.toast('登陆成功');
					return owner.createState(loginInfo, callback);
				} else {
					return callback('用户名或密码错误');
				}
			},
			error:function(xhr,type,errorThrown){
				plus.nativeUI.toast(errorThrown);
			}
		});

		
		
	};

	owner.createState = function(loginInfo, callback) {
		var state = owner.getState();
		state.username = loginInfo.username;
		state.password = loginInfo.password;
		state.userid = loginInfo.userid;
		state.role_id = loginInfo.role_id;
		state.token = "token123456789";
		state.photo = loginInfo.photo;
		state.truename = loginInfo.truename;
		state.tel = loginInfo.tel;
		owner.setState(state);
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
});
