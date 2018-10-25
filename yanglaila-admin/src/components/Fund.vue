<template>
    <div>
        资金的页面
         <!-- <div v-show = "isFund">
            <fieldset class="layui-elem-field layui-field-title data-field">
                <legend class="f16">钱包</legend>
            </fieldset>
            <div class="wallet-box">
                <div class="wallet-type">
                    <div :class = "typeChoosen == '今日入金' ? 'typeActive' : ''">
                        <p><span class="type-title">今日入金</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectWalletType('今日入金')" alt=""></p>
                        <p class="type-data">{{todayEarn | dataFormat}}ETH</p>
                    </div>
                    <div :class = "typeChoosen == '今日提现' ? 'typeActive' : ''">
                        <p><span class="type-title">今日提现</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectWalletType('今日提现')" alt=""></p>
                        <p class="type-data">{{todayWithdraw | dataFormat}}ETH</p>
                    </div>
                    <div :class = "typeChoosen == '钱包今日沉淀' ? 'typeActive' : ''">
                        <p><span class="type-title">钱包今日沉淀</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectWalletType('钱包今日沉淀')" alt=""></p>
                        <p class="type-data">{{walletTodaySub | dataFormat}}ETH</p>
                    </div>
                    <div :class = "typeChoosen == '公司今日沉淀' ? 'typeActive' : ''">
                        <p><span class="type-title">公司今日沉淀</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectWalletType('公司今日沉淀')" alt=""></p>
                        <p class="type-data">{{companyTodaySub | dataFormat}}ETH</p>
                    </div>
                    <div :class = "typeChoosen == '游戏今日沉淀' ? 'typeActive' : ''">
                        <p><span class="type-title">游戏今日沉淀</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectWalletType('游戏今日沉淀')" alt=""></p>
                        <p class="type-data">{{gameTodaySub | dataFormat}}ETH</p>
                    </div>
                    <div style="margin-right:0;">
                        <p><span class="type-title">游戏可转钱包金额</span></p>
                        <p class="type-data">{{gameInWallet | dataFormat}}ETH</p>
                    </div>
                    <div>
                        <p><span class="type-title">累计入金</span></p>
                        <p class="type-data">{{totalEarn | dataFormat}}ETH</p>
                    </div>
                    <div>
                        <p><span class="type-title">累计提现</span></p>
                        <p class="type-data">{{totalWithdraw | dataFormat}}ETH</p>
                    </div>
                    <div :class = "typeChoosen == '钱包资金总额' ? 'typeActive' : ''">
                        <p><span class="type-title">钱包资金总额</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectWalletType('钱包资金总额')" alt=""></p>
                        <p class="type-data">{{walletTotal | dataFormat}}ETH</p>
                    </div>
                    <div>
                        <p><span class="type-title">公司累计沉淀</span></p>
                        <p class="type-data">{{companyTotalSub | dataFormat}}ETH</p>
                    </div>
                    <div>
                        <p><span class="type-title">游戏累计沉淀</span></p>
                        <p class="type-data">{{gameTotalSub | dataFormat}}ETH</p>
                    </div>
                </div>
                <div class="chart-box" id="walletChart">

                </div>
            </div>

            <fieldset class="layui-elem-field layui-field-title data-field">
                <legend class="f16">团队分红</legend>
            </fieldset>
                <div class="wallet-box">
                <div class="wallet-type">
                    <div>
                        <p><span class="type-title">当日分红</span></p>
                        <p class="type-data">{{DayBonus | dataFormat}}ETH</p>
                    </div>
                    <div >
                        <p><span class="type-title">累计分红</span></p>
                        <p class="type-data">{{totalBonus | dataFormat}}ETH</p>
                    </div>                   
                    <div :class = "teamChoosen == '当日分红/当日入金' ? 'typeActive' : ''">
                        <div class="per-box">
                            <div>
                                <span class="up-block">当日分红</span>
                                <span class="down-block">当日入金</span>
                            </div>
                            <div><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectTeamBonusType('当日分红/当日入金')" alt=""></div>
                        </div>
                        <p class="type-data">{{proTodayEarn*100}}%</p>
                    </div>
                    <div :class = "teamChoosen == '当日分红/游戏内总资金' ? 'typeActive' : ''">
                        <div class="per-box">
                            <div>
                                <span class="up-block">当日分红</span>
                                <span class="down-block">游戏内总资金</span>
                            </div>
                            <div><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectTeamBonusType('当日分红/游戏内总资金')" alt=""></div>
                        </div>
                        <p class="type-data">{{proGameTotal*100}}%</p>
                    </div>
                    <div :class = "teamChoosen == '累计分红/游戏累计入金' ? 'typeActive' : ''">
                        <div class="per-box">
                            <div>
                                <span class="up-block">累计分红</span>
                                <span class="down-block">游戏累计入金</span>
                            </div>
                            <div><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectTeamBonusType('累计分红/游戏累计入金')" alt=""></div>
                        </div>
                        <p class="type-data">{{proGameTotalGold*100}}%</p>
                    </div>
                    <div style="margin-right:0;" :class = "teamChoosen == '累计分红/游戏内总资金' ? 'typeActive' : ''">
                        <div class="per-box">
                            <div>
                                <span class="up-block">累计分红</span>
                                <span class="down-block">游戏内总资金</span>
                            </div>
                            <div><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectTeamBonusType('累计分红/游戏内总资金')" alt=""></div>
                        </div>
                        <p class="type-data">{{proGameTotalCash*100}}%</p>
                    </div>
                    
                </div>
                <div class="chart-box" id="teamBonusChart">

                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
  data() {
      return {
                typeChoosen:'今日入金',//钱包选中状态样式
                teamChoosen:'当日分红/当日入金',//团队分红选中状态样式,
           //钱包
                todayEarn:0,//今日入金
                todayWithdraw:0,//今日提现
                walletTodaySub:0,//钱包今日沉淀
                companyTodaySub:0,//公司今日沉淀
                gameTodaySub:0,//游戏今日沉淀
                gameInWallet:0,//游戏可转钱包金额
                totalEarn:0,//累计入金
                totalWithdraw:0,//累计提现
                walletTotal:0,//钱包资金总额
                companyTotalSub:0,//公司累计沉淀
                gameTotalSub:0,//游戏累计沉淀
                todayEarnArr:[],//今日入金折线数据
                //团队分红
                DayBonus:0,
                totalBonus:0,
                proTodayEarn:0, // 当日/当日入金比
                proGameTotal:0, // 今日/游戏内总资金比
                proGameTotalGold:0, // 累计/游戏累计入金
                proGameTotalCash:0, // 累计/游戏内总资金

            //用户相关变量
                todayAddNum:0,//今日新增人数
                todayRechangeNum:0,//今日充值人数
                todayRaiseNum:0, //今日养羊人数
                totalEnrollNum:0, //总注册人数
                totalRechangeNum:0, //总充值人数
                totalRasieNum:0, //总养羊人数
                totalNewInvest:0, //新用户今日投入金额
                totalNewWithdraw:0, //新用户今日提现到钱包
      }
  }
};
</script>
