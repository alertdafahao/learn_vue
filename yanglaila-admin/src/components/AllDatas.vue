<template>
        <div class="chartBox">
            <div class="logoNav">
                <div>
                    <img src="../assets/img/logo.png" alt="" class="datalogo">
                </div>
                <div class="f14" style="cursor: pointer;" @click="goBack()">
                    <span style="color:#B3B3B3">返回</span>
                    <span style="color:#fff;">&gt;&gt;</span>
                </div>
                
            </div>
            <div class="charts" id="charts">
                <div id="todayEarn" @click="showBigChart('todayEarn')"></div>
                <div id="todayWithDraw" @click="showBigChart('todayWithDraw')"></div>
                <div id="todayWalletSub" @click="showBigChart('todayWalletSub')"></div>
                <div id="todayWalletTotal" @click="showBigChart('todayWalletTotal')"></div>
                <div id="todayCompanySub"  @click="showBigChart('todayCompanySub')"></div>
                <div id="todayGameSub" @click="showBigChart('todayGameSub')"></div>

                <div id="proTodayEarn" @click="showBigChart('proTodayEarn')"></div>
                <div id="proGameTotal" @click="showBigChart('proGameTotal')"></div>
                <div id="proGameTotalGold" @click="showBigChart('proGameTotalGold')"></div>
                <div id="proGameTotalCash" @click="showBigChart('proGameTotalCash')"></div>

                <div id="todayAddNum" @click="showBigChart('todayAddNum')"></div>
                <div id="todayRaiseNum" @click="showBigChart('todayRaiseNum')"></div>
            </div>
            <div class="chartPop" :class ="{'pop':showBig}">
                <div class="popBox">
                    <div id="bigChartBox" class="bigChartBox">

                    </div>
                    <div class="tc">
                        <button class="close" @click="showBig = !showBig">X</button>
                    </div>
                </div>
                
            </div>
        </div>
</template>
<script>
    import config from '../assets/config'
    import echarts from 'echarts'
    export default {
        data(){
            return {
                showBig:false
            }
        },
        created(){
            // $('.layui-body').css('position','static');
        },
        mounted(){
            this.getWalletData();
            setInterval(this.getWalletData,300000)
            
        },
        methods:{
            getWalletData(){
                this.$axios.get(config.apiUrl+'/role/admin/data/statistics.do').then((res)=>{
                    if(res.status){
                        let data = res.data;
                //资金
                    // 钱包 
                        this.todayEarnArr = data.TA1.map(x=>(x/1000000));//今日入金折线数据
                        this.todayWithDrawArr = data.TA3.map(x=>(x/1000000));//今日提现折线数据
                        this.todayWalletSubArr = data.TA5.map(x=>(x/1000000));//钱包今日沉淀折线数据
                        this.todayWalletTotalArr = data.TA6.map(x=>(x/1000000));//钱包资金总额折线数据
                        this.todayCompanySubArr = data.TA7.map(x=>(x/1000000));//公司今日沉淀折线数据
                        this.todayGameSubArr = data.TA9.map(x=>(x/1000000));//游戏今日沉淀折线数据
                    // 团队 
                        this.proTodayEarnArr = data.TB3;
                        this.proGameTotalArr = data.TB4;
                        this.proGameTotalGoldArr = data.TB5;
                        this.proGameTotalCashArr = data.TB6;
                //用户 
                        this.todayAddNumArr = data.TC1; //今日新增人数折线图
                        this.todayRaiseNumArr = data.TC5; ////今日养羊人数折线图
                //羊
                       
                        // 目前接口暂无羊的折线数据
                        this.gettotalCharts();
                        //  this.getWalletLine('bigChartBox','今日入金',this.todayEarnArr);
                    }
                })
            },
        //绘制小图
            getWalletLine(typebox,title,dataArr,yname){
                // 基于准备好的dom，初始化echarts实例
                let walletLine = echarts.init(document.getElementById(typebox));
                let yAxisName = yname || 'ETH'
                //处理时间小于30天时，表格X轴显示
                let xData = [];
                for(let i=0;i<dataArr.length;i++){
                    xData.push(i+1);
                };
                let that = this;
                // 指定图表的配置项和数据 
                let option = {
                        title:{
                            text:`${title}折线统计图`,
                            textStyle:{
                                color:'#66D5FB',
                                fontSize:'14',
                                fontWeight:'normal',
                                align:'center'
                            },
                            left:'center',
                            top:'top'
                        },
                       tooltip:{
                            trigger :'item',
                            textStyle:{
                                fontSize:10
                            },
                            backgroundColor:'#FF8049',
                             formatter: function(param){
                                 let nowTime = new Date().getTime();
                                 let curTime = nowTime - (xData.length-param.name)*24*60*60*1000;
                                    return '日期：'+that.timestampToDate(curTime) + ' </br> 值：'+param.value;
                                }
                        },
                        markPoint:{
                            symbolSize:10
                        },
                        grid: { 
                            left: '50',                       
                            width:'220'

                        },
                        xAxis: {
                            type: 'category',
                            name:`最近${xData.length}天`,
                            nameTextStyle:{
                                color:'#66D5FB'                                                      
                            },
                            nameLocation:'end',
                            boundaryGap: false,
                            data: xData,                       
                            axisLine:{
                                lineStyle:{
                                    color:'#979797'
                                },
                                symbol:['none', 'arrow'], //是否显示两端箭头
                                symbolSize:[6,6], //箭头大小
                                symbolOffset:[0,8] //箭头偏移量
                            },             
                            axisTick:{
                                inside:true
                            },
                            axisLabel:{                        
                                color:'#66D5FB'
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name:yAxisName,
                            nameTextStyle:{
                                color:'#66D5FB',
                            },
                            nameLocation:'end',
                            boundaryGap: false,
                            splitLine: {
                                show: false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#979797'
                                },
                                symbol:['none', 'arrow'], //是否显示两端箭头
                                symbolSize:[6,6], //箭头大小
                                symbolOffset:[0,8] //箭头偏移量
                            },                      
                            axisTick:{
                                inside:true
                            },
                            axisLabel:{
                                // formatter:function(){
                                //     return; //可以格式化显示数据
                                // },
                                color:'#66D5FB'
                            }
                           
                            
                        },
                        series: [{
                            data: dataArr,
                            type: 'line',                       
                            itemStyle:{
                                color:'#FFE649',
                                borderWidth:1,                                                   
                            },//拐点样式
                            lineStyle:{
                                opacity:0
                            },//折线样式
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 1,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255,255,255,.32)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(74, 189, 209, .32)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                                // color:'rgba(74, 189, 209, .32)'
                            },
                            
                        }]
                    };                 
                // 使用刚指定的配置项和数据显示图表。
                walletLine.setOption(option);           
            },
            gettotalCharts(){
                //默认图
                    this.getWalletLine('todayEarn','今日入金',this.todayEarnArr);
                    this.getWalletLine('todayWithDraw','今日提现',this.todayWithDrawArr);
                    this.getWalletLine('todayWalletSub','钱包今日沉淀',this.todayWalletSubArr);
                    this.getWalletLine('todayWalletTotal','钱包资金总额',this.todayWalletTotalArr);
                    this.getWalletLine('todayCompanySub','公司今日沉淀',this.todayCompanySubArr);
                    this.getWalletLine('todayGameSub','游戏今日沉淀',this.todayGameSubArr);

                    this.getWalletLine('proTodayEarn','当日分红/当日入金',this.proTodayEarnArr,'比例');
                    this.getWalletLine('proGameTotal','当日分红/游戏内总资金',this.proGameTotalArr,'比例');
                    this.getWalletLine('proGameTotalGold','累计分红/游戏累计入金',this.proGameTotalGoldArr,'比例');
                    this.getWalletLine('proGameTotalCash','累计分红/游戏内总资金',this.proGameTotalCashArr,'比例');

                    this.getWalletLine('todayAddNum','今日新增人数',this.todayAddNumArr,'数量');
                    this.getWalletLine('todayRaiseNum','今日养羊人数',this.todayRaiseNumArr,'数量');
            },

        //绘制大图
            getBigChart(typebox,title,dataArr,yname){
                // 基于准备好的dom，初始化echarts实例
                let bigChart = echarts.init(document.getElementById('bigChartBox'));
                let yAxisName = yname || 'ETH'
                //处理时间小于30天时，表格X轴显示
                let xData = [];
                for(let i=0;i<dataArr.length;i++){
                    xData.push(i+1);
                };
                let that = this;
                // 指定图表的配置项和数据 
                let option = {
                        title:{
                            text:`${title}折线统计图`,
                            textStyle:{
                                color:'#66D5FB',
                                fontSize:'18',
                                fontWeight:'normal',
                                align:'center'
                            },
                            left:'center',
                            top:'top'
                        },
                        tooltip:{
                            trigger :'item',
                            backgroundColor:'#FF8049',
                             formatter: function(param){
                                 let nowTime = new Date().getTime();
                                 let curTime = nowTime - (xData.length-param.name)*24*60*60*1000;
                                    return '日期：'+that.timestampToDate(curTime) + ' </br> 值：'+param.value;
                                }
                        },
                        xAxis: {
                            type: 'category',
                            name:`最近${xData.length}天`,
                            nameTextStyle:{
                                color:'#66D5FB',  
                                fontSize:16                                                    
                            },
                            nameLocation:'end',
                            boundaryGap: false,
                            data: xData,                       
                            axisLine:{
                                lineStyle:{
                                    color:'#979797'
                                },
                                symbol:['none', 'arrow'], //是否显示两端箭头
                                symbolSize:[10,10], //箭头大小
                                symbolOffset:[0,8] //箭头偏移量
                            },             
                            axisTick:{
                                inside:true
                            },
                            axisLabel:{
                                color:'#66D5FB',
                                fontSize:14
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name:yAxisName,
                            nameTextStyle:{
                                color:'#66D5FB',
                                fontSize:16
                            },
                            nameLocation:'end',
                            boundaryGap: false,
                            splitLine: {
                                show: false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#979797'
                                },
                                symbol:['none', 'arrow'], //是否显示两端箭头
                                symbolSize:[10,10], //箭头大小
                                symbolOffset:[0,8] //箭头偏移量
                            },                      
                            axisTick:{
                                inside:true
                            },
                            axisLabel:{
                                // formatter:function(){
                                //     return; //可以格式化显示数据
                                // },
                                color:'#66D5FB',
                                fontSize:14
                            }
                           
                            
                        },
                        series: [{
                            data: dataArr,
                            type: 'line',
                            // tooltip:{
                            //     position :top
                            // },//提示框样式
                            itemStyle:{
                                color:'#FFE649',
                                borderWidth:3,                                                   
                            },//拐点样式
                            lineStyle:{
                                opacity:0
                            },//折线样式
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 1,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255,255,255,.32)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(74, 189, 209, .32)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            },
                            
                        }]
                    };                 
                // 使用刚指定的配置项和数据显示图表。
                bigChart.setOption(option); 
            },
            showBigChart(type){
                this.showBig = true;
                let title = '';
                let ytitle;
                switch (type){
                    case 'todayEarn':
                    title = '今日入金';
                    break;                
                    case 'todayWithDraw':
                    title = '今日提现';
                    break;
                    case 'todayWalletSub':
                    title = '钱包今日沉淀';
                    break;
                    case 'todayWalletTotal':
                    title = '钱包资金总额';
                    break;
                    case 'todayCompanySub':
                    title = '公司今日沉淀';
                    break;
                    case 'todayGameSub':
                    title = '游戏今日沉淀';
                    break;
                    case 'proTodayEarn':
                    title = '当日分红/当日入金';
                    ytitle = '比例'
                    break;
                    case 'proGameTotal':
                    title = '当日分红/游戏内总资金';
                    ytitle = '比例'
                    break;
                    case 'proGameTotalGold':
                    title = '累计分红/游戏累计入金';
                    ytitle = '比例'
                    break;
                    case 'proGameTotalCash':
                    title = '累计分红/游戏内总资金';
                    ytitle = '比例'
                    break;
                    case 'todayAddNum':
                    title = '今日新增人数';
                    ytitle = '数量'
                    break;
                    case 'todayRaiseNum':
                    title = '今日养羊人数';
                    ytitle = '数量'
                    break;
                }
                this.getBigChart(type,title,this[type+'Arr'],ytitle);
            },
            goBack(){
                $('.layui-body').css('position','absolute');
                this.$router.go(-1);
            },
             //时间戳转化
            timestampToDate(timestamp) {
                    let date = new Date(timestamp);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = (date.getDate()<10 ? '0'+date.getDate() : date.getDate()) + ' ';
                    return Y+M+D;               
               
            }
        }
    }
</script>
<style scoped>
    .chartBox{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        background-color: #060B13;
        z-index: 199999;
    }
    .chartPop{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        background-color: #000;
        z-index: 19999999;
        display: none;
    }
    .chartPop.pop{
        display: block;
    }
    .popBox{
        position: relative;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .bigChartBox{
        /* width:80%;
        height: 80%; */
        margin:auto;
        width: 1280px;
        height: 600px;
      
    }
    .datalogo{
        width:150px;
        height: 40px;
    }
    .logoNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:15px 25px;
        border-bottom: 1px solid #242424;
    }
    .charts {
        padding: 30px 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .charts > div{
        width:19%;
        height:260px;
        margin-bottom: 20px;
        background-color: rgba(26,35,49,.35);
        padding:10px;
        margin-right: 1.25%;
        box-sizing: border-box;
        cursor: pointer;
    }
    .charts > div:nth-child(5n){
        margin-right: 0;
    }
    .charts > div.active{
        background:linear-gradient(222deg,rgba(21,27,143,.59) 0%,rgba(12,55,123,.59) 100%);
        box-shadow: 5px 5px rgba(26,35,49,.35);
    }
    /* .charts > div >div,.charts div div canvas:hover{
        cursor: pointer;
    } */
    .close{
        width:28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 50%;
        border:1px solid #fff;
        margin-top:60px;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
    }
</style>

