<template>
  <div class="datainfo">
    <div class="layui-tab" >
        <ul class="layui-tab-title tab1">
            <li class="layui-this" id="tab">资金</li>
            <li class="layui-this" id="tab">用户</li>
            <li class="layui-this" id="tab">羊</li>
        </ul>
       
        <div>
            <legend class="cfff f16 mb15" style="font-size: 24px !PingFangSC; margin:30px 20px;">基本信息</legend>
        </div>

        <div class="layui-tab-content">
            <div class="layui-tab-item" style="color:red">
              <ul class="layui-tab-title tab1_1">
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
                  <li class="layui-this" id="tab">网站设置</li>
              </ul>
            </div>
            <div class="layui-tab-item" style="color:red">内容3</div>
            <div class="layui-tab-item" style="color:red">内容4</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){
          layui.use(['form', 'layedit', 'laydate','element','jquery'], function() {
              var element=layui.element,
              $=layui.jquery;
              $(document).on('click','#tab',function(){
              
              });
            
          });
    }

}
</script>

<style>
.tab1{
  background: #505050;
  border-bottom: solid 1px #505050;
  width: 0px;
  
}

.tab1 li{
    width: 120px;
    /* padding-left: 10px; */
    /* border: solid 1px black; */
    border-top-left-radius:18px;
    border-top-right-radius: 18px; 
    background: #505050
}

.tab1_1 li{
  /* border: solid 1px black; */
  margin: 50px 7px;
  float: left;
  width: 220px;
  height: 120px;
  background: #19407E;
}
</style>

