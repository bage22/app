mui.plusReady(function() {
	console.log("==========登陆验证=======")
//	验证是否登陆过
	if(localStorage.getItem("token")) {
		console.log("==========有token=======")
		//	登陆是否有效
		mui.ajax(WEB_HOST + '/userCenter/profile', {
			data: {
				token: localStorage.getItem("token")
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				//console.log(JSON.stringify(data));
				if(data.message === "登录异常,请重新登录!") {
					console.log("==========token失效=======")
					var btnArray = ['是'];
					mui.confirm("未登录，现在是否去登录", function(e) {
						var ws = plus.webview.currentWebview();
						plus.webview.close(ws);
						console.log(JSON.stringify(ws));
						if(e.index == 0) {
							var w = plus.webview.create('login.html');
							w.show(); // 显示窗口
						}else{
							if(ws.id === "my-profile"){
								plus.webview.getWebviewById('main').reload(true);
							}
						}
					})
				}
			}
		});
	} else {
		console.log("==========没有token=======");
		var btnArray = ['是'];
		mui.confirm("未登录，现在是否去登录", function(e) {
			var ws = plus.webview.currentWebview();
			plus.webview.close(ws);
			if(e.index == 0) {
				var w = plus.webview.create('login.html');
				w.show(); // 显示窗口
			}
		})
		
	}
})