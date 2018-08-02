$(() => {
    closeModel();
    getActivitySubs();
    addClick();
    showStarInfo();
    addMore();
})
var sendData = {
    sid: '',
    pageIndex: 1,
}
getActivitySubs = () => {
    $.myAjax('/apiSmartStart/getActivitySubs', {}, (res) => {
        $('.introduceList').html(template('introduceList', {data: res.data}));
        sendData.sid = $('.introduceList li:eq(0)').data('id');
        getActivityDetails()
    }, true, 'post')
}
getActivityDetails = () => {
    $.myAjax('/apiSmartStart/getActivityDetails', sendData, (res) => {
        $('.smallStarL').html(template('smallStarL', {data: res.data}))
    }, true, 'post')
}
getActivityDetailsInfo = (val) => {
    $.myAjax('/apiSmartStart/getActivityDetailsInfo', {id: val}, (res) => {
        $('.alertDetail').html(template('alertDetail', {data: res.data}));
        $('.shadow').fadeIn();
    }, true, 'post')
}
closeModel = () => {
    $(".alertShut").click(function () {
        $(this).parents('.shadow').fadeOut();
    })
}
addClick = () => {
    $('.introduceList').delegate('li', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        sendData.sid = $(this).data('id');
        getActivityDetails()
    })
}
showStarInfo = () => {
    $('.smallStarL').delegate('li', 'click', function () {
        getActivityDetailsInfo($(this).data('id'))
    })
}
addMore = () => {
    $('.addMore').click(function () {
        sendData.pageIndex++;
        getActivityDetails();
    })
}