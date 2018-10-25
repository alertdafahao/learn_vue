<template>
    <div>
        羊的页面
         <!-- <div v-show = "isSheep">
            <div class="wallet-type">
                <div>
                    <p>
                        <span class="type-title">今日被领养数量</span>
                        <span class="sheepTip">
                            <img src="../assets/img/tip.png" class="chart-logo"  alt="">
                            <em class="sheepPop">
                                <div>金额：{{todayAdoptionsSum | dataFormat}} ETH</div>
                                <div>均价：{{todayAdoptionsAverage}} ETH</div>
                            </em>
                        </span>
                    </p>
                    <p class="type-data">{{todayAdoptions}}只</p>
                </div>
                <div>
                    <p>
                        <span class="type-title">今日被卖出数量</span>
                        <span class="sheepTip">
                            <img src="../assets/img/tip.png" class="chart-logo" @click="selectSheepType('口令摇羊数量')" alt="">
                            <em class="sheepPop">
                                <div>金额：{{todaySalesSum | dataFormat}} ETH</div>
                                <div>均价：{{todaySalesAverage | dataFormat}} ETH</div>
                            </em>
                        </span>
                    </p>
                    <p class="type-data">{{todaySales}}只</p>
                </div>
                <div>
                    <p>
                        <span class="type-title">今日跑了数量</span>
                        <span class="sheepTip">
                            <img src="../assets/img/tip.png" class="chart-logo" @click="selectSheepType('口令摇羊数量')" alt="">
                            <em class="sheepPop">
                                <div>金额：{{todayEscapesSum | dataFormat}} ETH</div>
                                <div>均价：{{todayEscapesAverage | dataFormat}} ETH</div>
                            </em>
                        </span>
                    </p>
                    <p class="type-data">{{todayEscapes}}只</p>
                </div>
                <div>
                    <p><span class="type-title">今日羊产生的利息</span></p>
                    <p class="type-data">{{todayInterest | dataFormat}}ETH</p>
                </div>
                <div>
                    <p><span class="type-title">今日待卖数量</span></p>
                    <p class="type-data">{{todayToBeSell}}只</p>
                </div>
                <div  style="margin-right:0;" :class = "sheepChoosen == '口令摇羊数量' ? 'typeActive' : ''">
                    <p><span class="type-title">口令摇羊数量</span><img src="../assets/img/line-chart.png" class="chart-logo" @click="selectSheepType('口令摇羊数量')" alt=""></p>
                    <p class="type-data"> X 只</p>
                </div>
                <div>
                    <p>
                        <span class="type-title">被领养的总数</span>
                        <span class="sheepTip">
                            <img src="../assets/img/tip.png" class="chart-logo" @click="selectSheepType('口令摇羊数量')" alt="">
                            <em class="sheepPop">
                                <div>金额：{{totalAdoptionsSum | dataFormat}} ETH</div>
                                <div>均价：{{totalAdoptionsAverage | dataFormat}} ETH</div>
                            </em>
                        </span>
                    </p>
                    <p class="type-data">{{totalAdoptions}}只</p>
                </div>
                <div>
                    <p>
                        <span class="type-title">累计卖出总数</span>
                        <span class="sheepTip">
                            <img src="../assets/img/tip.png" class="chart-logo" @click="selectSheepType('口令摇羊数量')" alt="">
                            <em class="sheepPop">
                                <div>金额：{{totalSalesSum | dataFormat}} ETH</div>
                                <div>均价：{{totalSalesAverage | dataFormat}} ETH</div>
                            </em>
                        </span>
                    </p>
                    <p class="type-data">{{totalSales}}只</p>
                </div>
                <div>
                    <p>
                        <span class="type-title">跑了总数</span>
                        <span class="sheepTip">
                            <img src="../assets/img/tip.png" class="chart-logo" @click="selectSheepType('口令摇羊数量')" alt="">
                            <em class="sheepPop">
                                <div>金额：{{totalEscapesSum | dataFormat}} ETH</div>
                                <div>均价：{{totalEscapesAverage | dataFormat}} ETH</div>
                            </em>
                        </span>
                    </p>
                    <p class="type-data">{{totalEscapes}}只</p>
                </div>
                <div>
                    <p><span class="type-title">累计羊产生的利息</span></p>
                    <p class="type-data">{{todayInterest | dataFormat}}ETH</p>
                </div>
                <div>
                    <p><span class="type-title">免费摇羊数量</span></p>
                    <p class="type-data"> X 只</p>
                </div>
                
            </div>
            <div class="chart-box" id="sheepChart">

            </div>
        </div> -->
    </div>
</template>
<script>
    export default {

    }
</script>
