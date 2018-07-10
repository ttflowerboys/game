<template>
    <div>
        <div class="personal-data">
            	<h4 style="height: 68px;">个人资料</h4>
                <div>
                	<!-- 所有input的长度通过size来控制 -->
                    
                    <form class="dataform" onsubmit="return false">
                    	<table>
                        	<tbody><tr>
                            	<td class="label">账号：</td>                   
                                <td class="full">{{userinfo.member_uid ? userinfo.member_uid : '未填写'}}</td>
                            </tr>
                            <tr data="show">
                            	<td class="label">昵称：</td>
                    			<td class="full">
                                    <span  v-if="!isEdit">{{userinfo.nick_name ? userinfo.nick_name : '未填写'}}</span>
                                    <Input v-if="isEdit" v-model="editinfo.nick_name"></Input>
                                </td>
                            </tr>
                            <tr data="show">
                            	<td class="label">电话：</td>
                                <td class="full">
                                    <span  v-if="!isEdit">{{userinfo.phone ? userinfo.phone : '未填写'}}</span>
                                    <Input v-if="isEdit" v-model="editinfo.phone"></Input>
                                </td>
                            </tr>
                            <tr data="show">
                            	<td class="label">姓名：</td>
                                <td class="full">
                                    <span  v-if="!isEdit">{{userinfo.real_name ? userinfo.real_name : '未填写'}}</span>
                                    <Input v-if="isEdit" v-model="editinfo.real_name"></Input>
                                </td>
                            </tr>
                            <tr>
                            	<td class="label">身份证：</td>
                                <td class="full">
                                    <span  v-if="!isEdit">{{userinfo.idcard ? userinfo.idcard : '未填写'}}</span>
                                    <Input v-if="isEdit" v-model="editinfo.idcard"></Input>
                                </td>
                            </tr>
                        </tbody></table>                                         
                        <button @click="edit" v-if="!isEdit">编辑资料</button>
                        <button @click="updata" v-if="isEdit">保存资料</button>
                    </form>
                </div>
           	</div>
    </div>    
</template>
<script>
    import { AjaxGetUserinfo, AjaxEidtUserinfo } from 'src/apis/user'
    export default {
        data () {
            return {
                userinfo: {
                    member_uid: '',
                    idcard: '',
                    real_name: '',
                    nick_name: '',
                    phone: '',
                    uid: ''
                },
                editinfo: {
                    member_uid: '',
                    idcard: '',
                    real_name: '',
                    nick_name: '',
                    phone: '',
                    uid: ''
                },
                isEdit: false
            }
        },
        methods: {
            getUserInfo(){
                const self = this;
                AjaxGetUserinfo().then(res => {
                    if(res.status === 'success'){
                        self.userinfo = res.data;
                        self.editinfo = res.data;
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            },
            edit(){
                this.isEdit = true;
            },
            updata(){
                const self = this;
                let data = {
                    idcard: self.editinfo.idcard,
                    real_name: self.editinfo.real_name,
                    nick_name: self.editinfo.nick_name,
                    phone: self.editinfo.phone
                }
                AjaxEidtUserinfo(data).then(res => {
                    if(res.status === 'success'){
                        self.isEdit = false;
                        self.$$Message.success(res.message);
                    }else{
                        self.$Message.error(res.message)
                    }
                })
            }
        },
        created(){
            this.getUserInfo()
            document.body.setAttribute("class", "grayBg");
        }
    }
</script>
<style lang="less">
.dataform td.label{width:95px;padding-right:10px;text-align:right;color:#333}
.dataform td.label strong{color:#fe0000;margin-left:3px}
.dataform td label{color:#666;margin-right:10px}
.dataform td.full{color:#666}
.dataform td.textarea{height:200px}
.dataform button{width:90px;height:34px;display:block;text-align:center;background:#1891d7;border-radius:5px;color:#fff;cursor:pointer;margin:16px 0 0 110px}
.dataform button:hover{background:#1dacff}
.dataform td.upload-screen{height:77px;overflow:hidden}
.dataform td .upload-file input{width:63px;height:63px;opacity:0;filter:alpha(opacity=0);cursor:pointer}

.personal-data{
    h4{
        height: 16px;
        font-weight: bold;
        line-height: 1;
        font-size: 18px;
        color: rgb(0, 0, 0);
        padding: 31px 0px 20px;
        border-bottom: 1px dashed rgb(230, 230, 230);
    }
    tr{
        height: 50px;
        line-height: 34px;
        padding-top: 16px;
        position: relative;
    }
    .label{
        width: 95px;
        
    padding-right: 10px;
    text-align: right;
    color: rgb(51, 51, 51);
    }
}
</style>

