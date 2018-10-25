<template>
    <div>
        用户 页面
        <!-- <div v-show = "isUser">
                <div>
                    <div class="wallet-type">
                       <div :class = "userChoosen == '今日新增人数' ? 'typeActive' : ''">
                           <p><span class="type-title">今日新增人数</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectUserType('今日新增人数')" alt=""></p>
                           <p class="type-data">{{todayAddNum}}人</p>
                       </div>
                       <div :class = "userChoosen == '今日充值人数' ? 'typeActive' : ''">
                           <p><span class="type-title">今日充值人数</span>
                           </p>
                           <p class="type-data"> X 人</p>
                       </div>
                       <div :class = "userChoosen == '今日养羊人数' ? 'typeActive' : ''">
                           <p><span class="type-title">今日养羊人数</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectUserType('今日养羊人数')" alt=""></p>
                           <p class="type-data">{{todayRaiseNum}}人</p>
                       </div> 
                       <div>
                           <p><span class="type-title">总注册人数</span></p>
                           <p class="type-data">{{totalEnrollNum}}人</p>
                       </div>
                       <div >
                           <p><span class="type-title">总充值人数</span></p>
                           <p class="type-data"> X 人</p>
                       </div>
                       <div style="margin-right:0;">
                           <p><span class="type-title">总养羊人数</span></p>
                           <p class="type-data">{{totalRasieNum}}人</p>
                       </div>
                       <div>
                           <p><span class="type-title">新用户今日投入金额</span></p>
                           <p class="type-data">{{totalNewInvest | dataFormat}}ETH</p>
                       </div>
                       <div>
                           <p><span class="type-title">新用户今日提现到钱包</span></p>
                           <p class="type-data">{{totalNewWithdraw | dataFormat}}ETH</p>
                       </div>
                      
                   </div>
                   <div class="chart-box" id="UserChart">
                   </div>
                </div>
        </div> -->
    </div>
</template>
<script>
    export default {

    }
</script>
