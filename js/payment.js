//      var ALIPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=';
//      var WXPAYSERVER='http://demo.dcloud.net.cn/payment/wxpayv3.HBuilder/?total=1'; 
//token='+localStorage.getItem("token")+'&orderId='+orderIds+'&totalFee='+totalFees+'&title='+titles
        var ALIPAYSERVER=WEB_HOST+'/index/zfbPayMobile?';
        var WXPAYSERVER=WEB_HOST+'/index/wxPayH5?';  
        // 2. 发起支付请求  
        function pay(types,tokens,orderIds,totalFees,titles,ip){
//      	console.log("支付信息"+types+"--"+tokens+"--"+orderIds+"--"+totalFees+"--"+titles+"--"+ip);
                // 从服务器请求支付订单  
                var PAYSERVER='';  
                if(types=='alipay'){  
                    PAYSERVER=ALIPAYSERVER;  
                    channel = aliChannel;  
	            }else if(types=='wxpay'){  
	                    PAYSERVER=WXPAYSERVER;  
	                    channel = wxChannel;  
	            }else{  
                    plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");  
                    return;  
	            }
                var xhr=new XMLHttpRequest();  
//              var amount = parseInt(docuSSSSWSment.getElementById("jsprice").innerHTML);
                xhr.onreadystatechange=function(){
                    switch(xhr.readyState){  
                        case 4:  
                        if(xhr.status==200){
                        	mui.toast("请求成功");
                            plus.payment.request(channel,xhr.responseText,function(result){  
                                mui.toast("支付成功");
                                var wobj = plus.webview.getWebviewById("order");//注意 HBuilder 是   1.html 的 ID  你如果1.html 有ID   要替换掉HBuilder，  
                                wobj.reload(true); 
                            },function(error){  
                                mui.toast("支付失败：" + error.code);  
                            });  
                        }else{  
                            mui.toast("获取订单信息失败！");
                        }  
                        break;  
                    default:  
                    break;  
                }  
         }  
            xhr.open('POST',PAYSERVER);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send('token='+tokens+'&orderId='+orderIds+'&totalFee='+totalFees+'&title='+titles+'&ip='+ip);
    }