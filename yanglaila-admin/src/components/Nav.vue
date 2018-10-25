<template>
    <div id="nav">
            <div class="layui-header mynav">
                <div class="layui-logo"><img src="../assets/img/logo.png" style="width:66%;"></div>
                <!-- 头部区域（可配合layui已有的水平导航） -->
                <!-- <ul class="layui-nav layui-layout-left">
                <li class="layui-nav-item"><a href="">控制台</a></li>
                <li class="layui-nav-item"><a href="">商品管理</a></li>
                <li class="layui-nav-item"><a href="">用户</a></li>
                <li class="layui-nav-item">
                    <a href="javascript:;">其它系统</a>
                    <dl class="layui-nav-child">
                    <dd><a href="">邮件管理</a></dd>
                    <dd><a href="">消息管理</a></dd>
                    <dd><a href="">授权管理</a></dd>
                    </dl>
                </li> -->
                <!-- </ul> -->
                <ul class="layui-nav layui-layout-right">
                <li class="layui-nav-item">  
                    <a>
                        <span class="mr15">用户名：<b class="cfff">{{usermes.userName}}</b></span>
                        <span v-show = "usermes.userLevel!='undefined' && usermes.userLevel">级别：<b class="cfff">{{usermes.userLevel}}</b></span>
                    </a>     
                </li>
                <li class="layui-nav-item"><a class="logout"  @click="logOut()">退出</a></li>
                </ul>
            </div>
    </div>
</template>
<script>
    import config from '../assets/config'
    export default {
        props:['usermes'],
        data(){
            return {
                hadLogin:false
            }
        },
        mounted(){
        },
        methods:{
            logOut(){
                this.$axios.get(config.apiUrl + '/role/admin/login/logout.do').then((res)=>{
                    if(res.data.status == 0){ 
                        this.hadLogin = true;
                        this.$emit('hadLogin',this.hadLogin);
                        config.clearCookie('role')
                        config.clearCookie('username')
                        config.clearCookie('userlevel')
                        this.$router.push('/')
                    }else{
                        layer.msg(res.data.msg)
                    }
                })
            }    
        },
        // watch:{
        //     usermes:function(newval,old){

        //         console.log(newval.userLevel)
        //         console.log(typeof(newval.userLevel))
        //     }
        // }
    }
</script>
<style scoped>
     .mynav .layui-nav .layui-this:after{
        background-color: transparent;
    } 
    .layui-layout-admin .layui-header.mynav{
        background-color:#060B13;
        border-bottom: 1px solid #242424; 
    }
    .logout{
        width: 48px;
        text-align: center;
        height: 35px;
        border-radius: 6px;
        border: 1px solid rgba(179,179,179,1);
        line-height: 35px;
        cursor: pointer;
    }
</style>

