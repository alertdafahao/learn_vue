<template>
    <div id="sildeBar">
        <div class="layui-side layui-bg-black my-bg-black">
            <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree"  lay-filter="test">
                <li class="layui-nav-item layui-this" v-show="showSlide">
                  <router-link to="/userList"><span class="slideIcon user-icon"></span>用户管理</router-link>
                </li>
                <li class="layui-nav-item" v-show="showSlide">
                  <router-link to="/setList"><span class="slideIcon game-icon"></span>游戏设置</router-link>
                </li>
                <!-- <li class="layui-nav-item">
                <a href="javascript:;">解决方案</a>
                <dl class="layui-nav-child">
                    <dd><a href="javascript:;">列表一</a></dd>
                    <dd><a href="javascript:;">列表二</a></dd>
                    <dd><a href="">超链接</a></dd>
                </dl>
                </li> -->
                <li class="layui-nav-item" v-bind:class="{'layui-this':!showSlide}" v-show="!showSlide && !Slide"><router-link to="/extendList"><span class="slideIcon extend-icon"></span>推广管理</router-link></li>
                <li class="layui-nav-item" v-show="showSlide"><router-link to="/extendList"><span class="slideIcon extend-icon"></span>推广管理</router-link></li>
                <li class="layui-nav-item" v-show="showSlide"><router-link to="/approvalList"><span class="slideIcon appro-icon"></span>审批管理</router-link></li>
                <li class="layui-nav-item" v-bind:class="{'layui-this':Slide}" v-show="Slide || showSlide"><router-link to="/approvalList2"><span class="slideIcon appro_1-icon"></span><span class="relative">提现审批<em class="pendings" v-show="pendings !=0">{{pendings}}</em></span></router-link></li>
                <li class="layui-nav-item" v-show="showSlide"><router-link to="/dataManage"><span class="slideIcon data-icon"></span>数据统计</router-link></li>
                <li class="layui-nav-item" v-show="showSlide"><router-link to="/msg"><span class="slideIcon msg-icon"></span>消息管理</router-link></li>
                <li class="layui-nav-item" v-show="showSlide"><router-link to="/wallet"><span class="slideIcon wallet-icon"></span>钱包管理</router-link></li>
                <li class="layui-nav-item" v-show="showSlide"><router-link to="/setting"><span class="slideIcon stytem-icon"></span>系统设置</router-link></li>
            </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../assets/event';
    export default {
        props:['role','num'],
        data(){
            return {
                showSlide:false,
                Slide:false,
                pendings:0
            }
        },
        created(){
            if(this.role == 1){
                this.showSlide = true;           
            }else if(this.role == 2){         
                this.Slide = true;
            }else{
                this.showSlide = false;
            }
        },
        mounted(){
           layui.use('element',function(){
               var element = layui.element;   //左侧导航栏，点击显示选中状态需要用到
            //    element.init();
           });
            bus.$on('pendNum',(data)=>{
                this.pendings = data;
            })
        },
        watch:{
            role(newval,oldval){
                this.role = newval;
                 if(this.role == 1){
                    this.showSlide = true;
                    this.Slide = false;
                }else if(this.role == 2){
                    this.Slide = true;
                    this.showSlide = false;
                }else{
                    this.showSlide = false;
                    this.Slide = false;
                }
            }    
        }

    }
</script>
<style scoped>
   .pendings{
       position: absolute;
        padding: 0px 5px 0px 4px;
        height: 16px;
        background-color: #ff5722;
        border-radius: 8px;
        top: -1px;
        line-height: 16px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        left: 62px;
   }
    
</style>

