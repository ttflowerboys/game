$(() => {
        apiStadiumList(true);
        addMore();
    }
);
var sendData = {
    pageIndex: 1,
    pageSize: 10,
}
apiStadiumList = () => {
    $.myAjax('/apiStadium/list/json', sendData, (res) => {
        console.log(res.data);
        $(".redAreaList").append(template("redAreaList", {data: res.data}));
    }, true, 'get')
};
addMore = () => {
    $('.addMore').click(function () {
        sendData.pageIndex++;
        apiStadiumList();
    })
};
