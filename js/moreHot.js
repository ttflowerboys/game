$(() => {
        apiRecommend();
        addMore();
    }
);
var sendData = {
    pageIndex: 1,
    rid: null,
}
apiRecommend = () => {
    $.myAjax('/apiRecommend/getRecommends', {}, (res) => {
        $(".introduceList").html(template("introduceList", {data: res.data}));
        firstDone();
        addActive();
    }, true, 'post')
}

apiRecommendSub = (isChange = false) => {
    $.myAjax('/apiRecommend/getRecommendSubjects', sendData, (res) => {
        if (isChange) $(".smallStarL").html(template("smallStarL", {data: res.data}));
        else $(".smallStarL").append(template("smallStarL", {data: res.data}));
    }, true, 'post')
}
//第一次
firstDone = () => {
    $('.actFather li:eq(0)').addClass('active');
    sendData = {
        pageIndex: 1,
        rid: $('.actFather li:eq(0)').data("id"),
    }
    apiRecommendSub(true);
}
//点击
addActive = () => {
    $('.actFather li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        sendData = {
            pageIndex: 1,
            rid: $(this).data("id"),
        }
        apiRecommendSub(true);
    })
}
//加载更多
addMore = () => {
    $('.addMore').click(function () {
        sendData.pageIndex++;
        apiRecommendSub();
    })
}