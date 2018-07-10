<template>
    <div>
        <h4>防沉迷认证</h4>
        <div class="fcm">
            <div class="fcm-status">
                <!-- 没有认证防沉迷 -->
                <!--<p>真实姓名：<strong>您未认证</strong></p>
                <p>身份证号：<strong>请尽快进行</strong><a href="">防沉迷认证</a></p>-->
                <!-- 认证过防沉迷 -->
                <p>真实姓名：<strong>您未认证</strong></p>
                <p>身份证号：<strong>请尽快进行</strong><a href="/ucenter/safety/" target="_blank">防沉迷认证</a></p>
            </div>
            <div class="fcm-info">
                <p>根据政府相关规定，未满18周岁的玩家将被纳入防沉迷范围；届时被纳入防沉迷的玩家，游戏收益将会受损；未填写身份证玩家在游戏内3小时后会被踢下线或收益减半5小时后被踢下线，请各位玩家尽快填写真实姓名、身份证信息，以便顺畅游戏。此账号的身份证信息只能填写一次，是判断账号归属的重要依据。</p>
            </div>
        </div>

        <h4>账号安全</h4>
        <div class="security">
            <div class="security-index">
                <!-- 安全指数低 -->
                <span class="red"></span><span></span><span></span>安全指数：<strong class="low">低</strong>
                <!-- 上次登录时间 -->
                <p class="last-login">上次登录时间：2018-07-08 11:45:52</p>
            </div>
            <div class="security-list">
                <ul>
                    <!-- 未设置 -->
                    <li>
                        <span class="security-password"></span>
                        <h5>安全密码</h5>
                        <p>密码过于简单</p>
                    </li>
                    <li>
                        <span class="security-mailbox"></span>
                        <h5>密保邮箱</h5>
                        <p>未绑定</p>
                    </li>
                    <li>
                        <span class="security-phone"></span>
                        <h5>密保手机</h5>
                        <p>未绑定</p>
                    </li>
                    <li>
                        <span class="anti-addiction"></span>
                        <h5>防沉迷</h5>
                        <p>未认证</p>
                    </li>
                                            </ul>
            </div>
            <a href="/ucenter/safety/" target="_blank" class="security-setting">设置账号安全</a>
        </div>
    </div>
</template>
