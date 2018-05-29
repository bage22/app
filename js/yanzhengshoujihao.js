function checkPhone(el){ //'#sdf'|| '.djf'
	var phone = $(el).val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
        return false; 
    }else{
    	return true;
    }
}