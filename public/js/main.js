window.deleteCookie = function (cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

window.getCookie = function (cookieName) {
    let name = cookieName + '=';
    let ca = document.cookie.split(';');
    let caLength = ca.length;
    for (let i = 0; i < caLength; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
}

window.setCookie = function (cookieName, cookieValue, expiresMinutes) {
    let d = new Date();
    d.setTime(d.getTime() + (expiresMinutes * 60 * 1000));
    let expires = 'expires=' + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
}