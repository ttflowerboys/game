import fetch from 'src/util/fetch';

export const ajaxLogin = (data) => fetch({ url: '/api/h5/h5Login', method: 'post', data })

export const ajaxJoin = (data) => fetch({ url: '/api/h5/h5Register', method: 'post', data })
