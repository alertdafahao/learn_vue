<!-- 审批列表 -->
<template>
    <div id="approval">
        <div class="cfff f16 team-title">
                审批列表
        </div>
        <table class="layui-hide" id="approvalList2" lay-filter="approvalList2"></table>
        <script type="text/html" id="approvalBar">
            <a class="layui-btn layui-btn-xs" lay-event="agree">通过</a>
            <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="reject">暂停</a>
        </script>
    </div>
</template>
<script>
    import config from '../assets/config';
    import bus from '../assets/event';
    export default {
        data(){
            return {
                phoneNum:'',
                param:{},
                pendNum:0
            }
        },
        mounted(){
            var that = this;
            this.param = {
                    elem: '#approvalList2'
                    ,url:config.apiUrl + '/role/admin/send/allwaitsendout.do?page=0'
                    ,cols: [[
                    {align:'center',field:'orderid', title:'订单号'}
                    ,{align:'center',field:'name', title:'用户账号',}
                     ,{align:'center',field:'money', title:'提现金额(ETH)',templet:function(d){
                        return d.money / 1000000;
                    }}
                    ,{align:'center',field:'mac', title:'提现地址', }
                     ,{align:'center', title:'请求时间',templet:function(d){
                        return that.timestampToTime(d.timev)
                    }}
                    ,{align:'center',field:'state', title:'订单状态',templet:function(d){
                        if(d.state == 1){
                            return '通过'
                        }else if(d.state == 0){
                            return '待通过'
                        }else if(d.state == 5){
                            return '暂停'
                        }else{
                            return '未通过'
                        }
                    }}
                    ,{align:'center',title:'操作',templet:function(d){
                        if(d.status == 'SUCCESS' || d.status == 'REFUSE'){
                            return ''
                        }else{
                            return `<a class="layui-btn layui-btn-xs" lay-event="agree">通过</a>
                                    <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="reject">暂停</a>`

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
                    },
                    done:function(res,curr,count){
                            that.pendNum = 0;
                            let data = res.data;
                            for(let i=0;i<data.length;i++){
                                if(data[i].state == 0){
                                    that.pendNum ++;
                                }
                            }
                            bus.$emit('pendNum',that.pendNum);
                    }
                }
            layui.use('table',function(){
                var table = layui.table;
                table.render(that.param);

                setInterval(function(){
                    table.render(that.param)
                },300000);

                table.on('tool(approvalList2)', function(obj){
                    let data = obj.data;
                    let orderid = data.orderid; 
                    if(obj.event === 'agree'){
                       layer.confirm('是否同意提现请求？',{icon: 3, title:'提示'}, function(index){
                           that.$axios.get(config.apiUrl + '/role/admin/send/allowsendout.do?orderid='+orderid+'&isallow=1').then((res)=>{
                               if(res.data.status == 0){
                                   layer.msg('操作成功');
                                   table.render(that.param);
                               }else{
                                   layer.msg('操作失败')
                               }
                           })
                       })
                    }else if(obj.event === 'reject'){
                        layer.confirm('是否暂停提现请求？',{icon: 3, title:'提示'}, function(index){
                           that.$axios.get(config.apiUrl + '/role/admin/send/allowsendout.do?orderid='+orderid+'&isallow=2').then((res)=>{
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