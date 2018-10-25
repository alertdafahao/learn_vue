
<template>
    <div id="extendPage">
        <div>
            <legend class="cfff f16 mb15">基本信息</legend>
        </div>
        <div class="flex-b">
            <div class="basic-info basic-level">
                <p class="basic-title">账号级别</p>
                <div class="tc">
                    <img :src = levelLogo alt="" v-if="showLevel" style="width:200px;">
                    <p class="ce0e" style="font-weight:bold;font-size:24px;margin-top:60px;" v-else>管 理 员</p>
                </div>
            </div>
            <div class="basic-info">
                <p class="basic-title">团队收益统计</p>
                <div class="flex-b ac">
                    <div id="profitBox" style="width:50%;height:200px;">
                    </div>
                    <div class="profit-info">
                        <p class="f14 ce0e50 mb15"><span class="total-profit-circle"></span> 累计收益</p>
                        <p class="f20 ce0e mb30">{{totalProfit/1000000}}ETH</p>
                        <p class="f14 ce0e50 mb15"><span class="today-profit-circle"></span> 今日收益</p>
                        <p class="f20 ce0e">{{teamProfit/1000000}}ETH</p>
                    </div>
                </div>
            </div>
            <div class="basic-info">
                <p class="basic-title">团队结构</p>
                <div class="flex-b ac">
                    <div id="teamBox" style="width:40%;height:200px;">
                    </div>
                    <div class="f20 ce0e">
                        共{{totalnum}}人
                    </div>
                    <div class="profit-info">
                        <div class="team-stru">

                            <ul>
                                <li class="mb15">
                                    <span class="level-circle bg7C37D5"></span>
                                    <span class="ce0e50 f14">一级:</span>
                                    <span class="f16 ce0e">{{teamData[0].value ? (teamData[0].value+'人') : '暂无'}} </span>
                                </li>
                                <li class="mb15">
                                    <span class="level-circle bg3F91DF"></span>
                                    <span class="ce0e50 f14">二级:</span>
                                    <span class="f16 ce0e">{{teamData[1].value ? (teamData[1].value+'人') :'暂无' }}</span>
                                </li>
                                <li class="mb15">
                                    <span class="level-circle bgCDBF29"></span>
                                    <span class="ce0e50 f14">三级:</span>
                                    <span class="f16 ce0e">{{teamData[2].value? (teamData[2].value+'人') :'暂无' }}</span>
                                </li>
                                <li class="mb15">
                                    <span class="level-circle bg3CBE5D"></span>
                                    <span class="ce0e50 f14">四级:</span>
                                    <span class="f16 ce0e">{{teamData[3].value? (teamData[3].value+'人') :'暂无' }}</span>
                                </li>
                                <li class="mb15">
                                    <span class="level-circle bgBA3939"></span>
                                    <span class="ce0e50 f14">五级及以上:</span>
                                    <span class="f16 ce0e">{{teamData[4].value? (teamData[4].value+'人') :'暂无' }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="cfff f16 team-title">
            团队信息
        </div>
         <div class="mb10 flex-b ac">
            <div class="">
                <label class="cfff f14">手机号:</label>
                <input type="text" class="search-num"  v-model="phoneNum"  placeholder="请输入手机号" autocomplete="off" >
                <button type="button " class="layui-btn layui-btn-sm mr40 bg7F3AD2"  @click="searchBy">
                   搜索
                </button>
                <button class="layui-btn layui-btn-sm bg7F3AD2" @click="viewAll">重 置</button>
            </div>
            <div class="mr40">
                <span class="c7C37D5"><em class="point bg7C37D5"></em>一级</span>
                <span class="c3F91DF"><em class="point bg3F91DF"></em>二级</span>
                <span class="cCDBF29"><em class="point bgCDBF29"></em>三级</span>
                <span class="c3CBE5D"><em class="point bg3CBE5D"></em>四级</span>
                <span class="cBA3939"><em class="point bgBA3939"></em>五级</span>
            </div>
            
        </div>
        <div id="dBody" style="height: 600px;">
            <table class="layui-hidden" id="treeTable" lay-filter="treeTable"></table>
        </div>
        
        <!-- <fieldset class="layui-elem-field layui-field-title mt50">
            <legend class="c009 f16">申请列表</legend>
        </fieldset>
        <table class="layui-hide" id="applyList" lay-filter="applyList"></table>
        <script type="text/html" id="applyBar">
            <a class="layui-btn layui-btn-xs" lay-event="reApply">重新申请</a>
        </script> -->
    </div>
</template>

<script>
    // import d3 from 'd3'
    import echarts from 'echarts'
    import config from '../assets/config'
    export default {
        data(){
            return {
                teamProfit:'',
                teamNum:'',
                totalProfit:'',
                totalnum:'',
                level:'',
                chlidrenNum:[],
                applyParam:null,
                page:0,
                isAdmin:false,
                phoneNum:'',
                treeData: [], //初始加载的团队信息数据
                canAddChild:{},
                canAddMoreChild:{},
                canAddMore:{},
                treeGrid:null,
                ptable:null,
                tableId:'treeTable',//生成树形菜单的元素id
                layer:null,
                param:null,
                curPhoneNum:'',
                canApplyNum:10000, //允许申请的次数
                levelLogo:'',
                showLevel:false,
                teamData : [
                                {name:'一级'},
                                {name:'二级'},                               
                                {name:'三级'},                               
                                {name:'四级'},                               
                                {name:'五级及以上'},                               
                            ]
            }
        },
        mounted(){
        //获取基本信息
            let that =  this;
            this.getTotalData();
            this.param = {
                        _this:this,
                        id:this.tableId
                        ,elem: '#'+this.tableId
                        ,idField:'rid'
                        ,data: this.treeData
                        ,cellMinWidth: 50
                        ,treeId:'rid'//树形id字段名称
                        ,treeUpId:'pid'//树形父id字段名称
                        ,treeShowName:'phone'//以树形式显示的字段
                        ,treeLevel:'phone'
                        ,height:'full'
                        ,isFilter:false
                        ,iconOpen:true//是否显示图标【默认显示】
                        ,isOpenDefault:false//节点默认是展开还是折叠【默认展开】
                        ,cols: [[
                            {type:'numbers',title:'序号'}
                            ,{align:'left',field:'phone',title: '人员名称',width:500,templet:function(d){                              
                                    return `${d.phone}(${d.inviteRecord.totalNum}人)`                                       
                            }}
                            ,{align:'center',field:'seotypeStr', title: '级别'}
                            ,{align:'center', title: '累计团队人数',templet:function(d){
                                return d.inviteRecord.totalNum
                            }}
                            ,{align:'center', title: '累计团队收益(ETH)',templet:function(d){
                                return d.inviteRecord.totalIncom /1000000
                            }}
                            // ,{align:'center', title: '创建时间',templet:function(d){
                            //     return that.timestampToTime(d.create)
                            // }}
                            ,{title: '操作', align:'center'/*toolbar: '#barDemo'*/
                                ,templet: function(d){ 
                                    if(d.top || d.seoType == 5){
                                        return '';
                                    }else if(d.applyType == 0){
                                        //审批中
                                        return `<a class="layui-btn layui-btn-xs applying" lay-event="add" id="btn${d.rid}" disabled = true>审批中</a>`;  
                                    }else if(d.applyType == 1){
                                        //审批通过
                                        return `<a class="layui-btn-normal layui-btn-xs layui-btn" lay-event="add" id="btn${d.rid}" disabled = true>通过</a>`;  
                                    }else{
                                        //未申请或已拒绝
                                        return `<a class="layui-btn layui-btn-xs bg7F3AD2" lay-event="add" id="btn${d.rid}">升级申请</a>`;
                                    }                                 
                                }
                            }
                        ]],
                        page:true           
                        ,onDblClickRow:function (index, o) {
                            console.log(index,o,"双击");
                        },
                    //点击头部文件展开按钮
                        onClickTreeHead:function(index,o){
                            var spread = null;
                            var that = this._this;
                            that.isAdmin ?  (spread = o && o.lay_is_open && !that.canAddChild[o.rid]) : (spread = index >0 && o && o.lay_is_open && !that.canAddChild[o.rid])
                            if(spread){             
                                that.page = 0;      
                                that.$axios.get(config.apiUrl+'/role/admin/advert/userchildren.do?rid='+o.rid+'&level=1&page='+that.page).then((res)=>{
                                    if(res.data.status == 0){
                                        let downData =  res.data.data.data;
                                        let length = downData.length;
                                        for(var i=0;i<downData.length;i++){
                                            // var param = {name:downData[i].name,rid:downData[i].rid,pid:downData[i].pid,phone:downData[i].phone,parName:downData[i].parName,inviteRecord:downData[i].inviteRecord,typeStr:downData[i].typeStr};
                                             var param = downData[i];
                                            if(i == 0 && length >=100){
                                                param.showMore = true;
                                            }
                                            that.add(param,index);
                                        }

                                        that.canAddChild[o.rid] = o.rid; //记录请求过的用户数据
                                    }
                                })    
                            }
                        },
                    //点击同级查看更多按钮
                        onClickNextPage:function(index,o){
                            // var spread = null;
                            // that.isAdmin ?  (spread = o && o.lay_is_open && !that.canAddChild[o.rid]) : (spread = index >0 && o && o.lay_is_open && !that.canAddChild[o.rid])
                             var that = this._this;
                            if(o && !that.canAddMoreChild[o.rid]){             
                                // that.page = 0; 
                                that.canAddMore[o.pid] ? '' : that.page ++;                               
                                that.$axios.get(config.apiUrl+'/role/admin/advert/userchildren.do?rid='+o.pid+'&level=1&page='+that.page).then((res)=>{
                                    if(res.data.status == 0){
                                        let downData =  res.data.data.data;
                                        let length = downData.length;
                                        for(var i=0;i<downData.length;i++){
                                            // var param = {name:downData[i].name,rid:downData[i].rid,pid:downData[i].pid,phone:downData[i].phone,parName:downData[i].parName,inviteRecord:downData[i].inviteRecord,typeStr:downData[i].typeStr};
                                            var param = downData[i];
                                            if(i == 0 && length >=100 && downData[i].inviteRecord.totalNum){
                                                param.showMore = true;
                                            }
                                            that.add(param,index);
                                        }
                                        that.canAddMore[o.pid] = o.pid; //记录同一个pid下，点击子集展开的次数，即为了生成相应的页数
                                        that.canAddMoreChild[o.rid] = o.rid; //记录请求过的用户数据
                                    }
                                })    
                            }
                        }
                        
                    }
        },
        methods:{
        //基本信息的数据
            getTotalData(){
               this.$axios.get(config.apiUrl + '/role/admin/advert/userseo.do').then((res)=>{  
                    if(res.data.status == 0){
                        let data = res.data.data;
                        this.teamProfit = data.situation.todayProfit      
                        this.teamNum = data.situation.todayNum      
                        this.totalProfit = data.situation.profit      
                        this.totalnum = data.situation.totalNum      
                        this.level = data.typeName   
                        this.canApplyNum = res.data.msg;
                    //获取账号级别
                        if(data.cur){
                            if(data.cur.seoType == 5){
                                this.levelLogo = require('../assets/img/levels-chao.png');
                            }else if(data.cur.seoType == 4){
                                this.levelLogo = require('../assets/img/levels-zuan.png');
                            }else if(data.cur.seoType == 3){
                                this.levelLogo = require('../assets/img/levels-huang.png');
                            }else if(data.cur.seoType == 2){
                                this.levelLogo = require('../assets/img/levels-bai.png');
                            }else if(data.cur.seoType == 1){
                                this.levelLogo = require('../assets/img/levels-pu.png');
                            }
                            this.showLevel = true
                        }else{
                            this.showLevel = false;
                        }
                        if(data.childInfo){
                            for(let key in data.childInfo){                    
                                this.chlidrenNum.push(data.childInfo[key].tnum+'人');
                            }       
                        } 

                        //处理五级及以上
                        for(let i=0,j=0;i<this.chlidrenNum.length;i++){
                            if(i>=4){
                                j+= parseInt(this.chlidrenNum[i].substring(0,this.chlidrenNum[i].length-1));
                                if(i == this.chlidrenNum.length-1){
                                    this.teamData[4].value = j;
                                }       
                            }else{
                                this.teamData[i].value = this.chlidrenNum[i].substring(0,this.chlidrenNum[i].length-1)
                            }
                        }
                        
                        this.getdefault(data) 
                        this.getProfitPie(this.totalProfit,this.teamProfit);
                        this.getTeamPie()
                    }
                })
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
        //团队信息的初始数据
            getdefault(data){
                var that = this;
                if(data.cur){
                     var phone = data.cur.phone;
                     that.curPhoneNum = phone;
                     var rid = data.cur.rid;
                     that.isAdmin = false;
                }else{
                    var phone = '';
                     var rid = '';
                    that.isAdmin = true;
                }
                layui.config({
                    base: './static/dist/extend/'
                }).extend({
                    treeGrid:'treeGrid'
                }).use(['treeGrid','layer','table'], function(){
                    that.treeGrid = layui.treeGrid;//很重要
                    var table = layui.table
                    that.layer=layui.layer;
                    that.$axios.get(config.apiUrl+`/role/admin/advert/userchildren.do?phone=${phone}&rid=${rid}&page=${that.page}`).then((res)=>{
                        if(res.data.status == 0){
                            var childNum = that.totalnum;
                            var cur = res.data.data.cur;
                            var child = res.data.data.data;
                            var selfData = {};
                            
                            if(cur){
                                selfData = cur;                        
                                selfData.top = 'top' //只有初始加载时，才添加top                                                                                 
                            }
                            selfData.inviteRecord ={};
                            selfData.inviteRecord.totalIncom = that.totalProfit;
                            selfData.inviteRecord.totalNum = childNum;
                            that.treeData.push(selfData);
                            that.treeData = that.treeData.concat(child);
                           that.param.data = that.treeData;
                           if(that.treeData.length >=101){
                               that.treeData[100].showMore = true;
                           }
                           that.ptable=that.treeGrid.render(that.param);
                        }
                    })

                    that.treeGrid.on('tool(treeTable)', function(obj){                          
                            var data = obj.data; 
                            if(obj.event === 'add'){                              
                                //传父级id
                                if(!($(this).attr('disabled'))){
                                    if(that.canApplyNum <= 0){
                                        layer.msg('申请次数达到上限');
                                        return false;
                                    }
                                    layer.confirm('确定申请升级为”钻石农场主?',{icon: 3, title:'提示'}, function(index){
                                    that.$axios.get(config.apiUrl + '/role/admin/apply/apply.do?rid='+data.rid).then((res)=>{
                                            if(res.data.status == 0){
                                                layer.msg('申请成功')
                                                $('#btn'+data.rid).html('审批中...').css('backgroundColor','#aaa').attr('disabled',true)
                                                that.canApplyNum = res.data.data;
                                                // table.render(that.applyParam); //申请列表数据 
                                            }else{
                                                layer.msg('申请失败')
                                            }
                                        });
                                        
                                    });
                                }              
                            }
                        });

                // 申请列表
                       
                        // that.applyParam = {
                        //     elem: '#applyList'
                        //     ,url:config.apiUrl + '/role/admin/apply/listforuser.do?rid='+rid
                        //     ,cols: [[
                        //     {align:'center',field:'racc', title:'账号'}
                        //     ,{align:'center',field:'rtype', title:'级别', }
                        //     ,{align:'center',field:'rtype', title:'申请级别', }
                        //     ,{align:'center', title:'申请时间',templet:function(d){
                        //         return that.timestampToTime(d.applyTime)
                        //     }}
                        //     ,{align:'center',field:'status', title:'申请状态',}
                        //     ,{align:'center',title:'操作', toolbar: '#applyBar'}
                        //     ]]
                        //     ,page:true
                        //     ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
                        //         return {
                        //             "code": res.status, //解析接口状态
                        //             "msg": res.msg, //解析提示文本
                        //             "count": res.count, //解析数据长度
                        //             "data": res.data //解析数据列表
                        //         };
                        //     }
                        // }
                        // table.render(that.applyParam);  

                    //监听申请列表行工具事件
                        // table.on('tool(applyList)', function(obj){           
                        //     var data = obj.data;
                        //     if(obj.event === 'reApply'){
                        //         layer.confirm('确认重新申请?',{icon: 3, title:'提示'}, function(index){
                        //             that.$axios.get(config.apiUrl + '/role/admin/apply/apply.do?rid='+data.rid).then((res)=>{
                        //                 if(res.data.status == 0){
                        //                     layer.msg('申请成功')
                        //                 }else{
                        //                     layer.msg('申请失败')
                        //                 }
                        //             });    
                        //         });
                        //     }
                        // });         

                });

               
            },
        //手机号搜索
            searchBy(){
                if(this.phoneNum == ""){
                    layer.msg('手机号不能为空！')
                }else if(this.phoneNum == this.curPhoneNum){
                    layer.msg('手机号码为当前登录者号码')
                }else{
                    this.$axios.get(config.apiUrl + `/role/admin/advert/userchildren.do?phone=${this.phoneNum}&rid=&page=0`).then((res)=>{
                        if(res.data.status == 0){
                            var data = res.data.data.data;
                            var cur = res.data.data.cur;                        
                            var curArr= [];                           
                                if(cur){                                      
                                    curArr.push(cur);
                                }                        
                            this.param.data = curArr;
                            this.canAddChild = {};
                            this.canAddMoreChild ={};
                            this.canAddMore ={};
                            this.treeGrid.render(this.param)
                        }
                    })
                }
            },
        //查看团队全部成员
            viewAll(){
                //还原默认图标为收起状态
                if(this.treeData.length >0){
                    for(let i=0 ; i<this.treeData.length;i++){
                        this.treeData[i].lay_is_open = false;
                    }
                }
                this.param.data = this.treeData
                this.canAddChild = {};
                this.canAddMoreChild ={};
                 this.canAddMore ={};
                this.treeGrid.render(this.param);
            },
             //添加
            add(pObj,index) {
                // var param={};
                // param.name=pObj.name;
                // param.rid=pObj.rid;
                // param.pid=pObj.pid;
                // param.phone=pObj.phone;
                // param.inviteRecord=pObj.inviteRecord;
                // param.typeStr=pObj.typeStr;
                // param.showMore = pObj.showMore || null;
                // param.parName = pObj.parName;
                this.treeGrid.addRow(this.tableId,index-0+1,pObj);
            },

        //收益饼图
          getProfitPie(val1,val2){
               // 基于准备好的dom，初始化echarts实例
                let profitPie = echarts.init(document.getElementById('profitBox'));
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     x: 'right',
                    //     data:['累计收益','今日收益']
                    // },
                    series: [
                        {
                            name:'收益统计',
                            type:'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false, //正中间，设置为true，可防止标签重叠
                            color: ['#592E90','#4D80CB'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        // fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:val1/1000000, name:'累计收益'},
                                {value:val2/1000000, name:'今日收益'},                               
                            ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                profitPie.setOption(option); 
            },
        //团队结构图
            getTeamPie(){
                let teamPie = echarts.init(document.getElementById('teamBox'));
                
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     x: 'right',
                    //     data:['累计收益','今日收益']
                    // },
                    series: [
                        {
                            name:'团队结构',
                            type:'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false, //正中间，设置为true，可防止标签重叠
                            color: ['#7C37D5','#3F91DF','#CDBF29','#3CBE5D','#BA3939'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.teamData
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                teamPie.setOption(option); 
            }
        }
    }
</script>
<style scoped>
    .flex{
        display: flex;
    }
    .treeBox{
        border:1px solid #e6e6e6;
        padding:20px  40px;
    }
    .w20{
        width:20%;
    }
    .plr65{
        padding: 0 65px;
    }
</style>

<style scoped>
    .layui-tree.layui-tree-skin-mytree li a i {
        font-size: 0 ;
    }
    .layui-tree.layui-tree-skin-mytree li a {
        display: inline-block;
        vertical-align: top;
        height: 30px;
        cursor: pointer;
    }
    .layui-tree.layui-tree-skin-mytree li a cite {
        font-size: 14px;
        font-style: normal;
        background: #FFB800;
        color: #fff;
        padding: 5px 10px;
        border-radius:3px;
    }
    .layui-tree.layui-tree-skin-mytree li a cite:hover,.layui-tree.layui-tree-skin-mytree li a cite.active{
        background-color:#1E9FFF;
    }
    .layui-show li {
        margin-left:10px;
    }


    .applying{
        background-color:#aaa;
    }


    .node {
            cursor: pointer;
        }
        .node circle {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 1.5px;
        }
        .node text {
            font: 12px sans-serif;
        }
        .tree{
            width: 100%;
            height: 800px;
            margin: 0 auto;
            background: #E0E0E0;
        }
        .link {
            fill: none;
            stroke: #009688;
            stroke-width: 1px;
        }
        .my-body{
            background-color: #060B13;
        }
        .flex-b{
            display: flex;
            justify-content:space-between;
        }
        .ac{
            align-items:center;
        }
        .basic-info{
           width:500px;
            height:280px;
            background:rgba(18,25,35,1);
            border-radius:4px;
        }
        .team-title{
            margin-top:40px;
            margin-bottom:20px;
        }
        .search-num{
            width:196px;
            height:35px;
            border-radius:5px;
            border:1px solid rgba(90,44,152,1);
            background-color:transparent;
            color:#fff;
            padding-left:5px;
            margin-right:10px;
        }
        
        .point{
            display: inline-block;
            width:10px;
            height:10px;
            border-radius:50%;
            margin-left:70px;
            margin-right:5px;
        }
        .level-circle{
            display: inline-block;
            width:8px;
            height:8px;
            border-radius:50%;
            margin-right:5px;
            border:none;
        }
        .bg7C37D5{
            background-color:#7C37D5;
        }
        .bg3F91DF{
            background-color:#3F91DF;
        }
        .bgCDBF29{
            background-color: #CDBF29;
        }
        .bg3CBE5D{
            background-color:#3CBE5D;
        }
        .bgBA3939{
            background-color:#BA3939;
        }

        
        .c7C37D5{
            color:#7C37D5;
        }
        .c3F91DF{
            color:#3F91DF;
        }
        .cCDBF29{
            color: #CDBF29;
        }
        .c3CBE5D{
            color:#3CBE5D;
        }
        .cBA3939{
            color:#BA3939;
        }
        .ce0e{
            color:#e0e0e0;
        }
        .ce0e50{
            color:rgba(224, 224, 224, .5);
        }
        .basic-level{
            background:url('../assets/img/level-bg.png') no-repeat center / 100% 100%;
        }
        .basic-title{
            font-size:20px;
            color:#e0e0e0;
            text-align:center;
            margin-top:24px;
            margin-bottom:20px;
        }
        .total-profit-circle{
            width:10px;
            height: 10px;
            display: inline-block;
            background-color:#592E90;
            border:2px solid #7C37D5; 
            border-radius:50%;
        }   
        .today-profit-circle{
            width:10px;
            height: 10px;
            display: inline-block;
            background-color:#4D80CB;
            border:2px solid #89B8FC; 
            border-radius:50%;
        }
        .profit-info{
            width:40%;
        }
        .team-stru{
            background-image: url('../assets/img/level-line.png');
            margin-top: 10px;
            background-repeat: no-repeat;
            background-position: 0% 63%;
            background-size: 8% 88%;
            padding-left:30px;
        }
</style>


