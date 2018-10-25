<template>
    <div id="level">
         <fieldset class="layui-elem-field">
            <legend class="c009">级别管理</legend>
            <div class="layui-field-box">
                <div class="tr">
                    <div class="layui-btn-group" >
                        <!-- <button class="layui-btn" @reset = "funBtn('add')" v-if="!showReset">新 增</button> -->
                        <button class="layui-btn layui-btn-warm" type="button" @click="backTo()">返 回</button>
                        <!-- <button class="layui-btn" @click = "funBtn('edit')" v-if="isDis">编辑</button>
                        <button class="layui-btn" v-if="showDel" @click = "funBtn('del')">删除</button> -->
                    </div>
                </div> 
                <table class="layui-hide levelList" id="levelList" lay-filter="levelList"></table>
                <script type="text/html" id="toolbar">
                    <div class="layui-btn-container">
                        <button class="layui-btn layui-btn-sm" lay-event="addLevel">新增类型</button>
                </script>
                 <script type="text/html" id="barLevels">
                    <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="edit">编辑</a>
                </script>
            </div>
         </fieldset>
    </div>
</template>
<script>
    import config from '../assets/config'
    export default {
        data(){
            return {
                table:null,
                param:{}, //表格数据
                toClose:false
            }
        },
        mounted(){
            let that = this;
            layui.use('table',function(){
                that.table = layui.table;
                that.param = {
                    elem: '#levelList'
                    ,url:config.apiUrl+'/role/admin/invite/inviteConifg.do?id=-1'
                    ,toolbar: '#toolbar' //工具栏的显示情况
                    ,defaultToolbar:false //工具栏右侧图标
                    ,title: '用户级别表'
                    ,height: 'full' //高度最大化减去差值
                    ,cols: [[
                     {field:'note', title:'类型',  fixed: 'left',rowspan: 2}
                    ,{align:'center',title:'提成比例',colspan: 6}
                    ,{align:'center',title:'操作',toolbar: '#barLevels',rowspan: 2}
                    ]
                    ,[
                        {align:'center',field:'v1', title:'级别1',templet:function(d){
                            return d.v1 /100
                        }}
                        ,{align:'center',field:'v2', title:'级别2',templet:function(d){
                            return d.v2 /100
                        }}
                        ,{align:'center',field:'v3', title:'级别3',templet:function(d){
                            return d.v3 /100
                        }}
                        ,{align:'center',field:'v4', title:'级别4',templet:function(d){
                            return d.v4 /100
                        }}
                        ,{align:'center',field:'v5', title:'级别5',templet:function(d){
                            return d.v5 /100
                        }}
                        ,{align:'center',field:'vother', title:'其他',templet:function(d){
                            return d.vother /100
                        }}
                    ]]
                   
                    ,response: {
                        statusCode: 200 //规定成功的状态码为 200，table 组件默认为 0
                    }
                    ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                        return {
                            "code": 200, //解析接口状态
                            "msg": res.msg, //解析提示文本
                            "count": res.count, //解析数据长度
                            "data": res.data //解析数据列表
                        };
                    }
                }
                
                that.table.render(that.param);
                  //头工具栏事件
                that.table.on('toolbar(levelList)', function(obj){
                    var checkStatus = that.table.checkStatus(obj.config.id);
                    switch(obj.event){
                    case 'addLevel':
                        layer.open({
                            type:1,
                            title:'新增类型'
                            ,btn: ['继续新增','完成']
                            ,content:`
                            <div class="layui-form-item">
                                <div class="layui-inline mt10">
                                    <label class="layui-form-label">类型</label>
                                    <div class="layui-input-block">
                                        <input type="text"  id="levelID" placeholder="请输入级别名称" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div>

                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <label class="layui-form-label">提成比例(%)</label>
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-1" placeholder="一级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-2"  placeholder="二级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-3" placeholder="三级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-4" placeholder="四级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text" id="percentID-5" placeholder="五级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text" id="percentID-6"  placeholder="其他" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            `,
                            yes:function(index){
                                //yes 不会主动关闭弹窗
                               if(that.saveLevel()){
                                    that.updateInvite().then((res)=>{
                                        if(res){
                                            console.log('添加成功')
                                        }
                                    })
                                }               
                            }
                            ,btn2:function(index){
                                //会主动关闭 需要添加return false 防止失败时关闭
                                if(that.saveLevel()){
                                    that.updateInvite().then((res)=>{
                                        if(res){
                                            that.table.render(that.param);
                                        }else{
                                            return false;
                                        }
                                    })
                                }else{
                                    return false;
                                }
                            }
                            ,cancel: function(index, layero){ 
                               console.log('此处可确认是否放弃编辑')
                            } 
                        })
                    };
                });
                //监听行工具事件
                that.table.on('tool(levelList)', function(obj){
                    let data = obj.data;
                    let id= data.id;
                    if(obj.event === 'edit'){
                         layer.open({
                            type:1,
                            title:'编辑'
                            ,btn:['完成']
                            ,content:`
                            <div class="layui-form-item">
                                <div class="layui-inline mt10">
                                    <label class="layui-form-label">类型</label>
                                    <div class="layui-input-block">
                                        <input type="text"  id="levelID" value=${data.note} placeholder="请输入级别名称" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div>

                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <label class="layui-form-label">提成比例(%)</label>
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-1" value=${data.v1/100} placeholder="一级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-2" value=${data.v2/100}  placeholder="二级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-3" value=${data.v3/100} placeholder="三级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text"  id="percentID-4" value=${data.v4/100} placeholder="四级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text" id="percentID-5" value=${data.v5/100} placeholder="五级" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            <div class="layui-form-item mr15">
                                <div class="layui-inline">
                                    <div class="layui-input-block">
                                        <input type="text" id="percentID-6" value=${data.vother/100}  placeholder="其他" autocomplete="off" class="layui-input">
                                    </div>
                                </div> 
                            </div> 
                            `,
                            yes:function(index){
                                if(that.saveLevel()){
                                    console.log(id);
                                    that.updateInvite(id).then((res)=>{
                                        if(res){
                                            layer.close(index);
                                            that.table.render(that.param);
                                        }
                                    })
                                }else{
                                    console.log('shibai')
                                }
                            }
                            ,cancel: function(index, layero){ 
                               
                            } 
                        })
                    } 
                });
            })
        },
        methods:{
            saveLevel (){
                var levelValue =  $('#levelID').val();
                var percentValue1 = $('#percentID-1').val();
                var percentValue2 = $('#percentID-2').val();
                var percentValue3 = $('#percentID-3').val();
                var percentValue4 = $('#percentID-4').val();
                var percentValue5 = $('#percentID-5').val();
                var percentValue6 = $('#percentID-6').val();
                if(levelValue == ''){
                    layer.msg('类型不能为空');
                    return false;
                }
                if(isNaN(parseFloat(percentValue1)) || parseFloat(percentValue1) < 0 || parseFloat(percentValue1) >100){
                    layer.msg('提成比例必须是0~100之间的数字，且不能为空');
                    return false;
                }else if(isNaN(parseFloat(percentValue2)) ||parseFloat(percentValue2) < 0 || parseFloat(percentValue2) >100){
                    layer.msg('提成比例必须是0~100之间的数字，且不能为空');
                    return false;
                
                }else if(isNaN(parseFloat(percentValue3)) || parseFloat(percentValue3) < 0 || parseFloat(percentValue3) >100){
                    layer.msg('提成比例必须是0~100之间的数字，且不能为空');
                    return false;
                
                }else if(isNaN(parseFloat(percentValue4)) || parseFloat(percentValue4) < 0 || parseFloat(percentValue4) >100){
                    layer.msg('提成比例必须是0~100之间的数字，且不能为空');
                    return false;
                
                }else if(isNaN(parseFloat(percentValue5)) ||parseFloat(percentValue5) < 0 || parseFloat(percentValue5) >100){
                    layer.msg('提成比例必须是0~100之间的数字，且不能为空');
                    return false;
                
                }else if(isNaN(parseFloat(percentValue6)) || parseFloat(percentValue6) < 0 || parseFloat(percentValue6) >100){
                    layer.msg('提成比例必须是0~100之间的数字，且不能为空');
                    return false;
                }else{
                    return true;
                }
            },

        //修改邀请码数据
            updateInvite(id){
                var id= (id==0 || id) ? id : -1;
                var levelValue =  $('#levelID').val();
                var percentValue1 = $('#percentID-1').val();
                var percentValue2 = $('#percentID-2').val();
                var percentValue3 = $('#percentID-3').val();
                var percentValue4 = $('#percentID-4').val();
                var percentValue5 = $('#percentID-5').val();
                var percentValue6 = $('#percentID-6').val();
                return   this.$axios.get(config.apiUrl + `/role/admin/invite/updateinviteConifg.do?id=${id}&note=${levelValue}&vars=${percentValue1*100},${percentValue2*100},${percentValue3*100},${percentValue4*100},${percentValue5*100},${percentValue6*100}`).then((res)=>{
                    if(res.data.status == 0){
                        $('#levelID').val('');
                        $('#percentID-1').val('');
                        $('#percentID-2').val('');
                        $('#percentID-3').val('');
                        $('#percentID-4').val('');
                        $('#percentID-5').val('');
                        $('#percentID-6').val('');
                        console.log(this);
                        layer.msg('成功');
                        return true;
                    }else{
                        layer.msg('失败');
                        return false;
                    }
                })
            },
            backTo(){
                 this.$router.back(-1);
            }

        }
    }
</script>



