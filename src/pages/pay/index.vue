<template>
<div class="Pay wrapped">
    <div class="center-main">
      <div class="g-center-nav">
          <ul>
            <li><a href="javascript:;" class="hover">游戏充值</a></li>
          </ul>
      </div>
      <div class="center-grid">

        <div class="center-nav">
            <ul>
                <li type_id="1" class=""><a href="javascript:;" class="hover" id="">支付宝</a></li>
                <li type_id="7" class=""><a href="javascript:;" id="">网上银行(快钱)</a></li>
                <li type_id="10" class=""><a href="javascript:;" id="">微信支付</a></li>
                <li type_id="11" class="showOnGame"><a href="javascript:;" id="payCoin">G币支付</a></li>
            </ul>
        </div>


            <div class="recharge-form">
                <form>
                    <div class="recharge-grid recharge-account">
                        <label>充值账号：</label>
                                                	<div class="user_account" style="display: none;">
                                <span></span>
                                <a href="javascript:void(0)" id="changeUser">[更改]</a><em class="gb-balance">
                            </em></div><em class="gb-balance">
                        	<div class="user_input">
                                <input type="text">
                                <a href="javascript:void(0)" id="define_user">[确定]</a><em class="gb-balance">
                            </em></div><em class="gb-balance">
                                            </em></em></div><em class="gb-balance"><em class="gb-balance">

                    <div class="recharge-grid recharge-surplus">
                        <label>账户余额：</label>
                        <div>
                            <i class="gb-nub">0</i>G币
                            <i id="balance" style="display:none">0</i>
                            <a class="coin-info">详情</a>
                            <dl class="scoreboard-tip">
                                <dt><em>类型</em><em>数量</em></dt>
                                <dd><em>通用币</em><em>0</em></dd>
                                                            </dl>
                        </div>
                    </div>

                    <div class="recharge-grid recharge-text">
                    <dl class="text">
                      <dt>G币说明:</dt>
                        <dd>1. 1RMB=1G币;</dd>
                        <dd>2. G币可以用来充值wan.265g.com所有游戏;</dd>
                        <dd>3. G币仅能用于充值wan.265g.com直接运营的产品和服务，不能兑换现金，不能进行转账交易，不能兑换wan.265g.com以外的产品和服务。</dd>
                      </dl>
                    </div>
                    <div class="recharge-grid recharge-select">
                        <label>选择游戏：</label>
                        <div class="select-game"><i>1</i>选择充值的游戏</div>
                        <div class="select-server"><i>2</i>选择游戏服务器</div>
                        <div class="game-list" id="game_list" style="display:none">
                            <em class="close"></em>
                            <div class="glt">
                                <ul>
                                    <li class="hover">最近玩过</li>
                                    <li data="ABCD">ABCD</li>
                                    <li data="EFGH">EFGH</li>
                                    <li data="IJKL">IJKL</li>
                                    <li data="MNOP">MNOP</li>
                                    <li data="QRST">QRST</li>
                                    <li data="UVW">UVW</li>
                                    <li data="XYZ">XYZ</li>
                                </ul>
                            </div>
                            <div class="glb">
                                <div class="alert-list latest"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                            </div>
                        </div>
                        <div class="game-list" id="server_list" style="display:none">
                            <em class="close"></em>
                            <div class="glt">
                                <ul>
                                    <li class="hover">最近玩过</li>
                                    <li data="1-99">1-99</li>
                                    <li data="100-299">100-299</li>
                                    <!--<li data="500-300">500-300</li>-->
                                </ul>
                            </div>
                            <div class="go-server">
                                <label>选服：</label>
                                <input type="text" id="select_server">
                                <button type="button">确定</button>
                            </div>
                            <div class="glb">
                                <div class="alert-list latest"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                                <div class="alert-list" style="display:none"></div>
                            </div>
                        </div>
                    </div>
                    <div class="recharge-grid recharge-money">
                        <label>选择金额：</label>
                        <div class="select-money">
                            <ul>
                                <li class="m1 selected" onclick="getmoney('5')">5元<i></i></li>
                                <li class="m2" onclick="getmoney('10')">10元<i></i></li>
                                <li class="m3" onclick="getmoney('20')">20元<i></i></li>
                                <li class="m4" onclick="getmoney('30')">30元<i></i></li>
                                <li class="m5" onclick="getmoney('50')">50元<i></i></li>
                                <li class="m6" onclick="getmoney('100')">100元<i></i></li>
                                <li class="m7" onclick="getmoney('300')">300元<i></i></li>
                                <li class="m8" onclick="getmoney('500')">500元<i></i></li>
                                <li class="m9" onclick="getmoney('1000')">1000元<i></i></li>
                                <li class="m10" onclick="getmoney('3000')">3000元<i></i></li>
                                <li class="m11" onclick="getmoney('5000')">5000元<i></i></li>
                                <li class="m12" onclick="getmoney('0')"><input type="text" value="其他金额" maxlength="7"><i></i></li>
                            </ul>
                        </div>
                        <p>您将获得 50 元宝 (传奇类游戏兑换比例 1:100,其他游戏兑换比例 1:10)</p>
                    </div>
                    <div class="recharge-grid recharge-bank" style="display: none">
                        <label>选择银行：</label>
                        <div class="bank-list">
                            <ul>
                                <li class="selected"><a title="中国工商银行" href="javascript:void(0);" onclick="getbank('ICBC-NET')"><img width="148" height="34" alt="" src="/static/index/images/01.gif"><i></i></a></li>
                                <li><a title="中国建设银行" href="javascript:void(0);" onclick="getbank('CCB-NET')"><img width="148" height="34" alt="" src="/static/index/images/02.gif"><i></i></a></li>
                                <li><a title="中国农业银行" href="javascript:void(0);" onclick="getbank('ABC-NET')"><img width="148" height="34" alt="" src="/static/index/images/03.gif"><i></i></a></li>
                                <li><a title="中国邮政" href="javascript:void(0);" onclick="getbank('POST-NET')"><img width="148" height="34" alt="" src="/static/index/images/04.gif"><i></i></a></li>
                                <li><a title="交通银行" href="javascript:void(0);" onclick="getbank('BOCO-NET')"><img width="148" height="34" alt="" src="/static/index/images/05.gif"><i></i></a></li>
                                <li><a title="招商银行" href="javascript:void(0);" onclick="getbank('CMBCHINA-NET')"><img width="148" height="34" alt="" src="/static/index/images/06.gif"><i></i></a></li>
                                <li><a title="中国银行" href="javascript:void(0);" onclick="getbank('BOC-NET')"><img width="148" height="34" alt="" src="/static/index/images/07.gif"><i></i></a></li>
                                <li><a title="平安银行" href="javascript:void(0);" onclick="getbank('SDB-NET')"><img width="148" height="34" alt="" src="/static/index/images/10.gif"><i></i></a></li>
                                <li><a title="浦发银行" href="javascript:void(0);" onclick="getbank('SPDB-NET')"><img width="148" height="34" alt="" src="/static/index/images/11.gif"><i></i></a></li>
                                <li><a title="中国民生银行" href="javascript:void(0);" onclick="getbank('CMBC-NET')"><img width="148" height="34" alt="" src="/static/index/images/12.gif"><i></i></a></li>
                                <li><a title="兴业银行" href="javascript:void(0);" onclick="getbank('CIB-NET')"><img width="148" height="34" alt="" src="/static/index/images/13.gif"><i></i></a></li>                            		<li><a title="北京银行" href="javascript:void(0);" onclick="getbank('BCCB-NET')"><img width="148" height="34" alt="" src="/static/index/images/15.gif"><i></i></a></li>                            	</ul>
                        </div>
                    </div>
                    <div class="recharge-grid recharge-confirm">
                        <button type="button" onclick="gofix()">立即充值</button>
                    </div>
                
            </em></em></form></div><em class="gb-balance"><em class="gb-balance">
        </em></em></div><em class="gb-balance"><em class="gb-balance">
    </em></em></div>
</div>
</template>

<style lang="less">
@import "~assets/styles/pay.less";
</style>

