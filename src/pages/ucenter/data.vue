<template>
    <div>
        <div class="personal-data">
            	<h4>个人资料</h4>
                <div>
                	<!-- 所有input的长度通过size来控制 -->
                    
                    <form class="dataform" onsubmit="return false">
                    	<table>
                        	<tbody><tr>
                            	<td class="label">账号：</td>                   
                                <td class="full">asdfghjk222</td>
                            </tr>
                            <tr data="show">
                            	<td class="label">昵称：</td>
                    			<td class="full">未填</td>
                            </tr>
                            <tr data="show">
                            	<td class="label">电话：</td>
                                <td class="full">未填</td>
                            </tr>
                            <tr data="show">
                            	<td class="label">姓名：</td>
                                <td class="full">未填</td>
                            </tr>
                            <tr>
                            	<td class="label">身份证：</td>
                                <td class="full">未填</td>
                            </tr>
                        </tbody></table>                                         
                        <button data="edit">编辑资料</button>
                    </form>
                </div>
           	</div>
    </div>    
</template>

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

