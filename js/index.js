$(() => {
        apiBanner();
        apiSmartStart();
        startClick()
        apiConfig();
        _getHot();
    }
);
//banner13397120778//123456
apiBanner = () => {
    $.myAjax('/apiBanner/list/json', {}, (res) => {
        $(".banner").html(template("banner", {"data": res.data}));
        $.layCarousel('#bannerIndex');
    }, true, 'post')
}
//小红星
apiSmartStart = () => {
    $.myAjax('/apiActivityConfig/getRecentSmartInfoList', {}, (res) => {
        $(".smallStarL").html(template("smallStarL", {"data": res.data}));
    }, true, 'get')
}
//弹层
getActivityDetailsInfo = (id) => {
    $.myAjax('/apiSmartStart/getActivityDetailsInfo', {id: id}, (res) => {
        let data = template('startInfo', {data: res.data})
        $('.shadow').html(data).fadeIn();
    }, true, 'post')
};
//点击
startClick = () => {
    $('.smallStarL').delegate('li', 'click', function () {
        getActivityDetailsInfo($(this).data('id'))
    })
};
//配置
apiConfig = () => {
    $.myAjax('/apiActivityConfig/getActivities', {}, (res) => {
        console.log(res.data);
        res.data && $(".activityList").html(template("activityList", {"data": res.data}));
    }, true, 'post')
};
//配置详情
getActivityInfo = () => {
    $.myAjax('/apiActivityConfig/getActivityInfo', {}, (res) => {
        console.log(res.data);
    }, true, 'post')
}
getVideo = (val) => {
    let data = template('startInfo', {data: val})
    $('.shadow').html(data).fadeIn()
}
getPic = (val) => {
    let data = template('startInfo', {data:val})
    $('.shadow').html(data).fadeIn()
}