<template>
    <div id="noticeDetail">
        <fieldset class="layui-elem-field">
            <legend class="c009">基本信息</legend>
            <div class="layui-field-box">
                <div id="editUser">
                    <div class="layui-form-item layui-form" lay-filter="test">
                        <div class="layui-inline"   >
                            <label class="layui-form-label">ID</label>
                            <div class="layui-input-block">
                                <input type="text" name="id" required  lay-verify="required" placeholder="id" autocomplete="off" class="layui-input newID">
                            </div>
                        </div> 
                       
                        <div class="layui-inline">
                            <label class="layui-form-label">发布时间</label>
                            <div class="layui-input-block">
                                <input type="text" name="date" required  lay-verify="required" placeholder="发布日期" autocomplete="off" class="layui-input newDate">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">类型</label>
                            <div class="layui-input-block">
                                <input type="text" name="type" required  lay-verify="required" placeholder="类型" autocomplete="off" class="layui-input newType">
                            </div>
                        </div>
                        <br>    
                        <div class="layui-inline">
                            <label class="layui-form-label">标题</label>
                            <div class="layui-input-block">
                                <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input newTiele">
                            </div>
                        </div>
                    </div>
                    <fieldset class="layui-elem-field layui-field-title ">
                        <legend class="c009 f16">公告详情</legend>
                    </fieldset>
                       <div id="test"></div>
                    <div id="test_textarea">
                     
                    </div>

                    
                    <div class="site-demo-button" style="margin-top: 20px;">
                    <button class="layui-btn site-demo-layedit" data-type="content">获取编辑器内容(reserved)</button>
                    <button class="layui-btn site-demo-layedit" data-type="text">获取编辑器纯文本内容(reserved)</button>
                    <button class="layui-btn site-demo-layedit" data-type="selection" id="btn_content">修改内容</button>
                    <button class="layui-btn site-demo-layedit" data-type="tijiao" id="ok">提交</button>
                    </div>
                                    
                </div>
            </div>
           
        </fieldset>
    </div>
</template>


<script>
export default {
    mounted(){

     // 初始化页面展示和功能
    let urlParam = this.$route.query
    let type = urlParam.type;
    let id = urlParam.id;
    var url = 'www.baidu.com?id=' + id
    console.log(url);
     //页面加载   获取全部信息
     

layui.use('layedit', function(){
var layedit = layui.layedit
,$ = layui.jquery;
var data 
    //页面加载   获取全部信息
    $(function(){
    $.ajax({
        type: "GET",//请求方式
        url: "../static/test.json",//地址，就是json文件的请求路径
        dataType: "json",//数据类型可以为 text xml json  script  jsonp
　　　　 success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数

        document.getElementById("test").innerHTML = `
                             <p>${result.data[0].day_turn_to}</p>
                              `
                }
        });
                //表单初始赋值
            layui.use('form',function(){
                var form = layui.form;
                   
                form.val('test', {
                "id": "贤心" // "name": "value"
                ,"date": "123456"
                ,"type": 1
                ,"title": "标题" //复选框选中状态
                ,"close": true //开关状态
                ,"sex": "女"
                ,"desc": "我爱 layui"
                })

                })    
        });
});

function testfunc(){
    var form = layui.form;
    var layedit = layui.layedit;
    var index
    $.ajax({
        type:"GET",
        url: "../static/test.json",
        dataType: "json",
        success: function(result){
            // console.log(result);
        // document.getElementById("test").style.visibility="hidden"; 
        document.getElementById("test").remove('test') 
        document.getElementById("btn_content").style.visibility="hidden";  
        // document.getElementById('ok').style.cssFloat="right"; 
     
        document.getElementById("test_textarea").innerHTML = `
            <textarea id="LAY_demo" class="layui-textarea" >  
                ${result.data[0].day_turn_to}
                        </textarea>
        `;
            index = layedit.build('LAY_demo');
                    
            }
        })
  var addNews= new Array(5)
  //编辑器外部操作
  var active = {
      
    content: function(){
    
    addNews[0] = '{"detail":"'+layedit.getContent(index)+'"';  //文章内容
    addNews[1] = '"taile":"'+$(".newTiele").val()+'"';  //文章标题
    addNews[2] = '"ID":"'+$(".newID").val()+'"';  //文章ID
    addNews[3] = '"type":"'+$(".newType").val()+'",';  //文章类型
    addNews[4] = '"date":"'+$(".newDate").val()+'"}';  //文章日期
    alert(addNews)
    console.log(addNews)
    }
    ,text: function(){
      alert(layedit.getText(index)); //获取编辑器纯文本内容
    }
  };
  
  $('.site-demo-layedit').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
  });

        
}

document.getElementById("btn_content").addEventListener('click',testfunc);
}
}
</script>

<style scoped>
    .mt50{
        margin-top:50px;
    }
    .pt50{
        padding-top:50px;
    }
    .f16{
        font-size: 16px !important;
    }
    .c009{
        color: #009688;
    }
    .tr{
       text-align: right;
    }
    .tc{
        text-align: center;
    }
    .l-space{
        letter-spacing:1em;
    }

    #ok{
        float: right;
    }
    /* label{
        color: #1E9FFF;
    } */

    #test{
        margin:50px;
        line-height: 50px;
    }
</style>

