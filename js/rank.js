$(() => {
    stadiumRank();
    schoolRank();
    areaRank();

})
stadiumRank = () => {
    $.myAjax('/apiRankList/stadiumRank', {}, (res) => {
        $(".cgArea").html(template('cgArea', {data: res.data}))
    }, true, 'post')
};
schoolRank = () => {
    $.myAjax('/apiRankList/schoolRank', {}, (res) => {
        $(".schoolArea").html(template('schoolArea', {data: res.data}))
    }, true, 'post')
};
areaRank = () => {
    $.myAjax('/apiRankList/areaRank', {}, (res) => {
        $(".qyArea").html(template('qyArea', {data: res.data}))

    }, true, 'post')
};
