import Promise from 'nd-promise'

const files = [];

function load(url){
    if(files[url] === true)
        return Promise.resolve(url)
    
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState){//IE
            script.onreadystatechange = () => {
                if (script.readyState ==  "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    files[url] = true;
                    resolve(url)
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            script.onload = function(){
                files[url] = true;
                resolve(url)
            };
        }
        script.src = url;
        console.log(script)
        document.head.appendChild(script);
    })
}

function jsonp(url){
    if(!!files[url]){
        console.log('has get:' +url);
        return Promise.resolve(files[url], true)
    }

    return new Promise((resolve, reject) => {
        var s = document.createElement("script"),
            callback = "jsonpCallback_" + new Date().getTime(),
            urlc = url + ((url.indexOf('?') > 0)?'&':'?') + 'callback='+callback;
        window[callback] = function (data) {
            //console.log('callback trigger');
            resolve(data, false);
            if(typeof(data) === 'undefined')
                files[url] = true;
            else
                files[url] = data;
        };
        s.src = urlc;
        document.body.appendChild(s);
    })
}

export default { load, jsonp };