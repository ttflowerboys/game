import fetch from 'src/util/fetch';

export const AjaxRecommendGames = () => fetch({ url: '/xsGame/recommendGames', method: 'post' })   // 应用列表

export const AjaxHotGames = () => fetch({ url: '/xsGame/hotGames', method: 'post' })   // 应用列表
