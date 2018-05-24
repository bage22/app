function checkPhone(el){ //'#sdf'|| '.djf'
	var phone = $(el).val();
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
    	mui.toast('手机号错误');
        $(el).focus();
        return false; 
    }else{
    	return true;
    }
}