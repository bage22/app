const WEB_HOST = 'https://zhifu.tjbzljt.com/bzglcustom';
//const WEB_HOST = 'http://192.168.10.31:8080/bzglcustom';
//const WEB_HOST = 'http://192.168.10.29:8080/bzglcustom';
//const WEB_HOST = 'http://192.168.10.85:8080/bzglcustom';
//const WEB_HOST = 'http://bzl.mangoc.cc';
const ENV = 'debug';

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