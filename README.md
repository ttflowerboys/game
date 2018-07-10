# game

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## API接口

### 一、登录

* 请求参数：

  ```json
  {
      username: '张三',
      password: ****
  }
  ```

### 二、注册
* 请求参数：

  ```json
  {
      username: '张三',
      password: ***
  }
  ```

  

### 三、首页

#### 3.1 游戏列表

* 返回参数：

  ```json
  {
      pic: 'http://i5.265g.com/images/201806/201806210105568856.jpg',  // 缩略图
      name: '不灭轮回',                                                 // 标题
      url: 'http://wan.265g.com/server/list_173.html',                 // 开始游戏
      officialurl: 'http://wan.265g.com/bmlh/'，                       // 官网
      active: 'http://wan.265g.com/bmlh/hdzx/18641.html',              // 活动
      newplay: 'http://wan.265g.com/index.php?tp=libao&gid=173',       // 新手礼包
  	hotpaly: 'http://pay.265g.com/?tp=go&areaid=0',                  // 最新开服
      icon: '/cache/index/logo/bjsg.jpg'                               // 图标
  }
  ```

  ![1529544214103](./docs/1529544214103.png)



#### 3.2 热门礼包

* 返回参数：

  ```json
  {
      name: '大明征途 新手礼包',                                         // 标题
      num: 1919,                                                        // 剩余数量
      icon: 'http://i7.265g.com/images/201804/201804100214169101.jpg',  // 图标
      url: 'http://wan.265g.com/index.php?tp=libao&gid=172'             // 链接
  }
  ```

  ![1529544636340](./docs/1529544636340.png)



  #### 3.3 活动公告

* 返回参数：

  ```json
  {
      name: '265G《不灭轮回》6月21号首服火爆开启',            // 标题
      url: 'http://wan.265g.com/bmlh/yxgg/18643.html'      // 链接
  }
  ```

  

#### 3.4 游戏开服

* 返回参数：

  ```json
  {
      name: '霸王之心', // 名称
      area: 's32服',   // 区服
      time: '时间戳'   // 时间
  }
  ```

  

### 四、个人中心

#### 4.1 我的帐号

![1529545807037](.\docs\1529545807037.png)



#### 4.2 我的游戏





#### 4.3 个人资料

![1529545864085](.\docs\1529545864085.png)



#### 4.4 修改头像



#### 4.5 帐号安全

![1529545937856](.\docs\1529545937856.png)



#### 4.6 站内消息



### 五、充值中心

#### 5.1 充值中心

![1529546037693](.\docs\1529546037693.png)





## 参考

* [首页](http://wan.265g.com)
* [个人中心](http://wan.265g.com/ucenter/account/)
* [404](http://wan.265g.com/ucenter)