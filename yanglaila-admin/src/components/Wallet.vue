<template>
    <div id="wallet"> 
        <div class="cfff f16 team-title">
            资金账户
        </div>
        <div>
             <table class="layui-hide" id="assetList" lay-filter="assets"></table>
        </div>
        <div class="">
            <div class="cfff f16 team-title mt50">
                转账记录
            </div>
            <div class="tr pr15">
                <div class="inline-block relative search-box">
                    <label  class="ce0e">交易Hash: </label>
                    <input type="text" class="search-input"  v-model="hashID"  placeholder="请输入交易hash值" autocomplete="off" style="width:550px;">
                    <button type="button " class="layui-btn layui-btn-xs search-btn"   @click="searchByHash">
                        <i class="layui-icon layui-icon-search"></i>
                    </button>
                </div>
                <div class="inline-block relative" style="margin-left:15px;">
                    <button class="layui-btn layui-btn-sm mb3" @click="viewAll">重 置</button>
                </div>
            </div>

            <table class="layui-hide" id="transferList" lay-filter="transfers"></table>
        </div>
    </div>
</template>
<script>
    import config from '../assets/config'
    export default {
        data(){
            return {
                assetsParam:{},
                transferParam:{},
                table:null,
                hashID:''
            }
        },
        mounted(){
             // 资金账户表格参数
            let that = this;
            that.assetsParam = {
                elem: '#assetList'
                ,url:config.apiUrl+'/role/admin/tx/address.do'
                // ,height: 'full-300' //高度最大化减去差值
                ,cols: [[
                {align:'center',field:'addr', title:'地址',  fixed: 'left',width:400 }
                ,{align:'center',title:'余额',templet:function(d){
                    return d.balance / Math.pow(10, 18)
                }}
                ,{align:'center',field:'type', title:'类型'}
                ,{align:'center',field:'status', title:'状态' }
                // ,{align:'center',field:'keyFile', title:'密钥文件' }               
                ,{align:'center', title:'密钥文件', templet:function(d){
                    return `<a target="_blank" href=${d.keyFile} download="密钥文件">下载文件</a>`
                }}
                ,{align:'center',fixed: 'right', title:'操作', templet:function(d){               
                    return `<a class="layui-btn layui-btn-xs layui-btn-normal"  target="_blank" href=${config.ETHUrl}/address/${d.addr}>查看</a>`               
                }}
                ]]
                ,page:true
                ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                    return {
                        "code": res.state, //解析接口状态
                        // "msg": res.msg, //解析提示文本
                        "count": res.msg, //解析数据长度,目前接口返回count为0，所以自带分页无法显示
                        "data": res.data //解析数据列表
                    };
                }
            };
        //转账记录表格参数
            that.transferParam={
                elem: '#transferList'
                ,url:config.apiUrl+'/role/admin/tx/query.do'
                ,height: 'full-100' //高度最大化减去差值
                ,cols: [[
                {align:'center',field:'fromRid', title:'发起人',  fixed: 'left',width:80 }
                ,{align:'center',field:'hash', title:'交易hash',width:300}
                ,{align:'center',field:'toMac', title:'发起地址'}
                ,{align:'center',field:'fromMac', title:'收款地址'}
                ,{align:'center',field:'type', title:'交易类型'}
                ,{align:'center',field:'status', title:'交易状态' }
                ,{align:'center',field:'nonce', title:'nonce值'}
                ,{align:'center',title:'创建时间',templet:function(d){
                    return that.timestampToTime(d.createdAt)
                }}
                ,{align:'center', title:'最后修改时间', templet:function(d){
                    return that.timestampToTime(d.updatedAt)
                }}
                ,{align:'center',fixed: 'right', title:'操作', templet:function(d){
                        return `<a class="layui-btn layui-btn-xs layui-btn-normal" target="_blank" href=${config.ETHUrl}/tx/${d.hash}>查看</a>`                  
                }}
                ]]
                ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                    return {
                        "code": res.state, //解析接口状态
                        // "msg": res.msg, //解析提示文本
                        "count": res.msg, //解析数据长度,目前接口返回count为0，所以自带分页无法显示
                        "data": res.data //解析数据列表
                    };
                }
            }
            layui.use('table', function(){
                that.table = layui.table;  
                //初始化表格数据
                that.table.render(that.assetsParam);
                that.table.render(that.transferParam);
            })
        },
        methods:{
            searchByHash(){
                let hash = this.hashID;
                this.transferParam.url = config.apiUrl+`/role/admin/tx/query.do?hash=${hash}`;
                this.table.render(this.transferParam);
            },
            viewAll(){
                this.hashID = '';
                this.transferParam.url = config.apiUrl+`/role/admin/tx/query.do`;
                this.table.render(this.transferParam);
            },
             //时间转时间戳
           timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                if(date == 'Invalid Date'){
                    return '无'
                }else{
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = (date.getDate()<10 ? '0'+date.getDate() : date.getDate()) + ' ';
                    var h = (date.getHours()<10 ? '0'+date.getHours() : date.getHours()) + ':';
                    var m = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes())  + ':';
                    var s = (date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds());
                    return Y+M+D+h+m+s;
                }
               
            },
        }

    }
</script>
<style>

</style>

