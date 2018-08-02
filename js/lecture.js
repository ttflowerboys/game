$(() => {
    closeModel();
    apiLecture();
    addClick();
    addMore();
})
closeModel = () => {
    $('.alertShut').click(function () {
        $('.shadow').fadeOut()
    })
}
var sidData = {
    pageIndex: 1,
    sid: null
}
//获取活动
apiLecture = () => {
    $.myAjax('/apiLecture/getLectureActivityId', {}, (res) => {
        res.data && getActivitySubs(res.data);
    }, true, 'post')
};
//sub
getActivitySubs = (activityId) => {
    $.myAjax('/apiActivity/getActivitySubs', {activityId: activityId}, (res) => {
        res.data && $(".introduceList").html(template('introduceList', {data: res.data.rdActivitySubs}));
        sidData.sid = $('.introduceList li:eq(0)').data('id');
        getActivityDetails(true)
    }, true, 'post')
};
//sub-list
getActivityDetails = (first = false) => {
    $.myAjax('/apiActivity/getActivityDetails', sidData, (res) => {
        if (first) $('.redAreaList').html(template('redAreaList', {data: res.data}))
        else $('.redAreaList').append(template('redAreaList', {data: res.data}))
    }, true, 'post')
};
//list-info
getActivityDetailsInfo = (id) => {
    $.myAjax('/apiActivity/getActivityDetailsInfo', {activityDetailId: id}, (res) => {
        console.log(res);
    }, true, 'post')
};
addClick = () => {
    $('.introduceList').delegate('li', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        sidData.sid = $(this).data('id');
        getActivityDetails(true)
    })
}
addMore = () => {
    $('.addMore').click(function () {
        sidData.pageIndex++;
        getActivityDetails()
    })
}