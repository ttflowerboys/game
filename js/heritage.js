$(() => {
        apiHeritageListSub();
        apiHeritageInfo();
        addMore();
        _getHot();
        addActive();
    }
);
var sendData = {
    pageIndex: 1,
    subid: null
}
apiHeritageListSub = () => {
    $.myAjax('/apiHeritage/listsub', {}, (res) => {
        $(".introduceList").html(template('introduceList', {data: res.data}));
        sendData = {
            pageIndex: 1,
            subid: $('.introduceList li:eq(0)').data('id')
        }
        apiHeritageList(true);
    }, true, 'post')
};
apiHeritageList = (first = false) => {
    $.myAjax('/apiHeritage/list', sendData, (res) => {
        if (first) $(".introduceCont").html(template('introduceCont', {data: res.data}));
        else $(".introduceCont").append(template('introduceCont', {data: res.data}));
    }, true, 'post')
};
//信息
apiHeritageInfo = () => {
    $.myAjax('/apiHeritage/heritageInfo', {}, (res) => {
        $(".banner").html(template('banner', {data: res.data.banners}));
        $.layCarousel('#bannerIndex')
    }, true, 'post')
};
//点击
addActive = () => {
    $('.introduceList').delegate('li', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        sendData = {
            pageIndex: 1,
            subid: $(this).data('id')
        }
        apiHeritageList(true);
    })
}
addMore = () => {
    $('.addMore').click(function () {
        sendData.pageIndex++;
        apiHeritageList();
    })
}