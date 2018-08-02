$(() => {
        apiStadiumInfo();
        apiComment();
        addActive();
        _getHot();
    }
);
var sendData = {
    stadiumId: location.search.split('=')[1]
};
//消息
var comment = {
    rd_stadium_id: location.search.split('=')[1],
    rd_stadium_comment: '',
    rd_attract_place: '',
    rd_stadium_question: '',
    rd_score: '',
    rd_explain_level: '',
    rd_facility_level: '',
    rd_environment_level: '',
    rd_service_level: '',
    rd_theme_level: '',
    rd_pic: '',
}
//预约
var appoint = {
    stadiumId: location.search.split('=')[1],
    appointTime: ""
}
//详情
apiStadiumInfo = () => {
    $.myAjax('/apiStadium/stadiumInfo', sendData, (res) => {
        if (!res.data) return;
        res.data.rdStadium.rd_stadium_carousel = res.data.rdStadium.rd_stadium_carousel.split(',');
        $('.bannerCont').html(template('bannerCont', {data: res.data.rdStadium}));
        $('.introduceList').html(template('introduceList', {data: res.data.subs}));
        $.layCarousel('#mySlide');
        apiStadiumPag($('.introduceList li:eq(0)').data('id'));
    }, true, 'get')
};
//点击
addActive = () => {
    $('.introduceList').delegate('li', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        apiStadiumPag($(this).data('id'));
    })
}
//子类目列表
apiStadiumPag = (sid) => {
    $.myAjax('/api/stadiumDetail/paging', {sid: sid}, (res) => {
        res.data && $('.introduceCont').html(template('introduceCont', {data: res.data}));
    }, true, 'get')
};
//子类目详情
apiStadiumDetail = (id) => {
    $.myAjax('/api/stadiumDetail/detailInfo', {id: id}, (res) => {
        res.data && $('.introduceCont').html(template('introduceCont', {data: res.data}));
    }, true, 'get')
};
//评论
apiComment = () => {
    $.myAjax('/rdstadiumcomment/getStadiumDetail/json', sendData, (res) => {
        res.data && $('.userCommentList').html(template('userCommentList', {data: res.data}));
    }, true, 'get')
}
saveCommon = () => {
    $.myAjax('/rdstadiumcomment/saveorupdate', comment, (res) => {
        res.data && $('.userCommentList').html(template('userCommentList', {data: res.data}));
    }, true, 'get')
}