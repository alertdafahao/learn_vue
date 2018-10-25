<template>
    <div id="userDetail">
            <legend class="ce0e f18">{{pageTitle}}</legend>
            <div class="tr">
                <div class="layui-btn-group" >
                    <!-- <button class="layui-btn" @reset = "funBtn('add')" v-if="!showReset">新 增</button> -->
                    <span @click="backTo()" class="backTo">返回 &gt;&gt;</span>
                    <!-- <button >返 回</button> -->
                    <!-- <button class="layui-btn" @click = "funBtn('edit')" v-if="isDis">编辑</button>
                    <button class="layui-btn" v-if="showDel" @click = "funBtn('del')">删除</button> -->
                </div>
            </div> 
            <div class="layui-field-box">
                <div id="editUser">
                    
                    <form class="layui-form userDetail">   
                        <div class="mt10 mb10">
                            <span class="point bg7C37D5"></span><span class="users-title">基本信息</span> 
                        </div>                               
                        <div class="layui-form-item can-edit">
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">用户名</label>
                                <div class="layui-input-block">
                                    <input type="text" name="username" required v-model="username" lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input"  >
                                </div>
                            </div> 
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">手机号</label>
                                <div class="layui-input-block">
                                    <input type="text" name="phonenum" required v-model="phonenum" lay-verify="required" placeholder="请输入手机号" autocomplete="off" class="layui-input" >
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">邀请码</label>
                                <div class="layui-input-block">
                                    <input type="text" name="invitecode" required v-model="invitecode" lay-verify="required" placeholder="请输入邀请码" autocomplete="off" class="layui-input">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <button class="layui-btn layui-btn-sm bg7F3AD2" type="button" @click="saveChange()">保 存</button>
                            </div>
                            <!-- <div class="layui-inline">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-block">
                                    <input type="text" name="userstatu" required v-model="userstatu"  lay-verify="required" placeholder="请输入状态" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div> -->
                            <!-- <div class="layui-inline">
                                <label class="layui-form-label">用户类型</label>
                                <div class="layui-input-block">
                                    <input type="text" name="usertype" required v-model="usertype" lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div> -->
                        </div>
                        <div class="mt50 mb10">
                            <span class="point bg7C37D5"></span><span class="users-title">钱包信息</span> 
                        </div>
                        <div class="layui-form-item cannot-edit">
                            <label class="layui-form-label ce0e">钱包地址</label>
                            <div class="layui-input-block" style="width:485px;">
                                <input type="text" name="ethaddress" required v-model="ethaddress" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                            </div>
                        </div>
                        <div class="layui-form-item cannot-edit">
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">剩余尾款</label>
                                <div class="layui-input-block">
                                    <input type="text" name="remain" required v-model="remain" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div> 
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">赠送余额</label>
                                <div class="layui-input-block">
                                    <input type="text" name="gift" required v-model="gift" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">总充值</label>
                                <div class="layui-input-block">
                                    <input type="text" name="totalIn" required v-model="totalIn" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">总提现</label>
                                <div class="layui-input-block">
                                    <input type="text" name="totalOut" required v-model="totalOut" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">推广收益</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required v-model="hadSeo" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                        </div>
                        <!-- <div class="layui-form-item cannot-edit">
                            <div class="layui-inline">
                                <label class="layui-form-label">分红收益</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required  lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">推广收益</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required v-model="hadSeo" lay-verify="required"  autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                        </div> -->
                        <div class="mt50 mb10">
                            <span class="point bg7C37D5"></span><span class="users-title">游戏信息</span> 
                        </div>
                        <div class="layui-form-item cannot-edit">
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">羊ID</label>
                                <div class="layui-input-block">
                                    <input type="text" name="sheepID" required v-model="sheepID" lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div> 
                            <!-- <div class="layui-inline">
                                <label class="layui-form-label">今日收益</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required v-model="todayprofit" lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div> -->
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">累计收益</label>
                                <div class="layui-input-block">
                                    <input type="text" name="title" required v-model="sheepTotal" lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">饲养数量</label>
                                <div class="layui-input-block">
                                    <input type="text" name="sheepNum" required v-model="sheepNum" lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>    
                        </div>
                        <div class="mt50 mb10">
                            <span class="point bg7C37D5"></span><span class="users-title">团队信息</span> 
                        </div>
                        <div class="layui-form-item cannot-edit">
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">团队收益</label>
                                <div class="layui-input-block">
                                    <input type="text" name="teamprofit" required v-model="teamProfit" lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div> 
                            <div class="layui-inline">
                                <label class="layui-form-label ce0e">团队人数</label>
                                <div class="layui-input-block">
                                    <input type="text" name="teamNum" v-model="teamNum" required  lay-verify="required" placeholder="" autocomplete="off" class="layui-input" :disabled="isDis">
                                </div>
                            </div>  
                        </div>
                        <div class="tc mt50">
                            <!-- <button class="layui-btn " type="button" >确&nbsp;&nbsp;&nbsp;定</button>
                            <button class="layui-btn layui-btn-primary " type="button" >取&nbsp;&nbsp;&nbsp;消</button> -->
                            <button class="layui-btn" lay-submit lay-filter="formDemo" v-show="!isDis">立即提交</button>
                            <button type="reset" class="layui-btn layui-btn-primary" id="resetBtn" @click.native="reset" v-show="showReset">重置</button>
                            
                        </div>
                    </form>
                </div>
            </div>
    </div>
</template>
<script>
    import config from '../assets/config'
    export default {
        data(){
            return {
                pageTitle:'用户详情',
                isDis:true, //输入框是否能编辑
                showDel:false, //是否显示删除按钮
                showReset:false, //显示重置按钮
                userID:'',
                username:'',
                phonenum :'',
                invitecode:'',
                userstatu :'',
                usertype:'',
                ethaddress:'',
                remain :'',
                gift:'',
                totalIn:'',
                totalOut:'',
                sheepID:'',
                todayprofit:'',//今日收益
                sheepNum:'',
                teamProfit :'',
                teamNum :'',
                hadSeo:'',
                sheepTotal:'',
                oldUsername:'',//存储原来的信息
                oldPhonenum:'',//存储原来的信息
                oldInvitecode:'',//存储原来的信息
            }
        },
        created(){
            console.log('created');
        // 初始化页面展示和功能
            let urlParam = this.$route.query
            let type = urlParam.type;
            let id = urlParam.id;
                this.userID = id;
            if(type == 'add'){
                this.pageTitle = "新增用户";
                this.isDis = false;
                this.showReset = true;
                this.showDel = false;
            }else if(id && type == "edit"){
                this.isDis = false;
                this.showDel = true;
                this.pageTitle = "编辑用户"
                this.showReset = false;
            }else if(id && type == "view"){
                this.isDis = true;
                this.showDel = true;
                this.pageTitle = "用户详情"
                this.showReset = false;
            };
           layui.use('form', function(){
                var form = layui.form;
                //监听提交
                form.on('submit(formDemo)', function(data){
                    layer.msg(JSON.stringify(data.field));
                    return false;
                });
            });
            if(id){
                this.getData(id);
            }
            
            
        },
        methods:{
            getData(id){
                var index = layer.load(2,{time: 10*1000});
                this.$axios.get(config.apiUrl+'/role/admin/user/userinfo.do?id='+id).then((res)=>{
                    if(res.data.status == 0){
                        layer.close(index);
                        let data = res.data.data;               
                    //用户信息
                        this.oldUsername = this.username =  data.info.nickName;
                        this.oldPhonenum = this.phonenum =  data.info.phone;
                        this.oldInvitecode = this.invitecode =  data.info.inviteCode;
                        this.userstatu =  data.info.nickName;
                        // this.usertype =  data.info.userTypeStr;
                    // 钱包信息
                        this.ethaddress =  data.info.mac; 
                        this.remain =  data.wallet.remain;
                        this.gift =  data.wallet.gift;
                        this.totalIn =  data.wallet.totalIn;
                        this.totalOut =  data.wallet.totalOut;
                        this.hadSeo = data.wallet.hadSeo;
                    //游戏信息
                        this.sheepID =  data.game.sheepID;
                        this.sheepNum = data.game.hadN;
                        this.sheepTotal = data.earns.sheep;

                    //团队信息
                        this.teamProfit = data.invite.totalIncom;
                        this.teamNum = data.invite.totalNum;
                    }
                })
            },
            saveChange(){
                let urlParam = this.$route.query
                let id = urlParam.id;
                if(this.oldUsername !== this.username){
                    this.changeData(id,1,this.username)//修改用户名
                }
                if(this.oldPhonenum !== this.phonenum){
                    let regx = /^1[35678]\d{9}$/;
                    if(regx.test(this.phonenum)){
                        this.changeData(id,11,this.phonenum)//修改手机号
                    }else{
                        layer.msg('手机号码不正确！')
                    }
                    
                }
                if(this.oldInvitecode !== this.invitecode){
                    let inviteReg = /[^\d]/;
                    if(!inviteReg.test(this.invitecode)){
                        this.changeData(id,4,this.invitecode) //修改邀请码
                    }else{
                        layer.msg('邀请码必须为整数数字！')
                    }
                    
                }
            },
            changeData(id,type,value){
                let that = this;
                this.$axios.get(config.apiUrl +'/role/admin/user/userupdate.do?rid='+id+'&type='+type+'&value='+value).then(res=>{
                    if(res.data.status == 0){
                         layer.msg('修改成功');
                         that.getData(id);
                    }else{
                        layer.msg('修改失败');
                    }
                })
            },
            reset(){
                this.$emit('reset')
                console.log('chufa')
            },
            funBtn(type){
                if(type == "add"){
                   this.isDis = false; 
                   this.showReset = true;
                   this.showDel = false;
                   this.pageTitle = "新增用户";
                   this.reset();
                    // $('#resetBtn').click(function(){
                    //     alert('chongzhi ')
                    // });
                }else if(type == "edit"){
                    this.isDis = false; 
                    this.showReset = false;
                    this.showDel = true;
                    this.pageTitle = "编辑用户"
                }else if(type == "del"){
                     layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
                    //do something,请求接口
                        alert('假装删除')
                        layer.close(index);
                    }); 
                }
            },
            backTo(){
                // this.$router.go(-1);
                this.$router.back(-1);
            }
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
        color: #4a2359;
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
    .backTo{
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .userDetail input {
        border-radius: 5px;
        color: #fff;
    }
    .userDetail .can-edit input {
        background-color: transparent;
        border: 1px solid rgba(90,44,152,.8);
    }
    .userDetail .cannot-edit input{
        background-color: rgb(19,19,23);
        border:none;
    }
    .userDetail .layui-elem-field{
        border-color:rgba(233,233,233,.4)
    }
    .point{
            display: inline-block;
            width:8px;
            height:8px;
            border-radius:50%;
            margin-right:8px;
        }
        .bg7C37D5{
            background-color:#7C37D5;
        }
        .bg3F91DF{
            background-color:#3F91DF;
        }
        .bgCDBF29{
            background-color: #CDBF29;
        }
        .users-title{
            color:rgba(255,255,255,.4);
            font-size: 16px;
        }
        .bg7F3AD2{
            background-color: #7f3ad2;
        }
</style>

