<template>

    <div id="msg">
      <fieldset class="layui-elem-field layui-field-title">
  <legend style="color:#009688;font-size: 16px !important;">消息管理</legend>
</fieldset>
      <div id="box1">
	
  <div class="layui-inline">
        <input class="layui-input" name="keyword" id="demoReload" autocomplete="off" placeholder="请输入ID">
    </div>
    <button class="layui-btn" id="search" data-type="reload">搜索</button>

    <div class="layui-inline">
          <form class="layui-form" style="float: right;">

     <div class="layui-inline" id="box2" >
      <!-- <label class="layui-form-label"></label>  -->
      <div class="layui-input-inline" >
        <select name="modules" lay-verify="required" lay-search="" class="newsLook">
          <option value="0" >选择类型筛选</option>
          <option value="1">layer</option>
          <option value="2">form</option>
          <option value="3">layim</option>
        </select>
      </div>
          <button class="layui-btn" id="searchType" data-type="reload">搜索</button>
    </div>
    </form>
    </div>
    <div class="layui-inline" id="add">
      <button class="layui-btn search_btn">
        <router-link to="/addMsg"  style="color:white;">  <i class="layui-icon" >&#xe654;添加</i> </router-link>
    
      </button>
		</div>
    </div>
    <hr class="layui-bg-gray" style="margin-bottom:30px;">

      <table class="layui-table" lay-filter="demo" id='demo'>
       
        </table>
        <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">公告详情</a> 
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
        </script>
    </div>
          
</template>
<script>

export default {
        mounted(){
  var that = this;
  layui.use('form', function(){
  var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功

  form.render();
  });
  layui.use('table', function(){
    var table = layui.table;
    table.render({
    elem: '#demo'
    ,url:'../static/user.json'
    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 
    ,cols: [[
      {field:'id',title: 'ID', sort: true}
      ,{field:'title', title: '标题'}
      ,{field:'time',title: '发布时间', sort: true}
      ,{field:'type', title: '类型',edit:Text} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
      ,{field:'right',title:'操作',width:178,align:'center',toolbar:'#barDemo'}
    ]]
    ,id :'testReload',
    
  });
      // ID 搜索
      var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');
            table.reload('testReload', {
                url:'../static/test.json',
                page:{
                  curr:1
                }
                ,where:{
                    id:demoReload.val()
                }
            });
        }
    };

    $('#search').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
});

});
  layui.use('table', function(){
  var table = layui.table;
  //监听表格复选框选择
  table.on('checkbox(demo)', function(obj){
    console.log(obj)
  });

  table.on('tool(demo)', function(obj){
    var data = obj.data;
    
    if(obj.event === 'detail'){
      layer.msg('ID：'+ data.id + ' 的查看操作');
    } else if(obj.event === 'del'){
      layer.confirm('确定要删除么?', {icon: 3, title:'提示'}, function(index){

        console.log(obj.data['id']); //删除的ID
        obj.del();
        layer.close(index);
                       });
    } else if(obj.event == 'edit'){
    
      that.$router.push({path: '/noticeDetail',query:{ id:data['id'],type:'edit'}});  //跳转页面  

    }  


});

      // 类型搜索
     var $ = layui.$, active = {
        reload: function(){
            var demoReload = $(".newsLook option").eq($(".newsLook").val()).text();
          alert(demoReload)
           table.reload('testReload', {
                url:'../static/test.json',
                page:{
                  curr:1
                }
                ,where:{
                    id:demoReload.val()
                  
                }
            });
        }
    };


    $('#searchType').on('click', function(){
    var type = $(this).data('type');
 
    active[type] ? active[type].call(this) : '';
});
   });

        }
    }
   
</script>   








<style>
#msg {
    overflow: hidden;

      
}
.news_search{ margin:0px; }
.layui-table,.layui-table th{ text-align:center; }
.news_list .layui-form-switch{ margin:10px 10px; }

/*分页*/
#page{ text-align:right; }


#box1{
  height: 46px;

  
}

#box2{
  margin-left: 50px;
}
  
#ID{
  margin-left: 20px;
}

#add{
 float:right;
 padding-right: 20px;
}

</style>
