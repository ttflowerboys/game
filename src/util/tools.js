export const getGameId = (resourceArr, Code) => {
    let result = null;
    if(resourceArr && resourceArr instanceof Array){
        for (let i = 0; i < resourceArr.length; i++) {
            if(resourceArr[i].game_code === Code){
                result = resourceArr[i].id;
            }
        }
    }
    return result;
}