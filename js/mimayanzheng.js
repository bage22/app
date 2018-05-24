var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
function checkPassword(el){//el: 只能传id 例如 '#password'
    var value = $(el).val();
    if(!pwdReg.test(value)){
        return "假的";
    }else{
    	return "真的";
    }
}