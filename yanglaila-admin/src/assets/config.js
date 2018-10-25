// const apiUrl = 'https://stage.yanglai.la';
    const apiUrl = 'http://192.168.31.234:8081';
    const ETHUrl = 'https://ropsten.etherscan.io';

// 
//设置cookie<存>
const setCookie = function(cname, cvalue, exhours) {
        var d = new Date();
        d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    };
//获取cookie
const getCookie =function(cname) {
        var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;

    }
//清除cookie
const clearCookie= function (key) {
        setCookie(key, "", -1);
      }

export default {
    apiUrl,
    ETHUrl,
    setCookie,
    getCookie,
    clearCookie
}