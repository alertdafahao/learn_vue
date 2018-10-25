<template>
    <div id="setting">
        <fieldset class="layui-elem-field">
  <legend style="color:#009688;;font-size: 16px !important;">修改密码</legend>
  <div class="layui-field-box">
      <form class="layui-form" action="" lay-filter="example" style="margin-top:50px;">
  <div class="layui-form-item">
    <label class="layui-form-label">用户名</label>
      <div class="layui-input-inline">
        <input type="text" name="username" lay-verify="username" autocomplete="off" class="layui-input" id="username">
      </div>
  </div>
  <div class="layui-form-item">
   <label class="layui-form-label">密码</label>
      <div class="layui-input-inline">
        <input type="password" name="password" lay-verify="pass" autocomplete="off" class="layui-input" id="demoReload">
      </div>
  </div>

  <div class="layui-form-item">
    <div class="layui-input-block">
      <button class="layui-btn" lay-submit="" lay-filter="demo1" onc>立即提交</button>
    </div>
  </div>
</form>
  </div>
</fieldset>
      
    </div>
</template>

<script>
export default {
        mounted(){
         layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer  
  ,layedit = layui.layedit  
  ,laydate = layui.laydate; 
  //自定义验证规则  
  form.verify({  
          username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }
          }, password: function(value){  
           if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
          }
  });  

  //创建一个编辑器  
  layedit.build('LAY_demo_editor'); 

  //监听提交  
  form.on('submit(demo1)', function(data){  
    layer.alert(JSON.stringify(data.field), {  
      title: '最终的提交信息'  
    })  
    return false;  
  });  

});  
        } 
}
</script>

<style>
#setting{
    margin: 100px auto;
    width: 800px;
}
</style>
