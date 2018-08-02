//开发：http://192.168.100.232:8081
//李：http://192.168.100.132:8081
//胡：http://192.168.100.10:8081
var $ajaxUrl="http://192.168.100.232:8081",$ajaxUrlS="http://192.168.100.232:8083",$ajaxUrlW="http://192.168.100.232:8085";
(function(){
    var body=document.body||document.documentElement;
    body.style.display="none";
    var version="?v="+(new Date()).getTime(),
        main=document.getElementById("$main"),
        linkIndex= 0,
        scriptIndex= 0,
        links=main.getAttribute("dataLinks").split(","),
        scripts=main.getAttribute("dataScripts").split(",");
    addlink();
    addScript();
    function addScript(){
        loadScript(scripts[scriptIndex],function(){
            scriptIndex++;
            if(scripts[scriptIndex]){
                addScript();
            }
        });
    }
    function loadScript(url,callback){
        var script=document.createElement('script'),headEl=document.getElementsByTagName("head")[0];
        script.type='text/javascript';
        script.async='async';
        script.src=url+version;
        headEl.appendChild(script);
        if(script.readyState){   //IE
            script.onreadystatechange=function(){
                if(script.readyState=='complete'||script.readyState=='loaded'){
                    script.onreadystatechange=null;
                    callback();
                }
            }
        }else{    //非IE
            script.onload=function(){callback();}
        }
    }
    function addlink(){
        loadLink(links[linkIndex],function(){
            linkIndex++;
            if(links[linkIndex]){
                addlink();
            }else {
                body.style.display="block";
            }
        })
    }
    function loadLink(url,callback){
        var link=document.createElement('link'),headEl=document.getElementsByTagName("head")[0];
        link.rel='stylesheet';
        link.href=url+version;
        headEl.appendChild(link);
        if(link.readyState){   //IE
            link.onreadystatechange=function(){
                if(link.readyState=='complete'||link.readyState=='loaded'){
                    link.onreadystatechange=null;
                    callback();
                }
            }
        }else{    //非IE
            link.onload=function(){callback();}
        }
    }
})();