<template>
<div class="Pay wrapped">
    <div class="center-main" style="width: 100%;">
      <div class="g-center-nav">
          <ul>
            <li><a href="javascript:;" class="hover">游戏充值</a></li>
          </ul>
      </div>
      <div class="center-grid">

        <div class="center-nav">
            <ul>
                <li v-for="item in config.type"
                    @click="selectPayType(item.value)"
                    :class="{ 'select': (item.value == pay.type)}">{{item.label}}</li>
            </ul>
        </div>

            <div class="recharge-form">
                    <div class="recharge-grid recharge-account">
                        <label>充值账号：</label>
                        <div class="user_input">
                            <div v-if="userData.username">{{userData.username}}</div>
                            <Input v-if="!userData.username" size="large" v-model="pay.account" placeholder="充值账号" style="width: 140px"></Input>
                        </div>
                    </div>
                    <div class="recharge-grid" style="margin-top: 40px;">
                        <label>选择游戏：</label>
                        <Select v-model="pay.gid" size="large" style="width:200px" placeholder="请选择充值的游戏" @on-change="selectGame">
                            <Option v-for="item in config.gameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <Select v-model="pay.sid" size="large" style="width:200px" placeholder="请选择游戏服务器" @on-change="roleValidate">
                            <Option v-for="item in config.serverList" :value="item.area_server_code" :key="item.area_server_code">{{ item.area_server_name }}</Option>
                        </Select>
                    </div>
                    <div class="recharge-grid recharge-money">
                        <label>选择金额：</label>
                        <div class="select-money">
                            <ul>
                                <li v-for="item in config.price"
                                    @click="selectPrice(item.value)"
                                    :class="{'selected': item.value == pay.price}"
                                    >{{item.label}}<i></i></li>
                                <li @click="selectPrice(0)"
                                    :class="{'selected': 0 == pay.price}"
                                    ><input v-model.number="enterPrice"
                                        @keyup="checkEnterPrice"
                                        placeholder="其它" maxlength="7"><i></i></li>
                            </ul>
                        </div>
                    </div>
                    <div class="recharge-grid recharge-bank" v-show="pay.type == 2">
                        <label>选择银行：</label>
                        <div class="bank-list">
                            <ul>
                                <li v-for="items in config.bank"><img width="148" height="34" :alt="items.label" :src="items.logo"><i></i></li>
                            </ul>
                        </div>
                    </div>
                    <div class="recharge-grid recharge-confirm">
                        <Button type="primary"
                            @click.prevent="doPay('formInline')"
                             :disabled="!roleState ? true : false"
                            >立即充值</Button>
                    </div>
                
            </em></em></form></div><em class="gb-balance"><em class="gb-balance">
        </em></em></div><em class="gb-balance"><em class="gb-balance">
    </em></em></div>

    <Modal
        v-model="roleModel"
        class-name="vertical-center-modal"
        width="360">
        <p slot="header" style="color:#f60;">
            <Icon type="information-circled"></Icon>
            <span>提示</span>
        </p>
        <div style="font-size: 14px;">{{roleTips}}</div>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
    import { AjaxPay, AjaxPayGameList, AjaxPayServerList, AjaxRoleValidate } from 'src/apis/user'
    import * as tools from 'src/util/tools'
    import { mapGetters } from 'vuex'

    export default {
        name: 'pay',
        data() {
            return {
                roleState: false,
                roleModel: false,
                roleTips: '',
                pay:{
                    type: 1,
                    account: '',
                    price: 5,
                    gid: '',
                    sid: ''
                },
                config:{
                    type: [
                        { label: '支付宝', value: '1' },
                        { label: '网上银行(快钱)', value: '2' },
                        { label: '微信支付', value: '10' }
                    ],
                    price: [
                        { label: '5元', value: 5 },
                        { label: '10元', value: 10 },
                        { label: '20元', value: 20 },
                        { label: '30元', value: 30 },
                        { label: '50元', value: 50 },
                        { label: '100元', value: 100 },
                        { label: '300元', value: 300 },
                        { label: '500元', value: 500 },
                        { label: '1000元', value: 1000 },
                        { label: '3000元', value: 3000 },
                        { label: '5000元', value: 5000 }
                    ],
                    bank: [
                        { label: '中国工商银行', value: 'ICBC-NET', logo: '/static/images/bank/01.gif' },
                        { label: '中国建设银行', value: 'CCB-NET', logo: '/static/images/bank/02.gif' },
                        { label: '中国农业银行', value: 'ABC-NET', logo: '/static/images/bank/03.gif' },
                        { label: '中国邮政', value: 'POST-NET', logo: '/static/images/bank/04.gif' },
                        { label: '交通银行', value: 'BOCO-NET', logo: '/static/images/bank/05.gif' },
                        { label: '招商银行', value: 'CMBCHINA-NET', logo: '/static/images/bank/06.gif' },
                        { label: '中国银行', value: 'BOC-NET', logo: '/static/images/bank/07.gif' },
                        { label: '平安银行', value: 'SDB-NET', logo: '/static/images/bank/10.gif' },
                        { label: '浦发银行', value: 'SPDB-NET', logo: '/static/images/bank/11.gif' },
                        { label: '中国民生银行', value: 'CMBC-NET', logo: '/static/images/bank/12.gif' },
                        { label: '兴业银行', value: 'CIB-NET', logo: '/static/images/bank/13.gif' },
                        { label: '北京银行', value: 'BCCB-NET', logo: '/static/images/bank/15.gif' }
                    ],
                    gameList:[],
                    serverList:[]
                },
                enterPrice: ''
            }
        },
        methods: {
            selectPayType(value){
                if(value !== '1'){
                    this.$Message.error('暂不支持此支付方式！');
                    this.pay.type = 1
                    return false;
                }else{
                    this.pay.type = value;
                }
            },
            selectPrice(value){
                this.pay.price = value;
            },
            checkPay(){
                const self = this;
                let result = false;
                // if(!self.pay.account){
                //     self.$Message.error('请填写充值帐号');
                //     result = false;
                //     return false;
                // } 
                if(!self.pay.gid){
                    self.$Message.error('请选择充值的游戏')
                    result = false;
                    return false;
                }else if(!self.pay.sid){
                    self.$Message.error('请选择游戏服务器')
                    result = false;
                    return false;
                }else if(!self.pay.price && !this.enterPrice){
                    self.$Message.error('请选择填写充值金额')
                    result = false;
                    return false;
                }else{
                    result = true;
                }
                return result;
            },
            doPay(){
                const self = this;
                if(this.checkPay()){
                    let data = {
                        uid: this.userData.username? this.userData.username : this.pay.account,
                        money: this.pay.price ? this.pay.price : this.enterPrice,
                        gid: this.pay.gid,
                        sid: this.pay.sid,
                        pid: this.pay.type
                    }
                    AjaxPay(data).then(res => {
                        if(res.status === 'success'){
                            // window.location = '/pay'
                            window.open(res.data);
                        }else{
                            self.$Message.error(res.message)
                        }
                    })
                }
            },
            getGame(){
                const self = this;
                let gid = null;
                AjaxPayGameList().then(res => {
                    if(res.status === 'success'){
                        self.config.gameList = res.data;
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            },
            selectGame(){
                const self = this;
                this.pay.sid = '';
                if(self.pay.gid){
                    let data = {
                        gid: self.pay.gid
                    }
                    AjaxPayServerList(data).then(res => {
                        if(res.status === 'success'){
                            self.config.serverList = res.data;
                        }else{
                            self.$Message.error(res.message)
                        }
                    })
                }
            },
            roleValidate(){
                const self = this;
                let data = {
                    uid: this.userData.username? this.userData.username : this.pay.account,
                    gid: this.pay.gid,
                    sid: this.pay.sid,
                }
                AjaxRoleValidate(data).then(res => {
                    if(res.status === 'success'){
                        self.roleState = true;
                    }else{
                        self.roleState = false;
                        self.roleModel = true;
                        self.roleTips = res.message ? res.message : '当前帐户不存在';
                    }
                })
            },
            checkEnterPrice(){
                let value = this.enterPrice;
                if (parseFloat(value).toString() == "NaN") {
                    this.enterPrice = ''
            　　　　return false; 
            　　} else { 
            　　　　return true; 
            　　}               
            }
        },
        computed: {
            selectGameId(){
                const self = this;
                return tools.getGameId(self.config.gameList, self.pay.gid);
            },
            ...mapGetters([ 'userData' ])
        },
        created(){
            this.getGame()
            document.body.setAttribute("class", "");
        }
    }
</script>

<style lang="less">
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
    }
}
@import "~assets/styles/pay.less";
</style>

