$(() => {
        apiHeritageDetailInfo();
    }
);
var sendData = {
    id: location.search.split('=')[1]
}
//详情
apiHeritageDetailInfo = () => {
    $.myAjax('/apiHeritage/detailInfo', sendData, (res) => {
        console.log(res.data);
        $(".contL").html(template('contL', {data: res.data}));
        $(".contL .context").html(res.data.rd_detail_desc);
    }, true, 'post')
};
