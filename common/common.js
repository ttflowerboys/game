//开发：http://192.168.100.232:8081
//李：http://192.168.100.132:8081
//胡：http://192.168.100.10:8081
var $ajaxUrl = "http://192.168.100.232:8081",//http://192.168.100.232:8081//http://preapi_jch.jiupaicn.com
    $ajaxUrlS = "//http://192.168.100.232:8083",//http://192.168.100.232:8083//http://prees_jch.jiupaicn.com
    $ajaxUrlW = "http://192.168.100.232:8085",//http://192.168.100.232:8085//http://preim_jch.jiupaicn.com
    $ajaxUrlM = "http://preim_jch.jiupaicn.com",
    updataType = null,
    schoolData = {
        queryName: "",
        exclude: '',
    },
    schoolList = null,
    nowform = null;
;
//$装载方法
$.extend({
    layAlert: function (title, text, callBack) {
        layui.use('layer', function () {
            layui.layer.open({
                title: title,
                content: text,
                yes: function (index) {
                    if (callBack) callBack();
                    layui.layer.close(index);
                },
                cancel: function () {
                    if (callBack) callBack();
                }
            });
        });
    },
    //轮播图
    layCarousel: function (id, autoplay = false) {
        layui.use('carousel', function () {
            var carousel = layui.carousel;
            //建造实例
            carousel.render({
                elem: id,
                arrow: 'always',
                width: '100%',
                autoplay: autoplay,
                interval: 5000,
            });
        });
    },
    //弹层
    layOpen(type, content, callBack, title = '查看', area = "700px") {
        layui.use('layer', function () {
            layui.layer.open({
                type: type,
                content: content,
                title: title,
                area: area,
                yes: function (index) {
                    if (callBack) callBack();
                    layui.layer.close(index);
                },
                cancel: function (index) {
                    layui.layer.close(index);
                    return false;
                }
            })
        })
    },
    //图片报错
    imgErr: function () {
        var img = event.srcElement;
        img.src = 'img/index1.png';
        img.onerror = null;
    },
    initPag(id, count, callBack) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            laypage.render({
                elem: id,
                count: count,
                jump: function (obj, first) {
                    if (!first) callBack(obj);
                }
            });
        });
    },
    //默认
    myAjax: function (url, data, success, hiddenProgress, method) {
        if (hiddenProgress) {
            $("#C_progress").css("display", "block");
        }
        $.ajax({
            url: $ajaxUrl + url,
            type: method ? method : 'post',
            data: data,
            dataType: "json",
            success: function (ret) {
                $("#C_progress").css("display", "none");
                success(ret);
            },
            error: function (err) {
                $("#C_progress").css("display", "none");
                console.log(err);
            }
        });
    },
    //需要token请求
    ajaxT: function (url, data, success, hiddenProgress) {
        if (hiddenProgress) {
            $("#C_progress").css("display", "block");
        }
        $.ajax({
            url: $ajaxUrl + url,
            type: 'post',
            headers: {
                Authorization: $.getCookie("token")
            },
            data: data,
            dataType: "json",
            success: function (ret) {
                $("#C_progress").css("display", "none");
                if (ret.status == "error" && ret.data == "untoken") {
                    $.delCookie("token");
                    //删除登录状态
                    $(".C_topL").removeClass("hasLogin");
                    $.layAlert("提示", "用户已过期，请重新登陆！");
                    return;
                }
                //返回状态
                success(ret);
            },
            error: function (err) {
                $("#C_progress").css("display", "none");
                console.log(err);
            }
        });
    },
    //搜索
    myAjaxS: function (url, data, success, hiddenProgress) {
        if (hiddenProgress) {
            $("#C_progress").css("display", "block");
        }
        $.ajax({
            url: $ajaxUrlS + url,
            type: 'post',
            data: data,
            dataType: "json",
            success: function (ret) {
                $("#C_progress").css("display", "none");
                success(ret);
            },
            error: function (err) {
                $("#C_progress").css("display", "none");
                console.log(err);
            }
        });
    },
    //问卷调查
    myAjaxW: function (url, data, success, hiddenProgress) {
        if (hiddenProgress) {
            $("#C_progress").css("display", "block");
        }
        $.ajax({
            url: $ajaxUrlW + url,
            type: 'post',
            data: data,
            dataType: "json",
            success: function (ret) {
                $("#C_progress").css("display", "none");
                success(ret);
            },
            error: function (err) {
                $("#C_progress").css("display", "none");
                console.log(err);
            }
        });
    },
});
//立即执行
$(function () {
    $("header").load("common/template.html #C_header", function () {
        $("footer").load("common/template.html #C_footer", function () {
            commonScript();
        });
    });
});

//统一逻辑
function commonScript() {
    //登录统一处理
    (function () {
        var token = $.getCookie("token");
        if (token != "") {
            //登录图片
            $(".C_userImg").css("background-image", "url(" + $.getCookie("userPhoto") + ")");
            //登录名
            $(".C_userName").text($.getCookie("userName"));
            //登录状态
            $(".C_topL").addClass("hasLogin");
            //请求
            $.myAjax("/auth/check", {token: token}, function (data) {
                if (data["data"]) {//没过期
                    $(".C_topL").addClass("hasLogin");
                } else {
                    $(".C_topL").removeClass("hasLogin");
                    $.layAlert("提示", "登录失效，请重新登陆！");
                }
            });
        }
        $("#outLogin").click(function () {
            //删除token
            $.delCookie("token");
            //重新加载
            location.reload();
        })
    })();
    //统一切换头部导航样式
    (function () {
        var url = location.href, htmlName = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".html"));
        if (htmlName == "index") {
            $(".C_indexTabs>li").eq(0).addClass("active");
        } else if (htmlName == "provinmap" || htmlName == "cityMap") {
            $(".C_indexTabs>li").eq(1).addClass("active");
        }
    })();
    //搜索
    (function () {
        $(".C_search").click(function () {
            $("#C_searchArea").css("display", "block");
            $("#C_searchArea input").focus();
        });
        $("#C_searchArea input").blur(function () {
            setTimeout(function () {
                $("#C_searchArea").css("display", "none");
            }, 350);
        })
    })();
    //表单
    onForm();
    searchInput();
}

onForm = () => {
    layui.use('form', function () {
        nowform = layui.form;
        //监听提交
        nowform.on('submit(formDemo)', function (data) {
            layer.msg(JSON.stringify(data.field));
            updataAll(data.field);
            return false;
        });
        nowform.on('select(city)', function (data) {
            searchArea($('select[name=street]'), data.value);
        });
        nowform.on('select(school)', function (ele) {
            getClass(ele);
            ;
        });
        //报名相关的事件绑定
        bindInit();
        //调用搜索接口
        searchArea($('select[name=city]'))
        //输入
        schoolInput();
    });
}
//插入
setSearchText = (select, data) => {
    select.html(data);
    nowform.render();
};
//输入
schoolInput = () => {
    //事件代理
    $(".confirmSchool").click(function () {
        searchSchool($(this).parents('.selectTypeClk').find('input:eq(0)').val())
    })
};
//绑定
bindInit = () => {
    //报名框
    $(".C_enroll").click(function () {
        $(".C_enrollShadow").fadeIn();
    });
    //孩子弹窗
    $("#C_identify1").click(function () {
        $(".C_childEnroll").css("display", "block");
        updataType = "/signup/childrensubmit";
    });
    //自己弹窗
    $("#C_identify2").click(function () {
        $(".C_ownEnroll").css("display", "block");
        updataType = "/signup/myselfsubmit";
    });
    //老师弹窗
    $("#C_identify3").click(function () {
        $(".C_teacherEnroll").css("display", "block");
        updataType = "/signup/teachersubmit";
    });
    //关闭一级框
    $(".C_shutAll").click(function () {
        $(this).parents(".C_shutShadow").fadeOut();
    });
    //关闭二级框子
    $(".C_shut").click(function () {
        $(this).parents(".C_shutBox").css("display", "none");
    });
    //type类型
    $("#C_identifyRadio1>div").click(function () {
        var type = $(this).find("div").text();
        if (type == "学生") {
            $(".C_worksType").css("display", "none");
            $(".C_studentType").css("display", "block");
        } else {
            $(".C_studentType").css("display", "none");
            $(".C_worksType").css("display", "block");
        }
    });
    //type类型
    $("#C_identifyRadio2>div").click(function () {
        var type = $(this).find("div").text();
        if (type == "任课老师") {
            $(".C_teacherHeadType").css("display", "none");
        } else {
            $(".C_teacherHeadType").css("display", "block");
        }
    });
};
//筛选地点
searchArea = ($ele, val = 420000) => {
    var data = "";
    $.ajaxT('/common/findarea', {id: val}, (res) => {
        res.listBean.forEach((v, i) => {
            data += "<option value=" + v.id + ">" + v.name + "</option>"
        })
        setSearchText($ele, data);
    }, true)
};
//筛选学校
searchSchool = (val) => {
    schoolData.queryName = val;
    var data = "";
    $.ajaxT('/common/queryschool', schoolData, (res) => {
        if (!res.listBean || res.listBean.length == 0) return;
        schoolList = res.listBean;
        res.listBean.forEach((v, i) => {
            data += "<option value=" + v.matchId + ">" + v.schoolName + "</option>"
        })
        setSearchText($('select[name=school]'), data);
    },)
};
//获取班级
getClass = (ele) => {
    let data = schoolList.filter((v, i) => {
        return v.matchId == ele.value
    })[0]
    let dataSon1 = ''
    data.classTypeList.forEach((v, i) => {
        dataSon1 += "<option value=" + v.id + ">" + v.name + "</option>"
    })
    setSearchText($('select[name=grade]'), dataSon1);
    let dataSon2 = ''
    data.classNumTypeList.forEach((v, i) => {
        dataSon2 += "<option value=" + v.id + ">" + v.name + "</option>"
    })
    setSearchText($('select[name=class]'), dataSon2);
};
//提交
updataAll = (fied) => {
    $.ajaxT(updataType, fied, (res) => {
    }, true)
};
//获取最热
window._getHot = () => {
    $.myAjax('/apiRecommend/getRecentRecommendSubjects', {}, (res) => {
        let data = ""
        res.data && res.data.forEach((v, i) => {
            data += "<li><a href=" + v.rd_subject_link + " style='background-image: url(" + v.rd_subject_bg + ");'></a></li>"
        })
        $(".hotL").html(data);
    }, true, 'post')
};
//搜索
search = (val) => {
    let data = {
        content: val,
        type: 1,
    }
    $.myAjaxS('/api/search', data, (res) => {
        console.log(res.data);
    })
};
searchInput = () => {
    $('.C_SearchBar input').keyup(function () {
        search($(this).val())
    })
};
/*统一关闭弹窗*/
closeMOdel = () => {
    $(event.srcElement).parents('.shadow').fadeOut();
};