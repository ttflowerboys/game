//开发：http://192.168.100.232:8081
//李：http://192.168.100.132:8081
//胡：http://192.168.100.10:8081
var $ajaxUrl = "http://192.168.100.232:8081",
    $ajaxUrlS = "http://192.168.100.232:8083",
    $ajaxUrlW = "http://192.168.100.232:8085",
    updataType = null,
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
    layCarousel: function (id) {
        layui.use('carousel', function () {
            var carousel = layui.carousel;
            //建造实例
            carousel.render({
                elem: id,
                width: '100%',
                arrow: 'always'
            });
        });
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
    //post请求
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
    }
});
//立即执行
$(function () {
    $("header").load("common/template.html #C_header", function () {
        $("footer").load("common/template.html #C_footer", function () {
            commonScript();
        });
        /*hot*/
        $(".hotSlot").load("common/template.html #hotActivity", () => {
            getHotT()
        })
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
    layui.use('form', function () {
        var form = layui.form;
        //监听提交
        form.on('submit(formDemo)', function (data) {
            layer.msg(JSON.stringify(data.field));
            updataAll(data.field);
            return false;
        });
        //报名相关的事件绑定
        bindInit();
        //调用搜索接口
        selectSchool();
        //渲染
        form.render();
    });
}

//筛选
setSearchText = ($optionBox, $dlBox) => {
    $optionBox.append('' +
        '<option value="777">结果1</option>' +
        '<option value="888">结果2</option>' +
        '<option value="999">结果3</option>'
    );
    $dlBox.append('' +
        '<dd lay-value="777">结果1</dd>' +
        '<dd lay-value="888">结果2</dd>' +
        '<dd lay-value="999">结果3</dd>'
    );
};
selectSchool = () => {
    setSearchText($(".selectTypeClk select"), $(".selectTypeClk dl"));
    setSearchText($(".selectTypeCity select"), $(".selectTypeCity dl"));
    $(".selectTypeClk input").keyup(function () {
        var selectEl = $(this).parents(".selectTypeClk"),
            dlBox = selectEl.find("dl"),
            optionBox = selectEl.find("select");
        setSearchText($(optionBox), $(dlBox));
    });
    $(".selectTypeClk").delegate("dd", "click", function () {
        var selectEl = $(this).parents(".selectTypeClk"),
            optionBox = selectEl.find("select"),
            index = $(this).index();
        //选中样式
        $(this).siblings().removeClass("layui-this");
        $(this).addClass("layui-this");
        selectEl.find("input").after(selectEl.find("input")[0].outerHTML).remove();
        optionBox.find("option").attr("selected", false);
        optionBox.find("option").eq(index).attr("selected", true);
        selectEl.find("input").val($(this).text());
    });
    $(".selectTypeClk").delegate("input", "blur", function () {
        var selectEl = $(this).parents(".selectTypeClk"),
            optionBox = selectEl.find("select");
        $(this).val(optionBox.find("option:selected").text());
    });
};
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
//搜索
search = () => {
    $.myAjax('/api/search', {}, (res) => {
        console.log(res.data);
    }, true, 'post')
};
getHotT = () => {
    $.myAjax('/apiRecommend/getRecentRecommendSubjects', {}, (res) => {
        $(".hotL").html(template("hotL", {"data": res.data}));
    }, true, 'post')
};
updataAll = (fied) => {
    $.ajaxT(updataType, fied, (res) => {
        layer.msg('报名成功');
        $(".C_shutBox").css("display", "none");
    }, true)
};