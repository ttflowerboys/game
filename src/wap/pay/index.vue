<template>
	<div class="wap_layout">
		<x-header class="wap_header" :left-options="{backText: ''}">充值中心</x-header>
		<div class="wap_pay">
			<div class="money">充值金额 <b class="t-red">{{parmas.money}}</b> 元</div>
			<div class="wap_group">
				<group title="请选择支付方式">
			      <radio v-model="pay.type" :options="config.type" disabled>
			      	<template slot-scope="props" slot="each-item">
			          <p>
			            <img :src="props.icon" alt="" class="vux-radio-icon"> {{ props.label }} <span class="tips">{{props.label !== '支付宝' ? '暂不支持此支付方式': ''}}</span>
			          </p>
	        		</template>
			      </radio>
			    </group>
			    <div style="width: 95%;margin: 0 auto;">
			    	<Button class="wap-button-custom-red" :loading="pay.loading" @click.prevent="handlePay()">立即支付</Button>
			    </div>
		    </div>
		</div>
		<div ref="Pay" style="display: none;"></div>
	</div>
</template>

<script>
	import { XHeader, Radio, Group, querystring } from 'vux'
    import { ajaxPay, ajaxToPay } from 'src/apis/wap'

	export default {
        name: 'wap_pay',
        components: {
		    XHeader,
		    Radio,
		    Group
		},
        data() {
            return {
            	pay: {
            		type: 1,
            		loading: false
            	},
            	config:{
                    type: [
                        { value: '支付宝', key: '1', icon: '/static/images/wap/pay_alipay.gif' },
                        // { value: '网上银行(快钱)', key: '2', icon: '/static/images/wap/pay_99bill.png' },
                        { value: '微信支付', key: '2', icon: '/static/images/wap/pay_wechat.gif' }
                    ]
                }
            }
        },
        methods: {
        	handlePay(){
        		const self = this;
        		let data = this.parmas;
        			data = Object.assign(data, { pid: this.pay.type})
        		self.$vux.loading.show({
					text: '加载中...'
				})
        		ajaxPay(data).then(res => {
        			if(res.status === '10000'){
        				let datas = {
        					oid: res.data,
        					mid: data.mid
        				}
        				ajaxToPay(datas).then(r => {
        					self.$refs.Pay.innerHTML = r
        					setTimeout(function(){
        						document.forms[0].submit()
        						self.$vux.loading.hide()
        					},1000)
        				})
        			}else{
        				self.$vux.loading.hide()
        				self.$Message.error('操作失败！')
        			}
        		})
        	}
        },
        computed:{
        	parmas(){
        		return querystring.parse(location.search)
        	}
        }
    }
</script>

<style lang="less">
	.wap_layout{
		.vux-header{
			background-color: #fff;
			border-bottom: 1px solid #ccc;
			.vux-header-title{
				color: #000;
			}
		}
		.wap_pay{

			.money{
				text-align: center;
				font-size: 16px;
				background-color: #fff;
				margin-bottom: 12px;
				padding: 42px 12px;
				.t-red{
					color: #e95634;
					font-weight: normal;
				}
			}
		}
		.wap_group{
			background-color: #fff;
			.weui-cells__title{
				line-height: 38px;
				color: #e95634;
				font-size: 16px;
				margin-bottom: 0;
			}
			.weui-cell__bd{
				.tips{
					font-size: 14px;
					float: right;
				}
			}
			
		}
	}
	.wap-button-custom-red{
        width: 100%;
        margin-top: 22px;
        background-color: #dc5535;
        border-color: #dc5535;
        text-align: center;
        font-size: 16px;
        line-height: 32px;
        color: #fff;
        &:hover,
        &:active{
            color: #fff;
            background-color: #dc5535;
            border-color: #dc5535;
        }
        &:focus {
            box-shadow: 0 0 0 2px rgba(237,63,20,.2)
        }
    }
</style>