import fetch from 'src/util/fetch';

export const AjaxRecommendGames = () => fetch({ url: '/xsGame/recommendGames', method: 'get' })   // 应用列表

export const AjaxHotGames = () => fetch({ url: '/xsGame/hotGames', method: 'get' })   // 应用列表

export const AjaxBanner = () => fetch({ url: '/gameDetail/gameBanners', method: 'get' })   // 应用列表