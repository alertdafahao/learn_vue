<template>
    <div id="gameSet">
        <div class="cfff f16 team-title">
            参数设置
        </div>
         <div class="layui-form-item">
             <!-- <form action="">
                 <div class="layui-inline">
                    <label class="layui-form-label">当日流入</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" required  lay-verify="required" :class="{'border-n':!canSet}" :disabled="!canSet" v-model="todayIn" placeholder="请输入流入值" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">当日流出</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" required  lay-verify="required" :class="{'border-n':!canSet}" :disabled="!canSet" v-model="todayOut" placeholder="请输入流出值" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-inline">
                    <label class="layui-form-label">单价限额</label>
                    <div class="layui-input-inline" style="width: 100px;">
                        <input type="text" name="price_min" placeholder="￥" :class="{'border-n':!canSet}" :disabled="!canSet" v-model="priceMin" autocomplete="off" class="layui-input" >
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline" style="width: 100px;">
                        <input type="text" name="price_max" placeholder="￥" :class="{'border-n':!canSet}" :disabled="!canSet" v-model="priceMax" autocomplete="off" class="layui-input" >
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn" v-show="!canSet" type="button" @click="setParam('set')">设 置</button>
                    <button class="layui-btn" v-show="canSet" type="button" @click="setParam('submit')">确  定</button>
                    <button class="layui-btn layui-btn-danger" type="reset" v-show="canSet">重 置</button>
                </div>
             </form> -->
             <table class="layui-hide" id="setList" lay-filter="setList"></table> 
              <script type="text/html" id="addParam">
                <a class="layui-btn  layui-btn-sm" lay-event="addParam">新 增</a>
            </script>
              <script type="text/html" id="setParam">
                <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="setParam">编 辑</a>
                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delParam">删 除</a>
            </script>  
        </div>
        <!-- <fieldset class="layui-elem-field layui-field-title mt50">
            <legend class="f16 cfff">小羊数据</legend>
        </fieldset> -->
        <div class="cfff f16 team-title mt50">
            小羊数据
        </div>
        <div class="tr pr15">
            <!-- <div style="float:left;margin-left:15px;">
                <button class="layui-btn layui-btn-sm" @click="viewAll">查看全部</button>
            </div> -->
            <div class="layui-form inline-block relative search-box inviteForm" >              
                <div class="layui-inline tl">
                    <label class="ce0e">状态: </label>                              
                    <select name="city" lay-filter="sheepStateSearch" id="inviteSearchBox" >
                        <option value="">请选择一种类型</option>                                      
                        <option value="1">已支付定金</option>                                      
                        <option value="2">支付尾款</option>                                      
                        <option value="3">已全部支付</option>                                      
                        <option value="4">已结束计息</option>                                      
                        <option value="5">已卖出</option>                                      
                        <option value="-1">丢失</option>                                      
                    </select>                                   
                </div>
            </div>
            <div class="inline-block relative search-box">
                <label  class="ce0e">羊ID: </label>
                <input type="text" class="search-input"  v-model="sheepID"  placeholder="请输入账号" autocomplete="off" >
                <button type="button " class="layui-btn layui-btn-xs search-btn"  @click="searchBy('ID')">
                    <i class="layui-icon layui-icon-search"></i>
                </button>
            </div>
            <div class="inline-block relative search-box">
                <label  class="ce0e">当前主人: </label>
                <input type="text" class="search-input"  v-model="ownerName"  placeholder="请输入主人账号" autocomplete="off" >
                <button type="button " class="layui-btn layui-btn-xs search-btn"  @click="searchBy('ownerName')">
                    <i class="layui-icon layui-icon-search"></i>
                </button>
            </div>
            <div class="inline-block relative" style="margin-left:15px;">
                <button class="layui-btn layui-btn-sm mb3" @click="viewAll">重 置</button>
            </div>
        </div>

        <table class="layui-hide" id="sheepList" lay-filter="sheepList"></table>
        <!-- <script type="text/html" id="barUsers"> -->
            <!-- <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a> -->
            <!-- <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="freeze" v-if = "canSet">冻结</a> -->
            <!-- <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="setting">催尾款</a> -->
        <!-- </script> -->
       

       <div id="setPop">
          
       </div>

    </div>
</template>
<script>
    import config from '../assets/config'
    export default {
        data(){
            return {
                canSet:false,
                todayIn:'',
                todayOut:'',
                priceMin:'',
                priceMax:'',
                sheepID:'',
                ownerName:'',
                table:null,
                form:null,
                laydate:null,
                setParams:{},//加载设置表格的参数
                setSheep:{},//加载羊表格的参数
                startTime:'',//生效时间
                endTime:'', //终止时间
                popIndex:null //弹出层层级
            }
        },
        mounted(){
             // 表格初始化
            let that =  this;
            layui.use(['form','table','laydate'], function(){
            that.table = layui.table;
            that.form = layui.form;
            that.laydate = layui.laydate
            that.form.render();
            
        //羊列表的参数
            that.setSheep = {
                elem: '#sheepList'
                ,url:config.apiUrl + '/role/admin/sheep/findsheep.do?type=5&value='
                ,title: '游戏羊数据表'
                ,cols: [[
                {align:'center',field:'id', title:'ID',  fixed: 'left', unresize: true, sort: true}
                ,{align:'center',field:'name', title:'羊名', }
                ,{align:'center',field:'price', title:'价格',templet:function(d){
                    return d.price / 1000000;
                } }
                // ,{align:'center',field:'maxTime', title:'产毛周期',  sort: true}
                // ,{align:'center',field:'day_profit', title:'羊毛收益' }
                ,{align:'center', title:'羊类型',templet:function(d){
                    return d.configData.name;
                }}
                ,{align:'center',field:'theDay', title:'饲养天数'}
                ,{align:'center', field:'sheepStateStr',title:'状态'}
                ,{align:'center',field:'profit', title:'当前创造收益', sort: true,templet:function(d){
                    return d.profit / 1000000;
                } }
                ,{align:'center',field:'userName', title:'当前主人'}
                ,{align:'center',fixed: 'right',title:'操作',templet:function(d){
                    return d.state == 1 ? `<a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="setting">催尾款</a>` : ``
                    }}
                ]]
                ,page:{
                    layout: ['prev', 'page', 'next'] //自定义分页布局
                    ,groups: 1 //只显示 1 个连续页码
                    ,limit:100
                    ,first: false //不显示首页
                    ,last: false //不显示尾页
                }
                ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                    return {
                        "code": res.status, //解析接口状态
                        "msg": res.msg, //解析提示文本
                        "count": 100000000, //解析数据长度,假数据
                        "data": res.data //解析数据列表
                    };
                }
            };

        //设置列表的参数
            that.setParams={
                elem: '#setList'
                ,url:config.apiUrl + '/role/admin/speed/allspeedctr.do'
                ,title: '参数设置列表'
                ,toolbar:'#addParam'
                ,defaultToolbar:false
                ,cols: [[
                {align:'center',field:'id', title:'ID',  fixed: 'left', unresize: true, rowspan: 2}
                ,{align:'center',field:'ftime', title:'起效时间', sort: true, rowspan: 2,templet:function(d){
                    return that.timestampToTime(d.ftime)
                }}
                ,{align:'center',field:'ttime', title:'终止时间', sort: true,rowspan: 2,templet:function(d){
                    return that.timestampToTime(d.ttime)
                } }
                ,{align:'center',field:'optime', title:'修改时间',  sort: true,rowspan: 2,templet:function(d){
                    return that.timestampToTime(d.optime)
                }}
                ,{align:'center', title:'最大限额(ETH)',colspan:3 }
                ,{align:'center', title:'今日状况(ETH)',colspan:3}
                ,{align:'center',field:'note', title:'备注',rowspan: 2}
                // ,{align:'center',field:'note', title:'备注',rowspan: 2}
                ,{align:'center',fixed: 'right', title:'操作',toolbar:'#setParam',rowspan: 2}
                ],[
                     {align:'center',field:'allowValue', title:'定金',templet:function(d){
                         return d.allowValue[0]==-1? '无限制' : d.allowValue[0]/1000000;
                     }}
                    // ,{align:'center',field:'allowValue[1]', title:'首次购买'}
                    ,{align:'center',field:'allowValue', title:'尾款',templet:function(d){
                         return d.allowValue[2]==-1? '无限制' : d.allowValue[2]/1000000;;
                     }}
                    // ,{align:'center',field:'allowValue[3]', title:'首次尾款金额'}
                    ,{align:'center',field:'allowValue', title:'提现',templet:function(d){
                         return d.allowValue[4]==-1? '无限制' : d.allowValue[4]/1000000;
                     }}
                    // ,{align:'center',field:'allowValue[5]', title:'首次提现金额'} //前6个为最大值

                    ,{align:'center', title:'定金',templet:function(d){
                         return d.todayUsed[0] /1000000;
                     }}
                    // ,{align:'center',field:'allowValue[0]', title:'首次购买'}
                    ,{align:'center', title:'尾款',templet:function(d){
                         return d.todayUsed[2] /1000000;
                     }}
                    // ,{align:'center',field:'allowValue[0]', title:'首次尾款金额'}
                    ,{align:'center',title:'提现',templet:function(d){
                         return d.todayUsed[4] /1000000;
                     }}
                    // ,{align:'center',field:'allowValue[0]', title:'首次提现金额'}
                ]]
                
                ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                    return {
                        "code": res.status, //解析接口状态
                        "msg": res.msg, //解析提示文本
                        // "count": res.count, //解析数据长度
                        "data": res.data.all //解析数据列表
                    };
                }
            }

            that.table.render(that.setParams);
            that.table.render(that.setSheep);

        //状态筛选
            that.form.on('select(sheepStateSearch)', function(data){
                var val= data.value;
                that.setSheep.url = config.apiUrl + '/role/admin/sheep/findsheep.do?type=3&value='+val;
                that.table.render(that.setSheep);
            });
           
            
        //监听行工具事件
            //羊列表
            that.table.on('tool(sheepList)', function(obj){
                var data = obj.data;
                if(obj.event === 'freeze'){
                    //冻结
                    layer.confirm('确认冻结?', {icon: 3, title:'提示'}, function(index){
                        that.$axios.get(config.apiUrl + '/role/admin/sheep/changsheep.do?type=4&value=-1').then((res)=>{
                            if(res.data.status == 0){
                                layer.msg('冻结成功')
                            }else{
                                layer.msg('冻结失败')
                            }
                        });
                        layer.close(index)
                    })
            
                } else if(obj.event === 'setting'){
                    //催尾款
                    layer.confirm('确认催款?', {icon: 3, title:'提示'}, function(index){
                        that.$axios.get(config.apiUrl + '/role/admin/sheep/changsheep.do?type=4&value=2&id='+data.id).then((res)=>{
                            if(res.data.status == 0){
                                layer.msg('催款成功')
                                that.setSheep.url = config.apiUrl + '/role/admin/sheep/findsheep.do?type=5&value=';
                                that.table.render(that.setSheep);
                            }else{
                                layer.msg('催款失败')
                            }
                            layer.close(index)
                        });
                    })
                }
            });
            //参数设置列表
            that.table.on('toolbar(setList)', function(obj){
                var checkStatus = that.table.checkStatus(obj.config.id);
                console.log(checkStatus);
                switch(obj.event){
                case 'addParam':
                    layer.open({
                        type:1
                        ,area: ['500px', '700px']
                        ,btn:['确定']
                        ,title:'参数设置'
                        ,content:`
                             <form class="layui-form mt10 gameSetPop">
                                <p class="mb15">时间设置:</p>
                                <div class="layui-form-item">
                                    <div class="layui-inline"> 
                                        <label class="layui-form-label">生效时间</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input" id="startTime">
                                        </div>
                                    </div>
                                    <div class="layui-inline">
                                        <label class="layui-form-label">终止时间</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input" id="endTime">
                                        </div>
                                    </div>
                                </div>
                                <p class="mb15">最大限额设置(ETH):</p>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">预付定金限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit1"  placeholder="" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">首次购买限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit2"  placeholder="" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">支付尾款限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit3"  placeholder="" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">首次支付尾款限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit4"  placeholder="" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">提现限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit5"  placeholder="" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">首次提现限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit6"  placeholder="" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <p class="mb15">备注:</p>
                                <div class="layui-form-item mr15">
                                    <textarea name="desc" placeholder="请输入备注内容" id="note"  class="layui-textarea"></textarea>
                                </div>
                            </form>
                        `
                        ,success: function(layero, index){
                            console.log(layero, index);
                            that.laydate.render({
                                elem: '#startTime' //指定元素
                                ,type: 'datetime'
                                // ,min: 0  可用于限制时间选择 
                                // ,value: new Date(1534766888000) //初始值，参数即为：2018-08-20 20:08:08 的时间戳    
                                ,btns: ['now', 'confirm'] 
                                ,done: function(value, date, endDate){
                                    console.log(value); //得到日期生成的值，如：2017-08-18
                                    that.startTime =  new Date(value).getTime();
                                }

                            });
                            that.laydate.render({
                                elem: '#endTime' //指定元素
                                ,type: 'datetime'
                                ,btns: ['now', 'confirm'] 
                                ,done: function(value, date, endDate){
                                    console.log(value); //得到日期生成的值，如：2017-08-18
                                    that.endTime =  new Date(value).getTime();
                                }
                            });
                        },
                        yes:function(index){
                            that.popIndex = index;
                            that.submitParam()
                        }
                    })
                    break;
                };
            });
            that.table.on('tool(setList)',function(obj){
                var data= obj.data;
                var id= data.id;
                if(obj.event === 'setParam'){               
                    layer.open({
                        type:1
                        ,area: ['500px', '700px']
                        ,btn:['确定']
                        ,title:'参数设置'
                        ,content:`
                             <form class="layui-form mt10 gameSetPop">
                                <p class="mb15">时间设置:</p>
                                <div class="layui-form-item">
                                    <div class="layui-inline"> 
                                        <label class="layui-form-label">生效时间</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input"  id="startTime">
                                        </div>
                                    </div>
                                    <div class="layui-inline">
                                        <label class="layui-form-label">终止时间</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input" id="endTime" >
                                        </div>
                                    </div>
                                </div>
                                <p class="mb15">最大限额设置(ETH): </p>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">预付定金限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit1"  placeholder="" value="${data.allowValue[0]==-1 ? '' : data.allowValue[0]/1000000}" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">首次购买限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit2"  placeholder="" value="${data.allowValue[1]==-1 ? '' : data.allowValue[1]/1000000}" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">支付尾款限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit3"  placeholder="" value="${data.allowValue[2]==-1 ? '' : data.allowValue[2]/1000000}" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">首次支付尾款限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit4"  placeholder="" value="${data.allowValue[3]==-1 ? '' : data.allowValue[3]/1000000}" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">提现限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit5"  placeholder="" value="${data.allowValue[4]==-1 ? '' :data.allowValue[4]/1000000}" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <div class="layui-form-item mr15">
                                    <div class="layui-inline">
                                        <label class="layui-form-label">首次提现限额</label>
                                        <div class="layui-input-block">
                                            <input type="text"  id="limit6"  placeholder="" value="${data.allowValue[5]==-1 ? '' : data.allowValue[5]/1000000}" autocomplete="off" class="layui-input">
                                        </div>
                                    </div> 
                                </div>
                                <p class="mb15">备注:</p>
                                <div class="layui-form-item mr15">
                                    <textarea name="desc" placeholder="请输入备注内容" id="note"  class="layui-textarea">${data.note || ''}</textarea>
                                </div>
                            </form>
                        `
                        ,success: function(layero, index){                   
                            that.laydate.render({
                                elem: '#startTime' //指定元素
                                ,type: 'datetime'
                                // ,min: 0  可用于限制时间选择 
                                ,value: new Date(data.optime) //初始值，参数即为：2018-08-20 20:08:08 的时间戳    
                                ,isInitValue: (new Date(data.optime)=='Invalid Date') ? false :true //是否允许填充初始值，默认为 true   
                                ,btns: ['now', 'confirm'] 
                                ,done: function(value, date, endDate){
                                    console.log(value); //得到日期生成的值，如：2017-08-18
                                    that.startTime =  new Date(value).getTime(); //选择日期后得到的日期值
                                }

                            });
                            that.laydate.render({
                                elem: '#endTime' //指定元素
                                ,type: 'datetime'
                                ,value: (new Date(data.ttime)=='Invalid Date') ? false :new Date(data.ttime) //初始值，参数即为：2018-08-20 20:08:08 的时间戳    
                                ,btns: ['now', 'confirm'] 
                                ,done: function(value, date, endDate){
                                    console.log(value); //得到日期生成的值，如：2017-08-18
                                    that.endTime =  new Date(value).getTime();
                                }
                            });
                        },
                        yes:function(index){
                            that.popIndex = index;
                            console.log(id)
                            that.submitParam(id)
                        }
                    })
                }else if(obj.event === 'delParam'){
                    let end = -1,
                    start = data.optime,
                    note = data.note,
                    l1 = data.allowValue[0],
                    l2 = data.allowValue[1],
                    l3 = data.allowValue[2],
                    l4 = data.allowValue[3],
                    l5 = data.allowValue[4],
                    l6 = data.allowValue[5];

                    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){ 
                        that.$axios.get(config.apiUrl + `/role/admin/speed/updatespeedctr.do?id=${id}&ftime=${start}&ttime=${end}&note=${note}&v1=${l1}&v2=${l2}&v3=${l3}&v4=${l4}&v5=${l5}&v6=${l6}`).then((res)=>{
                            if(res.data.status == 0){
                                layer.msg('删除成功')
                                that.table.render(that.setParams);
                            }else{
                                layer.msg('删除失败')
                            }
                            layer.close(index);
                        })     
                    });
                    // that.submitParam(id,'del')
                }
            })

            });
        },
        methods:{
        //提交新增或修改信息
            submitParam(id,del){
                var start = $('#startTime').val();
                var end = $('#endTime').val();
                var l1 = $('#limit1').val();
                var l2 = $('#limit2').val();
                var l3 = $('#limit3').val();
                var l4 = $('#limit4').val();
                var l5 = $('#limit5').val();
                var l6 = $('#limit6').val();
                var note = $('#note').val();
                var id = (id==0 || id) ? id : -1;
                var reg = /\d/;

                l1 = l1=='' ? -1 : l1*1000000;
                l2 = l2=='' ? -1 : l2*1000000;
                l3 = l3=='' ? -1 : l3*1000000;
                l4 = l4=='' ? -1 : l4*1000000;
                l5 = l5=='' ? -1 : l5*1000000;
                l6 = l6=='' ? -1 : l6*1000000;
                // if(!(start && end  && l1  && l2  &&l3 &&l4  &&l5  &&l6)){
                if(start=='' || end==''){
                    layer.msg('时间为必填项');
                // }else if(!reg.test(l1) || !reg.test(l2) || !reg.test(l3) || !reg.test(l4) || !reg.test(l5) || !reg.test(l6)){
                    // layer.msg('最大限额必须为数字');
                }else{
                   start = new Date(start).getTime();
                   end = new Date(end).getTime();
                   this.$axios.get(config.apiUrl + `/role/admin/speed/updatespeedctr.do?id=${id}&ftime=${start}&ttime=${end}&note=${note}&v1=${l1}&v2=${l2}&v3=${l3}&v4=${l4}&v5=${l5}&v6=${l6}`).then((res)=>{
                        console.log(res);
                        if(res.data.status == 0){
                            layer.msg('成功')
                            this.table.render(this.setParams)  //更新表格数据
                            layer.close(this.popIndex);                     
                        }else{
                            layer.msg('失败');                       
                        }
                    })
                }   
            },
            searchBy(type){
                if(type == 'ID'){
                    if(this.sheepID == ''){
                        layer.msg('请输入羊的ID号')
                    }else{
                        this.setSheep.url = config.apiUrl + '/role/admin/sheep/findsheep.do?type=1&value='+this.sheepID;
                        this.table.render(this.setSheep);
                    }
                    
                }else if(type == 'ownerName'){
                    if(this.ownerName == ''){
                        layer.msg('请输入主人账号')
                    }else{
                        this.setSheep.url = config.apiUrl + '/role/admin/sheep/findsheep.do?type=7&value='+this.ownerName;
                        this.table.render(this.setSheep);
                    }
                    
                }
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
        // 查看全部
            viewAll(){
                this.setSheep.url = config.apiUrl + '/role/admin/sheep/findsheep.do?type=5&value=';
                this.table.render(this.setSheep);
            }
           
        }
    }
</script>

<style  scoped>
    .border-n{
        border:none;
    }
</style>
<style>
    .gameSetPop {
        padding: 0 20px;
    }
    .gameSetPop .layui-form-label{
        width:140px;
    }
    .gameSetPop .layui-input-block{
        margin-left:175px;
    }
</style>

