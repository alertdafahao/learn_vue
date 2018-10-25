import Vue from 'vue'
import Router from 'vue-router'

// import login from '@/components/Login' //用户列表
import userList from '@/components/UserList' //用户列表
import setList from '@/components/SetList' //游戏设置列表
import userDetail from '@/components/UserDetail' //用户详情
import extendList from '@/components/ExtendList' //推广管理
import dataInfo from '@/components/DataInfo'     //数据统计
import msg from '@/components/Message'  // 消息推送
import userSetting from '@/components/UserSetting'  //系统设置
import levelList from '@/components/LevelList' //级别设置
import addMsg from '@/components/AddMsg'   // 添加公告

import noticeDetail from '@/components/NoticeDetail'  // 公告详情
import approvalList from '@/components/ApprovalList'  //参数设置弹窗
import approvalList2 from '@/components/ApprovalList2'  //申请提现
import dataManage from '@/components/DataManage'  //数据管理
import allData from '@/components/AllDatas'  //全部折线
import wallet from '@/components/Wallet'  //钱包管理
//数据统计相关
import fund from '@/components/Fund'  //账户
import user from '@/components/User'  //用户
import sheep from '@/components/Sheep'  //羊





Vue.use(Router)


const router= new Router({
  linkExactActiveClass: 'active',
  base: "/club/",
  routes: [
    // {
    //   path: '*',
    //   redirect:'/userList'
    // },
    {
      path: '/userList',
      name: 'UserList',
      component: userList
    },

    {
      path: '/setList',
      name: 'SetList',
      component: setList
    },

    {
      path: '/userDetail',
      name: 'UserDetail',
      component: userDetail
    },
    {
      path: '/extendList',
      name: 'ExtendList',
      component: extendList
    },
   
    {
      path: '/dataInfo',
      name :'DataInfo',
      component:dataInfo
    },

  
    {
      path: '/msg',
      name: 'Message',
      component: msg
    },
    {
      path: '/setting',
      name: 'setting',
      component: userSetting
    },
    {
      path: '/addMsg',
      name: 'AddMsg',
      component: addMsg
    },
    {
      path: '/levelList',
      name: 'levelList',
      component: levelList
      },
    {
      path:'/noticeDetail',
      name:'NoticeDetail',
      component:noticeDetail
    },
    {
      path:'/approvalList',
      name:'ApprovalList',
      component:approvalList
    },
    {
      path: '/approvalList2',
      name: 'ApprovalList2',
      component: approvalList2
    },
    {
      path: '/allData',
      name: 'AllData',
      components: {
        allCharts:allData
      }
    },
    {
      path: '/dataManage',
      name: 'DataManage',
      component: dataManage,
      children:[
        
        {
          path: 'fund',
          name: 'Fund',
          component: fund
        },
        {
          path: 'user',
          name: 'User',
          component: user
        },
        {
          path: 'sheep',
          name: 'Sheep',
          component: sheep
        },
        {
          path: '',
          name: 'Fund',
          component: fund
        },
      ]
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: wallet
    },
   
  ],

  mode: 'history' //去掉链接中的 #
})
router.beforeEach((to, from, next) => {
  if(to.name == fund){

  }
  next(res=>{
    console.log(res);
  })
  
})
export default router;
