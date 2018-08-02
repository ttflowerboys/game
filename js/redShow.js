$(() => {
        apiShowList(true);
        addMore();
    }
);
var sendData = {
    pageIndex: 1,
    pageSize: 10,
}
apiShowList = (first = false) => {
    $.myAjax('/apiShowInfo/list/json', sendData, (res) => {
        console.log(res.data);
        if (first) $(".redAreaList").html(template("redAreaList", {data: res.data}));
        else $(".redAreaList").append(template("redAreaList", {data: res.data}));
    }, true, 'POST')
};
addMore = () => {
    $('.addMore').click(function () {
        sendData.pageIndex++;
        apiShowList();
    })
};