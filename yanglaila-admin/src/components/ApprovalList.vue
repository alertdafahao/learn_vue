<!-- 审批列表 -->
<template>
    <div id="approval">
        <div class="cfff f16 team-title">
                审批列表
        </div>
        <table class="layui-hide" id="approvalList" lay-filter="approvalList"></table>
        <script type="text/html" id="approvalBar">
            <a class="layui-btn layui-btn-xs" lay-event="agree">同意</a>
            <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="reject">拒绝</a>
        </script>
    </div>
</template>
<script>
    import config from '../assets/config';
    export default {
        data(){
            return {
                phoneNum:'',
                param:{}
            }
        },
        mounted(){
            var that = this;
            this.param = {
                    elem: '#approvalList'
                    ,url:config.apiUrl + '/role/admin/apply/listforadmin.do'
                    ,cols: [[
                    {align:'center',field:'racc', title:'账号'}
                    ,{align:'center',field:'rtypeStr', title:'级别', }
                    ,{align:'center', title:'申请级别',templet:function(){
                        return '钻石农场主'
                    } }
                    ,{align:'center',field:'opacc', title:'申请人', }
                    ,{align:'center', title:'申请时间',templet:function(d){
                        return that.timestampToTime(d.applyTime)
                    }}
                    ,{align:'center',field:'status', title:'申请状态',}
                    ,{align:'center',title:'操作',templet:function(d){
                        if(d.status == 'SUCCESS' || d.status == 'REFUSE'){
                            return ''
                        }else{
                            return `<a class="layui-btn layui-btn-xs" lay-event="agree">同意</a>
                                    <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="reject">拒绝</a>`
                        }
                    }}
                    ]]
                    ,page:true
                    ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": res.status, //解析接口状态
                            "msg": res.msg, //解析提示文本
                            "count": res.count, //解析数据长度
                            "data": res.data //解析数据列表
                        };
                    }
                }
            layui.use('table',function(){
                var table = layui.table;
                table.render(that.param);
                table.on('tool(approvalList)', function(obj){
                    let data = obj.data;
                    let userId =  data.rid;
                    let id = data.id; 
                    console.log(data);
                    if(obj.event === 'agree'){
                       layer.confirm('是否同意升级?',{icon: 3, title:'提示'}, function(index){
                           that.$axios.get(config.apiUrl + '/role/admin/apply/approval.do?state=1&id='+id).then((res)=>{
                               if(res.data.status == 0){
                                   console.log(res.data);
                                   layer.msg('操作成功');
                                   table.render(that.param);
                               }else{
                                   layer.msg('操作失败')
                               }
                           })
                       })
                    }else if(obj.event === 'reject'){
                        layer.confirm('是否拒绝升级?',{icon: 3, title:'提示'}, function(index){
                           that.$axios.get(config.apiUrl + '/role/admin/apply/approval.do?state=0&id='+id).then((res)=>{
                               if(res.data.status == 0){
                                    table.render(that.param);
                                    layer.msg('操作成功')
                               }else{
                                   layer.msg('操作失败')
                               }
                           })
                       })
                    }
                })
            })
        },
        methods:{
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
                    var s = (date.getSeconds()<10 ? '0'+date.getMinutes() : date.getMinutes());
                    return Y+M+D+h+m+s;
                }
               
            },
        }
    }
</script>