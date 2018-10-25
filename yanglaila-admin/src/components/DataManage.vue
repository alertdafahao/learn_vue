<template>
    <div id="datas">
        <!-- <div >查看全部折线图</div> -->
        <div class="nav-box">
            <ul class="data-nav">
                <!-- <li :class="{'active':isFund}" @click="navChange(1)">资金</li>
                <li :class="{'active':isUser}" @click="navChange(2)">用户</li>
                <li :class="{'active':isSheep}" @click="navChange(3)">羊</li> -->
                <router-link tag="li" :to="{name: 'Fund'}"> 资金</router-link>
                <router-link tag="li" :to="{name: 'User'}">用户</router-link>
                <router-link tag="li" :to="{name: 'Sheep'}">羊</router-link> 
            </ul>
            <div class="f18 cFF8">
                <router-link to='/allData'>查看全部折线图<img src="../assets/img/all-chart.png" alt="" class="viewAll"></router-link> 
            </div>
        </div>
        
        <div class="data-bg">
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
    import config from '../assets/config'
    import echarts from 'echarts'
    export default {
        data(){
            return {
                isFund:false,
                isUser:false,
                isSheep:false,
                typeChoosen:'今日入金',//钱包选中状态样式
                teamChoosen:'当日分红/当日入金',//团队分红选中状态样式,
                userChoosen:'今日新增人数',//用户选中状态样式
                sheepChoosen:'今日被领养数量', //羊选中状态样式
            //资金相关变量
               
            //羊相关的变量
                todayAdoptions:0,//今日被领养的数量
                todayAdoptionsSum:0,//今日被领养的数量金额
                todayAdoptionsAverage:0,//今日被领养的数量均价
                todaySales:0, //今日被卖出数量
                todaySalesSum:0, //今日被卖出数量金额
                todaySalesAverage:0, //今日被卖出数量均价
                todayEscapes:0, // 今日跑了的数量
                todayEscapesSum:0, // 今日跑了的数量金额
                todayEscapesAverage:0, // 今日跑了的数量均价
                todayInterest:0, //今日产生的利息
                todayToBeSell:0, //今日待卖出数量
                totalAdoptions:0, //被领养的总数
                totalAdoptionsSum:0, //被领养的总数金额
                totalAdoptionsAverage:0, //被领养的总数均价
                totalSales:0, //被卖出去的总数
                totalSalesSum:0, //被卖出去的总数金额
                totalSalesAverage:0, //被卖出去的总数均价
                totalEscapes:0,// 跑了的总数
                totalEscapesSum:0,// 跑了的总数金额
                totalEscapesAverage:0,// 跑了的总数均价
                todayInterest:0, //累计产生的利息
                freeSheeps:0, // 免费摇羊的数量
                codeSheeps:0, //口令摇羊数量


            }
        },
        mounted() {
            this.isFund = true;
            this.getWalletData();
            //十分钟刷新一次数据
            setInterval(this.getWalletData,300000);
            
        },
        methods:{
            navChange(type){
                switch (type) {
                    case 1 :
                    this.isFund = true;
                    this.isUser = false;
                    this.isSheep = false;
                    break;
                    case 2 :
                    this.isFund = false;
                    this.isUser = true;
                    this.isSheep = false;
                    this.getWalletLine('UserChart','今日新增人数',this.todayAddNumArr,'人数');
                    break;
                    case 3 :
                    this.isFund = false;
                    this.isUser = false;
                    this.isSheep = true;
                    break;
                }
            },

            getWalletData(){
                this.$axios.get(config.apiUrl+'/role/admin/data/statistics.do').then((res)=>{
                    if(res.status){
                        let data = res.data;
                //资金
                    // 钱包
                        this.todayEarn = data.A1;
                        this.todayWithdraw = data.A3//今日提现
                        this.walletTodaySub = data.A5//钱包今日沉淀
                        this.companyTodaySub = data.A7//公司今日沉淀
                        this.gameTodaySub = data.A9//游戏今日沉淀
                        this.gameInWallet = data.A11//游戏可转钱包金额
                        this.totalEarn = data.A2//累计入金
                        this.totalWithdraw = data.A4//累计提现
                        this.walletTotal = data.A6//钱包资金总额
                        this.companyTotalSub = data.A8//公司累计沉淀
                        this.gameTotalSub = data.A10//游戏累计沉淀
                        this.todayEarnArr = data.TA1.map(x=>(x/1000000));//今日入金折线数据
                        this.todayWithDrawArr = data.TA3.map(x=>(x/1000000));//今日提现折线数据
                        this.todayWalletSubArr = data.TA5.map(x=>(x/1000000));//钱包今日沉淀折线数据
                        this.todayWalletTotalArr = data.TA6.map(x=>(x/1000000));//钱包资金总额折线数据
                        this.todayCompanySubArr = data.TA7.map(x=>(x/1000000));//公司今日沉淀折线数据
                        this.todayGameSubArr = data.TA9.map(x=>(x/1000000));//游戏今日沉淀折线数据
                    // 团队
                        this.DayBonus = data.B1;
                        this.totalBonus = data.B2;
                        this.proTodayEarn = data.B3;
                        this.proGameTotal = data.B4;
                        this.proGameTotalGold = data.B5;
                        this.proGameTotalCash = data.B6;
                        this.proTodayEarnArr = data.TB3;
                        this.proGameTotalArr = data.TB4;
                        this.proGameTotalGoldArr = data.TB5;
                        this.proGameTotalCashArr = data.TB6;
                //用户
                        this.todayAddNum = data.C1//今日新增人数
                        this.todayRechangeNum = data.C3//今日充值人数
                        this.todayRaiseNum = data.C5 //今日养羊人数
                        this.totalEnrollNum = data.C2 //总注册人数
                        this.totalRechangeNum = data.C4 //总充值人数
                        this.totalRasieNum = data.C6 //总养羊人数
                        this.totalNewInvest = data.C7 //新用户今日投入金额
                        this.totalNewWithdraw = data.C8 //新用户今日提现到钱包
                        this.todayAddNumArr = data.TC1; //今日新增人数折线图
                        this.todayRaiseNumArr = data.TC5; ////今日养羊人数折线图
                //羊
                        this.todayAdoptions = data.D11;//今日被领养的数量
                        this.todayAdoptionsSum = data.D12;//今日被领养的数量金额
                        this.todayAdoptionsAverage = data.D13;//今日被领养的数量均价
                        this.todaySales = data.D31; //今日被卖出数量
                        this.todaySalesSum = data.D32; //今日被卖出数量金额
                        this.todaySalesAverage = data.D33; //今日被卖出数量均价
                        this.todayEscapes = data.D51; // 今日跑了的数量
                        this.todayEscapesSum = data.D52; // 今日跑了的数量
                        this.todayEscapesAverage = data.D53; // 今日跑了的数量
                        this.todayInterest = data.D7; //今日产生的利息
                        this.todayToBeSell = data.D9; //今日待卖出数量
                        this.totalAdoptions = data.D21; //被领养的总数
                        this.totalAdoptionsSum = data.D22; //被领养的总数金额
                        this.totalAdoptionsAverage = data.D23; //被领养的总数均价
                        this.totalSales = data.D41; //被卖出去的总数
                        this.totalSalesSum = data.D42; //被卖出去的总数金额
                        this.totalSalesAverage = data.D43; //被卖出去的总数均价
                        this.totalEscapes = data.D61;// 跑了的总数
                        this.totalEscapesSum = data.D62;// 跑了的总数金额
                        this.totalEscapesAverage = data.D63;// 跑了的总数均价
                        this.todayInterest = data.D8; //累计产生的利息
                        this.freeSheeps = data.D; // 免费摇羊的数量
                        this.codeSheeps = data.D10; //口令摇羊数量    
                        // 目前接口暂无羊的折线数据

                    //默认图和刷新数据时显示当前
                        if(this.isFund){
                            this.selectWalletType(this.typeChoosen);
                            this.selectTeamBonusType(this.teamChoosen);
                        }else if(this.isUser){
                            this.selectUserType(this.userChoosen)
                        }else if(this.isSheep){
                            //暂无数据
                            // this.selectSheepType(this.sheepChoosen)
                        }
                       
                    }
                })
            },
            getWalletLine(typebox,title,dataArr,yname){
                // 基于准备好的dom，初始化echarts实例
                let walletLine = echarts.init(document.getElementById(typebox));
                let yAxisName = yname || 'ETH'
                //处理时间小于30天时，表格X轴显示
                let xData = [];
                for(let i=0;i<dataArr.length;i++){
                    xData.push(i+1);
                }
                // 指定图表的配置项和数据
                let that=this;
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
                                symbolSize:[10,10], //箭头大小
                                symbolOffset:[0,10] //箭头偏移量
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
                        yAxis: {
                            type: 'value',
                            name:yAxisName,
                            nameTextStyle:{
                                color:'#66D5FB',
                                // fontSize:'18'
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
                                symbolOffset:[0,10] //箭头偏移量
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
                            tooltip:{
                                position :'top',
                               
                            },//提示框样式
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
                                // color:'rgba(74, 189, 209, .32)'
                            },
                            
                        }]
                    };                 
                // 使用刚指定的配置项和数据显示图表。
                walletLine.setOption(option); 
            },
            selectWalletType(title){
                this.typeChoosen = title;
                switch (title){
                    case '今日入金':
                    this.getWalletLine('walletChart',title,this.todayEarnArr);
                    break;
                    case '今日提现':
                    this.getWalletLine('walletChart',title,this.todayWithDrawArr);
                    break;
                    case '钱包今日沉淀':
                    this.getWalletLine('walletChart',title,this.todayWalletSubArr);
                    break;
                    case '公司今日沉淀':
                    this.getWalletLine('walletChart',title,this.todayCompanySubArr);
                    break;
                    case '游戏今日沉淀':
                    this.getWalletLine('walletChart',title,this.todayGameSubArr);
                    break;
                    case '钱包资金总额':
                    this.getWalletLine('walletChart',title,this.todayWalletTotalArr);
                    break;
                }  
            },
            selectTeamBonusType(title){
                this.teamChoosen = title;
                switch (title){
                    case '当日分红/当日入金':
                    this.getWalletLine('teamBonusChart',title,this.proTodayEarnArr,'比例');
                    break;
                    case '当日分红/游戏内总资金':
                    this.getWalletLine('teamBonusChart',title,this.proGameTotalArr,'比例');
                    break;
                    case '累计分红/游戏累计入金':
                    this.getWalletLine('teamBonusChart',title,this.proGameTotalGoldArr,'比例');
                    break;
                    case '累计分红/游戏内总资金':
                    this.getWalletLine('teamBonusChart',title,this.proGameTotalCashArr,'比例');
                    break;
                }  
            },
            selectUserType(title){
                this.userChoosen = title;
                switch (title){
                    case '今日新增人数':
                    this.getWalletLine('UserChart',title,this.todayAddNumArr,'数量');
                    break;
                    // case '今日充值人数':
                    // this.getWalletLine('UserChart',title,this.proGameTotalArr);
                    // break;
                    case '今日养羊人数':
                    this.getWalletLine('UserChart',title,this.todayRaiseNumArr,'数量');
                    break;
                }  
            },
            selectSheepType(title){
                this.sheepChoosen = title;
                switch (title){
                    // case '今日被领养数量':
                    // this.getWalletLine('sheepChart',title,this.proTodayEarnArr);
                    // break;
                    // case '今日被卖出数量':
                    // this.getWalletLine('sheepChart',title,this.proGameTotalArr);
                    // break;
                    // case '今日跑了数量':
                    // this.getWalletLine('sheepChart',title,this.proGameTotalGoldArr);
                    // break;
                    // case '口令摇羊数量':
                    // this.getWalletLine('sheepChart',title,this.proGameTotalCashArr);
                    // break;
                }  
            },
        //时间戳转化
            timestampToDate(timestamp) {
                    let date = new Date(timestamp);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = (date.getDate()<10 ? '0'+date.getDate() : date.getDate()) + ' ';
                    return Y+M+D;                     
            },
        },
        filters:{
            dataFormat(data){
                return (data/1000000).toFixed(4);
            }
        }
    }
</script>
<style>
    .nav-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cFF8,.cFF8 a{
        color:#FF8049;
    }
    .viewAll{
        width: 18px;
        height: 18px;
        margin-left:5px;
        margin-right: 10px;
        vertical-align: text-top;
    }
    .data-field{
        border-color:#979797;
    }
    .data-field legend{
        font-size: 16px;
        color: #fff;
        margin-left: 0;
    }
    .data-nav {
        display: flex;
        justify-content: flex-start;
        font-size: 16px;
    }
    .data-nav li{
        background-color: rgba(80,80,80,.35);
        color:#e0e0e0;
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
        height: 35px;
        width: 90px;
        margin-right: 1px;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
    }
    .data-nav .active{
        background-color: #5A2C98;
        color:#fff;
    }
    .data-bg {
        padding:35px;
        background-color: rgba(26,35,49,.35);
    }
    .wallet-type {
        /* overflow: hidden; */
        display: flex;
        flex-wrap: wrap;
    }
    .wallet-type>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        text-align: center;
        width: 240px;
        height: 120px;
        background: rgba(25,64,126,.3684);
        border-radius: 7px;
        border: 1px solid rgba(255,255,255,.3684);
        /* margin-right: 30px; */
        margin: 15px 30px 15px 0px;
        box-sizing: border-box;
    }
    .wallet-type .type-title{
        font-size: 16px;
        color:RGBA(102, 213, 251, 1);
        margin:10px 0;
    }
    .chart-logo{
        width:18px;
        height: 18px;
        margin-left: 5px;
        vertical-align: text-bottom;
        cursor: pointer;
    }
    .wallet-type .type-data{
        margin-top:10px;
        font-size: 24px;
        color:rgba(232,32,32,1);
    }
    .chart-box{
        width:1200px;
        height: 550px;
        margin:20px auto;
    }
    .wallet-type .typeActive{
        background:linear-gradient(180deg,rgba(21,80,143,1) 0%,rgba(12,42,89,1) 100%);
    }
    .per-box{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
    .up-block{
        padding: 1px 0;
        display: block;
        color:#66D5FB;
    }
    .down-block{
        display: block;
        border-top: 1px solid #66D5FB;
        padding: 1px 5px;
        color:#66D5FB
    }
    .sheepTip{
        position: relative;
    }
    .sheepPop{
        font-style: normal;
        text-align: left;
        position: absolute;
        top:-4px;
        left:35px;
        background: #fff;
        border-radius: 3px;
        font-size: 14px;
        color:#373737;
        z-index: 10;
        padding:5px 10px;
        white-space: nowrap;
        display: none;
    }
    .sheepPop::after{
        position: absolute;
        content: '';
        display: block;
        width:0;
        height: 0;
        border-top:5px solid transparent;
        border-bottom:5px solid transparent;
        border-right:5px solid #fff;
        border-left:5px solid transparent;
        top:5px;
        left:-9px;
    }
    .sheepTip:hover .sheepPop{
        display: block;
    }

</style>

