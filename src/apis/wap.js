import fetch from 'src/util/fetch';

export const ajaxLogin = (data) => fetch({ url: '/api/h5/h5Login', method: 'post', data })

export const ajaxJoin = (data) => fetch({ url: '/api/h5/h5Register', method: 'post', data })

export const ajaxPay = (data) => fetch({ url: '/pay/h5/alipay/order', method: 'post', data })

export const ajaxToPay = (data) => fetch({ url: '/pay/h5/alipay/topay', method: 'post', data })