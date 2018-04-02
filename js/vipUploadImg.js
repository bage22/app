  var files = []; 
            (function($, doc) {
                mui.init({
                    swipeBack: true //启用右滑关闭功能
                });
            
                
                document.addEventListener("plusready", plusReady, false);  
  
                function plusReady() {
                    var wv = plus.webview.currentWebview();
                    document.getElementById("addnew").addEventListener("tap", function() {  
                        showActionSheet();//拍照还是相册  
                    });                
                    plus.nativeUI.closeWaiting();
                  
                }  
            }(mui, document));
             
        
            document.getElementById("next").addEventListener('tap', function() {
                   upload();
            });
             
             
            // 上传文件  
            function upload() {  
                
                var userid = document.getElementById('userid').value;
                var task = plus.uploader.createUpload('http://192.168.8.101:8989/api/v1/vehicle/uploadImage', {  
                        method: "POST"  
                    },
                    function(t, status) { //上传完成  
                        if (status == 200) {
                            var result =jQuery.parseJSON(t.responseText);
                            mui.toast(result.message);  
                              
                        } else {  
                            console.log("上传失败：" + status);
                        }  
                    }
                );  
            
                for (var i = 0; i < files.length; i++) {
                    var f = files[i];
//                  alert(f.path);
                    task.addFile(f.path, {  
                        key:f.name
                    });
                    
                   }
                task.addData('userid',userid);
                task.start();     
                  
            }  
              
            // 添加文件  
            var index = 1;  
            var newUrlAfterCompress;  
            function appendFile(p) {
            	alert(p);
                files.push({ 
                    path: p,
                    name: "uploadkey_" + index
                });  
                index++;  
            }  
            // 产生一个随机数  
            function getUid() {  
                return Math.floor(Math.random() * 100000000 + 10000000).toString();  
            }  
              
            
              
            function galleryImgs() { // 从相册中选择图片  
                plus.gallery.pick(function(e) {  
                    //$(".dynamic_images ul li").remove(".pickimg");  
                    console.log("选择了"+e.files.length+"个图片");  
                    for (var i = 0; i < e.files.length; i++) {  
                        if (i < 9) {  
                            $("#listImg").prepend("<li class='pickimg'><img src='" + e.files[i] + "' /></li>");  
                            var dstname="_downloads/"+getUid()+".jpg";//设置压缩后图片的路径  
                            newUrlAfterCompress=compressImage(e.files[i],dstname);  
                            appendFile(dstname);
                        }  
                    }  
                }, function(e) {  
                    console.log("取消选择图片");  
                }, {  
                    filter: "image",  
                    multiple: true  
                });  
            }  
              
//          //压缩图片，这个比较变态的方法，无法return  
            function compressImage(src,dstname) {  
                var dstname="_downloads/"+getUid()+".jpg";  
                plus.zip.compressImage({  
                        src: src,  
                        dst: dstname,  
                        overwrite:true,  
                        quality: 20  
                    },  
                    function(event) {   
                        return event.target;  
                    },  
                    function(error) {  
                        console.log(error);  
                        return src;
                    });
            }  
            
              
            function showActionSheet() {
                var bts = [{  
                    title: "拍照"  
                }, {  
                    title: "从相册选择"  
                }];  
                plus.nativeUI.actionSheet({  
                        cancel: "取消",  
                        buttons: bts  
                    },  
                    function(e) {  
                        if (e.index == 1) {  
                            getImage();  
                        } else if (e.index == 2) {  
                            galleryImgs();  
                        }  
                    }  
                );  
            }  
            //拍照  
            function getImage() {  
                var cmr = plus.camera.getCamera();  
                cmr.captureImage(function(p) {  
                    plus.io.resolveLocalFileSystemURL(p, function(entry) {  
                        var localurl = entry.toLocalURL(); //  
                        //$(".dynamic_images ul li").remove(".pickimg");  
                        $("#listImg").prepend("<li class='pickimg'><img src='" + localurl + "' /></li>");  
                         var dstname="_downloads/"+getUid()+".jpg";//设置压缩后图片的路径  
                            newUrlAfterCompress=compressImage(localurl,dstname);  
                            appendFile(dstname); 
                    });  
                });  
            }  