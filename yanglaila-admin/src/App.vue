<template>
  <div id="app" >
    <div class="layui-layout layui-layout-admin">
    <!-- 顶部导航条 -->
        <nav-list v-bind:usermes = 'usermsg' @hadLogin="hadLogin"></nav-list>
    <!-- 侧边导航栏 -->
        <side-bar v-bind:role="role"></side-bar>
        <div class="layui-body my-body">
    <!-- 内容主体区域 -->
         <router-view></router-view>
        </div>
        <router-view name="allCharts"></router-view>
      <!-- 登录页 -->
        <div class="login" v-show="is_login">

            <div class="layui-field-box">
                <form class="layui-form" lay-filter="example">
                  <p class="tc f24" style="margin-bottom:32px;">后台登录</p>
                  <div class="layui-form-item">
                      <div class="layui-input-inline">
                        <input type="text" name="account" lay-verify="required|username" placeholder="手机号"  class="layui-input" id="username">
                      </div>
                  </div>
                  <div class="layui-form-item">
                      <div class="layui-input-inline">
                        <input type="password" name="passwd" lay-verify="required|pass" placeholder="密码" class="layui-input" id="demoReload">  
                      </div>
                  </div>
                  <div style="margin-bottom:35px;text-align:right;">
                    <a class="forgetPsd getPassWord f16" >忘记密码</a>        
                  </div>

                  <div class="layui-form-item">               
                    <div class="layui-input-inline">
                      <button class="layui-btn layui-btn-fluid bg-421 f24" lay-submit="" lay-filter="login" onc>登&nbsp;&nbsp;录</button>
                    </div>
                  </div>
                  <div class="layui-form-item">    
                    <div class="layui-input-inline" style="text-align:center;margin-right:10px;">
                      <a class="setPsd getPassWord" >初次登录点此设置密码</a>    
                    </div>
                  </div>
                </form>
            </div>
        
        </div>
    </div>

  </div>
</template>

<script>
import navList from './components/Nav';
import sideBar from './components/SideBar';
import login from './components/Login';
import config from './assets/config';
import qs from 'qs';
// import navList from './components/Nav';
//  const qs = require('qs');
export default {
  data(){
    return {
      is_login:true,//初始加载，是否需要登录
      cutTime:60,
      role:null, //0是用户，1是管理员 2运营
      usermsg:{},
      toLogin:true // 退出后的是否需要登录的状态  
    }
  },

// 
  beforeMount(){
    if(config.getCookie('role') == 1){
      this.role = 1;
      this.is_login = false;
      this.$router.replace({path: '/userList'});
    }else if(config.getCookie('role') == 0){
      this.role = 0;
      this.is_login = false; //已登录
      this.$router.replace({path: '/extendList'});
    }else if(config.getCookie('role')==2){
    this.role = 2;
    this.is_login = false;
    this.$router.replace({path:'/approvalList2'})
  }else{
      this.is_login = true; //未登录
    };
    let username = config.getCookie('username');
    let userlevel = config.getCookie('userlevel');
    this.usermsg={'userName':username,'userLevel':userlevel,'role':this.role}
  },
  mounted(){
    let that = this;
    layui.use('form', function(){
      // var element = layui.element;   //左侧导航栏，点击显示选中状态需要用到
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
  methods:{
    hadLogin(val){ //接收nav 退出数据的方法
      console.log('app',val)
      this.is_login = val; //true 表示退出，未登录
    },
    getUserInfo(info){
      console.log('info',info)
      this.usermsg = info;
      this.role = info.role;
    },
    //用户登录
    userLogin(param){
      let data = qs.stringify({ 
          account:param.account,
          passwd:param.passwd
      })
      this.$axios.post(config.apiUrl + `/role/admin/login/login.do`,data).then((res)=>{
        if(res.data.status == 0){
          layer.msg('登录成功',{icon:6});
          if(res.data.data.type == 1){
            this.role=1;
            this.$router.push({path: '/userList'});
          }else if(res.data.data.type == 2){
            this.role=2;
            this.$router.push({path: '/approvalList2'});    
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
  watch:{
    is_login:function(newVal,oldVal){
      console.log('is_login',newVal)
      this.is_login = newVal;
    }
  },
  components:{
    navList,
    sideBar,
    login
  }
}
</script>
<style scoped>
  .layui-layout-admin .layui-body {
      padding: 20px;
  }
  .login{
    position: fixed;
    z-index: 1989;
    top:0;left: 0;
    bottom:0;right: 0;
    /* background: #f2f2f2; */
    background:url('./assets/img/login_bg.png') no-repeat center / 100% 100%;
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
   width: 1090px;
    height: 700px;
    margin: auto;
    position: absolute;
    margin-left: -545px;
    margin-top: -350px;
    background: url('./assets/img/login_box.png') no-repeat center;
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 110px;
  }
  .login .layui-form-item .layui-input-inline{
    width: 300px;
  }
  .login .layui-form{
    background-color:#fff;
    padding:20px 26px 60px 36px;
    box-shadow: 0px 16px 31px 6px rgba(39, 39, 39, 0.14);
  }
  .setPsd{
    letter-spacing: 2px;
  }
  .forgetPsd,.setPsd{
    font-size: 16px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    cursor: pointer;
    color: #5b469a;
    font-size: 16px;
    margin-top:-10px;
  }
  .bg-421{
    background-color: #421f84 !important;

  }
</style>


