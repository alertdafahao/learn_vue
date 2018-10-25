<template>
  <div id="login">
    
  </div>
</template>

<script>
import config from '../assets/config'
export default {
  props:['toLogin'], //监听登录状态，是否需要登录
  data () {
    return {
      is_login:true,//初始加载，是否需要登录
      cutTime:60,
      role:null, //0是用户，1是管理员
      usermsg:{}     
    }
  },
  
  mounted(){
    console.log('login',this.is_login)
    let that = this;
    layui.use(['form','element'], function(){
      var element = layui.element;   //左侧导航栏，点击显示选中状态需要用到
      var form = layui.form; 
      var layer = layui.layer;

      form.on('submit(login)', function(data){
        that.userLogin(data.field)
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

      $('.getPassWord').click(function(){
        layer.open({
          type:1,
          btn:['确定'],
          title:'设置密码',
          content:`
            <div class="layui-form mt10">
                <div class="layui-form-item">
                    <div class="layui-inline"> 
                        <label class="layui-form-label">手机号</label>
                        <div class="layui-input-block">
                            <input type="text" class="layui-input" placeholder="请输入手机号" id="phonenum">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">验证码</label>
                        <div class="layui-input-block">
                            <input type="text" class="layui-input" placeholder="请输入验证码" id="identify" style="margin-right:15px;width:110px;display:inline-block;">
                            <button class="layui-btn layui-btn-sm layui-btn-normal" id="getCode" type="button">发 送</button>
                        </div>
                        
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">密码</label>
                        <div class="layui-input-block">
                            <input type="password"  id="psd1"  placeholder="请输入密码" autocomplete="off" class="layui-input">
                        </div>
                    </div> 
                </div>
                <div class="layui-form-item mr15">
                    <div class="layui-inline">
                        <label class="layui-form-label">确认密码</label>
                        <div class="layui-input-block">
                            <input type="password"  id="psd2"  placeholder="请再次输入密码" autocomplete="off" class="layui-input">
                        </div>
                    </div> 
                </div>
            </div>
          `,
          success:function(){
           $(document).on('click','#getCode',function(){
             var phone = $('#phonenum').val();
             if(phone == ''){
               layer.msg('手机号不能为空')
               return false;
             }else{
               that.getCode();
             }
             
           })
          },
          yes:function(index){
            var phone = $('#phonenum').val();
            var identify = $('#identify').val();
            var psd1 = $('#psd1').val();
            var psd2 = $('#psd2').val();
            var reg = /^1[35678]\d{9}$/; //加上g全局匹配，会从上一次匹配结束的地方开始
            if(phone=='' || identify=='' || psd1=='' || psd2==''){
              layer.msg('输入框均为必填选项')
              return false;
            }
            if(!(reg.test(phone))){ //reg.test 重复执行时，会接着从下一次结束的地方开始匹配
              layer.msg('手机格式不正确！');
              return false;
            }
            if(psd1 != psd2){
              layer.msg('两次密码输入不一致！')
              return false;
            }
            that.userRegister(phone,identify,psd1,psd2,index);
          }

        })
      })

    });
  },
  watch:{
    toLogin:function(newval,oldval){
      console.log('login',newval)
      if(newval == '退出'){
        console.log('11',newval)
        this.is_login = true;
        // this.toLogin = true;
      }
      // this.toLogin = newval
    }
  },
  
  methods:{
  //用户登录
    userLogin(param){
      this.$axios.get(config.apiUrl + `/role/admin/login/login.do?account=${param.account}&passwd=${param.passwd}`).then((res)=>{
        if(res.data.status == 0){
          layer.msg('登录成功',{icon:6});
          if(res.data.data.type == 1){
            this.role=1;
            this.$router.push({path: '/userList'});
          }else if(res.data.data.type == 0){
            this.role=0;
            this.$router.push({path: '/extendList'});
          }
          config.setCookie('role',this.role,0.5)
          config.setCookie('username',res.data.data.name,0.5)
          config.setCookie('userlevel',res.data.data.seo,0.5)
          this.is_login = false;
          this.usermsg = {'userName':res.data.data.name,'userLevel':res.data.data.seo,'role':this.role};
          this.$emit('userInfo',this.usermsg);
        }else{
          layer.msg(res.data.msg, {icon: 5}); 
        }
      })
    },
  //用户注册
    userRegister(num,code,psd1,psd2,index){
      this.$axios.get(config.apiUrl + `/role/admin/login/forget.do?phone=${num}&code=${code}&passwd=${psd1}&rewrite=${psd2}`).then((res)=>{
        if(res.data.status == 0){
          layer.msg('密码设置成功');
          layer.close(index)
        }else{
          layer.msg(res.data.msg);
        }
      })
    },
  //获取验证码
    getCode(){
      var phone = $('#phonenum').val();
      this.$axios.get(config.apiUrl + '/role/admin/login/verify.do?phone='+phone).then((res)=>{
        if(res.data.status == 0){
          layer.msg('验证码发送成功');
          $('#getCode').attr('disabled',true);
          this.timeCutDown();
        }else{
          layer.msg(res.data.msg)
        }
      })
    },
  //验证码倒计时
    timeCutDown(){
      $('#getCode').css('backgroundColor','#aaa').text(this.cutTime+'s');
      var _this = this;
      var cutDown = setInterval(function () {
          if (_this.cutTime > 1) {
              _this.cutTime--;
              $('#getCode').text(_this.cutTime+'s')
              // this.sendtext = that.cutTime + ' s';
          } else {
              clearInterval(cutDown);
              _this.cutTime = 60;
              $('#getCode').attr('disabled',false).text('发 送').css('backgroundColor','#1E9FFF');
          }
      }, 1000);
    }
  },
}
</script>
<style scoped>
  .login{
    position: fixed;
    z-index: 1989;
    top:0;left: 0;
    bottom:0;right: 0;
    background: #f2f2f2;
  }
  .login .layui-form-label{
    font-size: 16px;
    color: #666;
  }
  .login .layui-elem-field{
    height:80%;
    width: 60%;
    border-color:#ddd;
    margin:50px auto;
  }
  .login .layui-field-box {
    width: 50%;
    margin-left: 50%;
    margin-top: 10%;
    transform: translateX(-50%);
  }
  .login .layui-form-item .layui-input-inline{
    width: 300px;
  }
  .setPsd{
    letter-spacing: 2px;
  }
  .forgetPsd,.setPsd{
    text-decoration: underline;
    color: #1E9FFF;
    /* line-height: 2.3; */
    font-size: 16px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    cursor: pointer;
  }
</style>
