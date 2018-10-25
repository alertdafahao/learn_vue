<template>
    <div id="users">
            <div class="cfff f16 team-title">
                用户列表
            </div>
            <!-- <legend class="c009">用户列表</legend> -->
            <div class="layui-field-box" style="position:relative;">   
               <div class="levelSel" >
                    <div class="layui-form inline-block relative search-box inviteForm" >              
                        <div class="layui-inline">
                            <label class="ce0e">邀请码类型: </label>                              
                            <select name="city" lay-filter="inviteTypeSearch" id="inviteSearchBox" >
                                <option value="">请选择一种类型</option>                                      
                            </select>                                   
                        </div>
                    </div>
                    <div class="inline-block relative search-box">
                        <label class="ce0e">邀请码: </label>
                        <input type="text" class="search-input"  id="inviteCode" v-model="inviteCode"  placeholder="请输入邀请码" autocomplete="off" >
                        <button type="button " class="layui-btn layui-btn-xs search-btn"  @click="searchBy('inviteCode')">
                            <i class="layui-icon layui-icon-search"></i>
                        </button>
                    </div>
                    <div class="inline-block relative search-box">
                        <label class="ce0e">账号: </label>
                        <input type="text" class="search-input"  id="phoneNum" v-model="phoneNum"  placeholder="请输入账号" autocomplete="off" >
                        <button type="button " class="layui-btn layui-btn-xs search-btn"  @click="searchBy('account')">
                            <i class="layui-icon layui-icon-search"></i>
                        </button>
                    </div>
                    <div class="inline-block relative" style="margin-left:15px;">
                        <button class="layui-btn layui-btn-sm mb3" @click="searchBy('viewAll')">重 置</button>
                    </div>
                </div>

                <table class="layui-hide" id="userList" lay-filter="userList"></table>
                <div class="pageBox">
                    <span class="pre layui-icon" @click="prePage()" :class="{'notAllow':preNotAllow}">&#xe603;</span>
                    <span class="page">{{curPage}}</span>
                    <span class="next layui-icon" @click="nextPage()" :class="{'notAllow':nextNotAllow}">&#xe602;</span>
                </div>
                
                <script type="text/html" id="toolbar">
                    <div class="layui-btn-container">
                        <!-- <button class="layui-btn layui-btn-sm" lay-event="addUser">新增用户</button> -->
                        <button class="layui-btn layui-btn-sm" lay-event="setLevel">设置级别</button>  
                        <!-- <button type="button " class="layui-btn layui-btn-sm" lay-event="viewAll">查看全部</button> -->
                        
                        <!-- <div class="layui-inline levelSel" >
                            <div class="layui-form inline-block relative search-box inviteForm" >              
                                <div class="layui-inline">
                                    <label>邀请码类型: </label>                              
                                    <select name="city" lay-filter="inviteTypeSearch" id="inviteSearchBox" >
                                        <option value="">请选择一种类型</option>                                      
                                    </select>                                   
                                </div>
                            </div>
                            <div class="inline-block relative search-box">
                                <label >账号: </label>
                                <input type="text" class="search-input"  id="phoneNum" v-model="phoneNum"  placeholder="请输入账号" autocomplete="off" >
                                <button type="button " class="layui-btn layui-btn-xs search-btn" lay-event="searchByAccount" @click="searchBy('account')">
                                    <i class="layui-icon layui-icon-search"></i>
                                </button>
                            </div>
                        </div> -->
                    </div>
                </script>               
                <script type="text/html" id="barUsers">
                    <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="view">查看</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="freeze">冻结</a>
                    <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="setting">权限设置</a>
                </script> 
            </div>
    </div>
</template>

<script>
    import config from '../assets/config'
    export default {
        
        data(){
            return {
                level:'', //设置的级别
                percent:'', //设置的提成比例
                phoneNum:'',
                inviteType:'',
                inviteCode:'',
                levels: [],
                table:null,
                form:null,
                laytpl:null,
                param:{}, //表格数据加载需要的参数
                selItems:'',
                curPage:1, //当前显示页，默认为1
                pageLastCreate:0, //某页下最后一个数据的时间戳
                pageMark:[], //存放分页加载的时间标记
                lastPageLength:0, //判断是否还有数据
                preNotAllow:false,
                nextNotAllow:false

            }
        },
        mounted(){
            let that =  this;
            // 邀请码类型下拉框初始化
            this.getInviteType().then(()=>{
                layui.use('form',function(){
                    that.form = layui.form;
                    that.form.render()
                    //按邀请码类型筛选
                    that.form.on('select(inviteTypeSearch)', function(data){
                        var val= data.value;
                        that.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=4&value='+val;
                        that.table.render(that.param);
                    });
                })
            });
            
            // 表格初始化
            
            that.param = {
                elem: '#userList'
                ,url:config.apiUrl+'/role/admin/user/usersearch.do?type=6&value='
                ,toolbar: '#toolbar' //工具栏的显示情况
                ,defaultToolbar:false //工具栏右侧图标
                ,title: '用户数据表'
                ,height: 'full-100' //高度最大化减去差值
                ,cols: [[
                {align:'center',field:'phone', title:'账号',  fixed: 'left' }
                ,{align:'center',field:'name', title:'用户名'}
                // ,{align:'center',field:'typeStr', title:'用户类型'}
                ,{align:'center',field:'seotypeStr', title:'用户级别'}
                ,{align:'center',field:'ivNote', title:'邀请码类型' }
                ,{align:'center',field:'rechange', title:'总充值',  sort: true,templet:function(d){
                    return d.rechange / 1000000
                }}
                ,{align:'center',field:'remain', title:'剩余尾款',sort: true,templet:function(d){
                    return d.remain / 1000000
                }}
                ,{align:'center',field:'sheep', title:'羊ID', templet:function(d){
                    return d.sheep == -1 ? '没买羊' : d.sheep;
                }}
                ,{align:'center',fixed: 'right', title:'操作', templet:function(d){
                    // that.pageLastCreate = that.pageLastCreate < d.create ? that.pageLastCreate : d.create;
                    that.pageLastCreate =  d.create ;
                    if(d.type == -100){
                        return `<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="view">查看</a>
                        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="unfreeze">解冻</a>
                        <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="setting">权限设置</a>`
                    }else{
                        return `<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="view">查看</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="freeze">冻结</a>
                        <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="setting">权限设置</a>`
                    }
                }}
                ]]
                ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                    return {
                        "code": res.state, //解析接口状态
                        "msg": res.msg, //解析提示文本
                        "count": res.count, //解析数据长度,目前接口返回count为0，所以自带分页无法显示
                        "data": res.data //解析数据列表
                    };
                },
                done:function(res){
                   that.lastPageLength = res.data.length;
                   that.nextNotAllow = that.lastPageLength>=100 ? false : true; //后续没有数据时下一页禁止点击  
                   that.preNotAllow = that.curPage<=1 ? true :false; //页码为1的时候，上一页禁止点击
                }
            };
            layui.use('table', function(){
            that.table = layui.table;  

        //初始化表格数据
            that.table.render(that.param);



            //头工具栏事件
            that.table.on('toolbar(userList)', function(obj){
                var checkStatus = that.table.checkStatus(obj.config.id);
                switch(obj.event){
                case 'addUser':
                    // 跳转至用户详情页面
                    that.$router.push({path: '/userDetail',query:{ type:'add'}});
                    break;
                case 'setLevel':
                    //跳转至级别设置页面
                    that.$router.push('/levelList');
                    break;
                
                case 'searchByAccount':
                    var pVal =$('#phoneNum').val();
                    that.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=2&value='+pVal;
                    that.table.render(that.param);
                    $('#phoneNum').val(pVal);
                    $('#inviteType').val('');
                    break;
                // case 'searchByType':
                //     var iVal = $('#inviteType').val();
                //     that.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=4&value='+iVal;
                //     that.table.render(that.param);
                //     $('#phoneNum').val('');
                //     $('#inviteType').val(iVal);
                //     break;
                };
            });
            //监听行工具事件
            that.table.on('tool(userList)', function(obj){
                let data = obj.data;
                let userId =  data.rid;
                if(obj.event === 'view'){
                     // 跳转至用户详情
                    that.$router.push({path: '/userDetail',query:{ id:userId,type:'view'}});
                } else if(obj.event === 'freeze'){
                    // 冻结用户
                    layer.confirm('确认冻结?', {icon: 3, title:'提示'}, function(index){
                        that.$axios.get(config.apiUrl+`/role/admin/user/userupdate.do?rid=${userId}&type=7&value=-1`).then((res)=>{
                            if(res.data.status == 0){
                                layer.msg('冻结成功')
                                that.table.render(that.param);
                            }else{
                                layer.msg('冻结失败')
                            }
                            layer.close(index);
                        })     
                    });
                      
                    // that.$router.push({path: '/userDetail',query:{ id:userId,type:'edit'}});
                }else if(obj.event === 'unfreeze'){
                    // 解冻用户(解冻为普通用户 值传0)
                    layer.confirm('确认解冻用户?', {icon: 3, title:'提示'}, function(index){                  
                        that.$axios.get(config.apiUrl+`/role/admin/user/userupdate.do?rid=${userId}&type=6&value=0`).then((res)=>{
                            if(res.data.status == 0){
                                layer.msg('解冻成功')
                                // layer.closeAll('page');
                                that.table.render(that.param);
                            }else{
                                layer.msg('解冻失败')
                            } 
                        })      
                    });
                    // var selData = null;
                    //     layer.open({
                    //         type:1,
                    //         title:'用户类型设置',
                    //         btn:['确定']
                    //         ,content:
                    //         '<form class="layui-form popForm" >\
                    //             <div class="layui-form-item">\
                    //                 <div class="layui-inline mt10">\
                    //                     <label class="layui-form-label">类型</label>\
                    //                     <div class="layui-input-block">\
                    //                         <select name="city" lay-filter="userType">\
                    //                             <option value="">请选择一种类型</option>\
                    //                             <option value="0">普通用户</option>\
                    //                             <option value="1">营销员</option>\
                    //                             <option value="2">超级营销员</option>\
                    //                         </select> \
                    //                     </div> \
                    //                 </div>\
                    //             </div>\
                    //         </form>'
                    //         ,
                    //         success: function(layero, index){
                    //             that.form.render();
                    //             that.form.on('select(userType)', function(data){
                    //                 selData = data.value;
                    //             });
                    //         },
                    //         yes:function(index){
                    //             if(selData === null || selData === ''){
                    //                 layer.msg('请至少选择一种类型');
                    //                 return false;
                    //             }else{
                    //                 that.saveType(userId,selData);
                    //             }                             
                    //         }
                    //         ,cancel: function(index, layero){ 
                    //             // layer.msg(selData)
                    //         } 
                    //     })

                }else if(obj.event === 'setting'){
                    // <div class="layui-form-item">
                                    //     <div class="layui-inline mt10">
                                    //         <label class="layui-form-label">用户类型</label>
                                    //         <div class="layui-input-block">
                                    //             <select name="userType" lay-filter="userType">
                                    //                 <option value="">请选择一种类型</option>
                                    //                 <option value="0">普通用户</option>
                                    //                 <option value="1">营销员</option>
                                    //                 <option value="2">超级营销员</option>
                                    //             </select> 
                                    //         </div> 
                                    //     </div>
                                    // </div>
                    var selhtml = '';
                    var userTypeData = data.type;
                    var userLevelData = data.seoType;
                    var inviteTypeData = data.ivtype;
                    that.$axios.get(config.apiUrl+'/role/admin/invite/inviteConifg.do?id=-1').then((res)=>{
                        if(res.data.status == 0){
                            for(var i=0;i<res.data.data.length;i++){
                                selhtml +=`<option value=${res.data.data[i].id}>${res.data.data[i].note}</option>`;
                            }
                            layer.open({
                                type:1,
                                title:'用户设置',
                                btn:['确定'],
                                content:
                                `<form class="layui-form popForm" lay-filter="power">
                                    <div class="layui-form-item">
                                        <div class="layui-inline mt10">
                                            <label class="layui-form-label">用户等级</label>
                                            <div class="layui-input-block">
                                                <select name="userLevel" lay-filter="userLevel">
                                                    <option value="">请选择一种类型</option>
                                                    <option value="0">平民</option>
                                                    <option value="1">普通农场主</option>
                                                    <option value="2">白银农场主</option>
                                                    <option value="3">黄金农场主</option>
                                                    <option value="4">钻石农场主</option>
                                                    <option value="5">超级农场主</option>                           
                                                </select> 
                                            </div> 
                                        </div>
                                    </div>
                                    
                                    <div class="layui-form-item">
                                        <div class="layui-inline mt10">
                                            <label class="layui-form-label">邀请码类型</label>
                                            <div class="layui-input-block">
                                                <select name="inviteType" lay-filter="inviteType">
                                                    <option value="">请选择一种类型</option>'
                                                    ${selhtml}
                                                '</select> 
                                            </div> 
                                        </div>
                                    </div>
                                </form>`
                                ,success: function(layero, index){
                                    that.form.render();
                                    that.form.val('power',{
                                        'userType':data.type,
                                        'userLevel':data.seoType,
                                        'inviteType':data.ivtype
                                    })
                                    // that.form.on('select(userType)', function(data){
                                    //     console.log(data);
                                    //     userTypeData = data.value;
                                    // });
                                    that.form.on('select(userLevel)', function(data){
                                        userLevelData = data.value;
                                    });
                                    that.form.on('select(inviteType)', function(data){
                                        inviteTypeData = data.value;
                                    });
                                    // that.form.on('select', function(data){
                                    //     console.log(data);
                                    //     // inviteTypeData = data.value;
                                    // });
                                },
                                yes:function(index){                            
                                        // that.saveType(userId,userTypeData);
                                        that.saveLevel(userId,userLevelData);                                        
                                        that.saveInviteType(userId,inviteTypeData);                                                            
                                }
                                ,cancel: function(index, layero){ 
                                    // layer.msg(selData)
                                } 
                            })
                        }else{
                            layer.msg("类型初始化未完成");
                        }
                    })
              
                }
            });

        //分页初始化
            // layui.use('laypage', function(){
            //     var laypage = layui.laypage;
                
            //     //执行一个laypage实例
            //     laypage.render({
            //         elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            //         ,layout: [ 'prev', 'page', 'next'] //自定义分页布局
            //         ,curr: 5 //设定初始在第 5 页
            //         ,groups: 1 //只显示 1 个连续页码
            //         ,first: false //不显示首页
            //         ,last: false //不显示尾页
            //     });
            // });

            
          });
        },
        methods:{
            //用户等级修改
            saveLevel (id,val){
                this.$axios.get(config.apiUrl+`/role/admin/user/userupdate.do?rid=${id}&type=10&value=${val}`).then((res)=>{
                    if(res.data.status == 0){
                        layer.msg('修改成功')
                        layer.closeAll('page');
                        this.table.render(this.param);
                    }else{
                        layer.msg('修改失败')
                    }
                   
                })  
            },
            //用户类型修改
             saveType (id,val){
                this.$axios.get(config.apiUrl+`/role/admin/user/userupdate.do?rid=${id}&type=6&value=${val}`).then((res)=>{
                    if(res.data.status == 0){
                        layer.msg('修改成功')
                        layer.closeAll('page');
                        this.table.render(this.param);
                    }else{
                        layer.msg('修改失败')
                    }
                   
                })  
            },
            //邀请码类型修改
             saveInviteType (id,val){
                this.$axios.get(config.apiUrl+`/role/admin/user/userupdate.do?rid=${id}&type=5&value=${val}`).then((res)=>{
                    if(res.data.status == 0){
                        layer.msg('修改成功')
                        layer.closeAll('page');
                        this.table.render(this.param);
                    }else{
                        layer.msg('修改失败')
                    }
                   
                })  
            },


    // 表格筛选
            searchBy(type){
                if(type == "account"){
                    var val =this.phoneNum;
                    this.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=2&value='+val
                }else if(type == 'inviteCode'){
                    var val =this.inviteType;
                    this.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=4&value='+val
                }else if(type == 'viewAll'){
                    this.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=6&value=';
                }
                this.table.render(this.param);
            },

            getInviteType(){
                var selhtml='';
                return this.$axios.get(config.apiUrl+'/role/admin/invite/inviteConifg.do?id=-1').then((res)=>{
                    if(res.data.status == 0){
                        for(var i=0;i<res.data.data.length;i++){
                            selhtml +=`<option value=${res.data.data[i].id}>${res.data.data[i].note}</option>`;
                        }
                        $('#inviteSearchBox').append(selhtml);
                    }
                })
            },
            prePage(){
                if(this.curPage > 1){
                    this.curPage--;
                    this.pageMark.pop();
                    if(this.curPage ==1){
                        this.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=6&value=';
                        this.table.render(this.param);
                    }else{
                        let create = this.pageMark[this.pageMark.length-1];
                        this.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=6&value='+(create-1);
                        this.table.render(this.param);
                    } 

                    
                }
            },
            nextPage(){
                if(this.lastPageLength >=100){
                    this.pageMark.push(this.pageLastCreate);
                    this.curPage++;
                    this.param.url = config.apiUrl+'/role/admin/user/usersearch.do?type=6&value='+(this.pageLastCreate-1);
                    this.table.render(this.param);
                }
                
            }

          
        }

    }
</script>
<style scoped>
    .page{
        display: inline-block;
        background-color: #4a2359;
        padding: 0px 12px;
        border-radius: 2px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        margin: 0 10px;
    }
    .pageBox {
        color: #fff;
    }
    .pageBox .next,.pageBox .pre{
        cursor: pointer;
    }
    .pageBox .notAllow{
        cursor: not-allowed ;
    }
</style>


