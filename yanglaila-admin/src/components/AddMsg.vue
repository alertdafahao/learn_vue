<template>
    <div class="childrenBody" id="new_add">

		<fieldset class="layui-elem-field">
  <legend> <button class="layui-btn" data-type="getCheckLength">消息推送</button>
    <table class="layui-hide" id="test" ></table>
   </legend>
  <div class="layui-field-box">
	  <div id="info" >
   
    </div>

        <form class="layui-form">
		<div class="layui-form-item">
			<label class="layui-form-label">文章标题</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input newsName" lay-verify="required" placeholder="请输入文章标题">
			</div>
		</div>
		<div class="layui-form-item">
			
			
			<div class="layui-inline">
				<label class="layui-form-label">公告类型</label>
				<div class="layui-input-inline">
					<select name="browseLook" class="newsLook" lay-filter="browseLook">
				        <option value="0">类型一</option>
				        <option value="1">类型二</option>
				    </select>
				</div>
			</div>
			
			<div class="layui-inline">		
				<label class="layui-form-label">发布时间</label>
		<div class="layui-input-inline">
        <input type="text" class="layui-input newsTime" id="test1-1" placeholder="yyyy-MM-dd">
      </div>
			</div>
			<div class="layui-inline">
				
			</div>
		</div>
		
		<div class="layui-form-item ">
			<label class="layui-form-label">文章内容</label>
			<div class="layui-input-block">
				<textarea class="newdata" id="LAY_demo1" style="display: none;" >
					
				</textarea>
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn site-demo-layedit" data-type="content">获取编辑器内容</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
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
	 layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功

  form.render();
  });
   layui.use('layedit', function(){
  var layedit = layui.layedit
  ,$ = layui.jquery;
	layedit.set({
      uploadImage: {
        url: 'http://localhost:8080/static/dist/images/' //接口url
        ,type: 'post' //默认post
      }
  });

  //构建一个默认的编辑器
  var index = layedit.build('LAY_demo1');
  var addNews= new Array(5)

  //编辑器外部操作
  var active = {
      
    content: function(){
    addNews[0] = '{"detail":"'+layedit.getContent(index)+'"';  //文章内容
    addNews[1] = '"taile":"'+$(".newsName").val()+'"';  //文章标题
    addNews[2] = '"newsLook":"'+$(".newsLook option").eq($(".newsLook").val()).text()+'",'; //开放浏览
    addNews[3] = '"type":"'+$(".newsLook").val()+'",';  //文章类型
    addNews[4] = '"date":"'+$(".newsTime").val()+'"}';  //文章日期
    top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:1});
    top.layer.msg("文章添加成功！");
    alert(addNews)
    }
  };
  
  $('.site-demo-layedit').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
  });
});

layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //常规用法
  laydate.render({
    elem: '#test1'
  });

  //国际版
  laydate.render({
    elem: '#test1-1'
    ,lang: 'en'
  });
});
}
}

</script>

<style>
.layui-form{
    margin: 10px;
    /* overflow: hidden; */
   
    padding: 10px;
}

#new_add{
    padding-bottom: 20px;
	width: 1000px;
	margin: auto;
	
}


</style>
