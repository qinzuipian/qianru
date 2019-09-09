import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                //首页
                {
                    path: '/home',
                    component: resolve => require(['../components/page/home/home.vue'], resolve),
                    meta: { title: '首页' }
                },
                //系统管理
                /* {
                    path: '/Adminsystem',
                    component: resolve => require(['../components/page/system/Adminsystem.vue'], resolve),
                    meta: { title: '管理员管理' }
                },
                {
                    path: '/meunSystem',
                    component: resolve => require(['../components/page/system/meunSystem.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/roleSystem',
                    component: resolve => require(['../components/page/system/roleSystem.vue'], resolve),
                    meta: { title: '角色管理' }
                }, */
                //住院系统
                {
                    path: '/HospitalizationExamine',
                    component: resolve => require(['../components/page/Hospitalization/examine.vue'], resolve),
                    meta: { title: '住院登记' }
                },
                {
                    path: '/examineCancel',
                    component: resolve => require(['../components/page/Hospitalization/examineCancel.vue'], resolve),
                    meta: { title: '住院登记撤销' }
                },
                {
                    path: '/HospitalizationInquiry',
                    component: resolve => require(['../components/page/Hospitalization/inquiry.vue'], resolve),
                    meta: { title: '住院明细上传' }
                },
                {
                    path: '/inquiryCancel',
                    component: resolve => require(['../components/page/Hospitalization/inquiryCancel.vue'], resolve),
                    meta: { title: '住院明细清除' }
                },
                {
                    path: '/HospitalizationReexamine',
                    component: resolve => require(['../components/page/Hospitalization/reexamine.vue'], resolve),
                    meta: { title: '出院预结算' }
                },
                {
                    path: '/hosRecord',
                    component: resolve => require(['../components/page/Hospitalization/hosRecord.vue'], resolve),
                    meta: { title: '出院结算保存' }
                },
                {
                    path: '/hosrecordCancel',
                    component: resolve => require(['../components/page/Hospitalization/hosrecordCancel.vue'], resolve),
                    meta: { title: '住院结算退费' }
                },
                {
                    path:'/hospitalprint',
                    component: resolve => require(['../components/page/Hospitalization/hospitalprint.vue'], resolve),
                    meta: { title: '出院结算打印' }
                },
                {
                    path:'/hosModify',
                    component: resolve => require(['../components/page/Hospitalization/hosModify.vue'], resolve),
                    meta: { title: '住院登记信息修改' }
                },
                {
                    path:'/hosSecond',
                    component: resolve => require(['../components/page/Hospitalization/hosSecond.vue'], resolve),
                    meta: { title: '二次住院备案' }
                },
                {
                    path:'/setDeclar',
                    component: resolve => require(['../components/page/Hospitalization/setDeclar.vue'], resolve),
                    meta: { title: '住院结算费用申报' }
                },

                //门诊系统
                {
                    path: '/clinicExamine',
                    component: resolve => require(['../components/page/clinic/examine.vue'], resolve),
                    meta: { title: '门诊结算保存' }
                },
                {
                    path: '/clinicExamineCancel',
                    component: resolve => require(['../components/page/clinic/examineCancel.vue'], resolve),
                    meta: { title: '门诊结算退费' }
                },
                {
                    path: '/clinicInquiry',
                    component: resolve => require(['../components/page/clinic/inquiry.vue'], resolve),
                    meta: { title: '门诊结算打印' }
                },

                // 目录管理
                {
                    path: '/medicalMenu',
                    component: resolve => require(['../components/page/menuList/medicalMenu.vue'], resolve),
                    meta: { title: '药品目录对应'}
                },
                {
                    path: '/treatMenu',
                    component: resolve => require(['../components/page/menuList/treatMenu.vue'], resolve),
                    meta: { title: '诊疗目录对应' }
                },
                {
                    path: '/serviceMenu',
                    component: resolve => require(['../components/page/menuList/serviceMenu.vue'], resolve),
                    meta: { title: '服务目录保存' }
                },
                {
                    path: '/menuUpload',
                    component: resolve => require(['../components/page/menuList/menuUpload.vue'], resolve),
                    meta: { title: '目录对应上传' }
                },
                {
                    path: '/menuDownload',
                    component: resolve => require(['../components/page/menuList/menuDownload.vue'], resolve),
                    meta: { title: '医疗机构目录上传' }
                },
                {
                    path: '/menuXiazai',
                    component: resolve => require(['../components/page/menuList/menuXiazai.vue'], resolve),
                    meta: { title: '目录对应结果下载' }
                },
                {
                    path: '/menuQuxiao',
                    component: resolve => require(['../components/page/menuList/menuQuxiao.vue'], resolve),
                    meta: { title: '目录对应取消' }
                },

                // 下载管理
                {
                    path: '/codeLoad',
                    component: resolve => require(['../components/page/downLoad/codeLoad.vue'], resolve),
                    meta: { title: '代码表下载' }
                },
                {
                    path: '/diseaseLoad',
                    component: resolve => require(['../components/page/downLoad/diseaseLoad.vue'], resolve),
                    meta: { title: '病种信息下载' }
                },
                {
                    path: '/medicalLoad',
                    component: resolve => require(['../components/page/downLoad/medicalLoad.vue'], resolve),
                    meta: { title: '医保药品目录下载' }
                },
                {
                    path: '/treatLoad',
                    component: resolve => require(['../components/page/downLoad/treatLoad.vue'], resolve),
                    meta: { title: '医保诊疗目录下载' }
                },
                {
                    path: '/serviceLoad',
                    component: resolve => require(['../components/page/downLoad/serviceLoad.vue'], resolve),
                    meta: { title: '医保服务目录下载' }
                },
                {
                    path: '/peopleIc',
                    component: resolve => require(['../components/page/ICcard/peopleIc.vue'], resolve),
                    meta: { title: '个人信息操作' }
                },
                {
                    path: '/passwordIc',
                    component: resolve => require(['../components/page/ICcard/passwordIc.vue'], resolve),
                    meta: { title: 'IC卡密码修改' }
                },
                  // 打印管理
              /*   {
                    path: '/statePrint',
                    component: resolve => require(['../components/page/detailPrint/statePrint.vue'], resolve),
                    meta: { title: '结算单打印' }
                }, */
                {
                    path: '/Reconprint',
                    component: resolve => require(['../components/page/detailPrint/Reconprint.vue'], resolve),
                    meta: { title: '结算费用对账表打印' }
                },
              
                {
                    path: '/summaryPrint',
                    component: resolve => require(['../components/page/detailPrint/summaryPrint.vue'], resolve),
                    meta: { title: '结算费用汇总表打印' }
                },
              
                {
                    path: '/monthPrint',
                    component: resolve => require(['../components/page/detailPrint/monthPrint.vue'], resolve),
                    meta: { title: '医保月度结算打印' }
                },
                {
                    path: '/birthPrint',
                    component: resolve => require(['../components/page/detailPrint/birthPrint.vue'], resolve),
                    meta: { title: '生育月度费用明细汇总打印' }
                },
                // 信息查询打印
                {
                    path: '/monRecon',
                    component: resolve => require(['../components/page/message/monRecon.vue'], resolve),
                    meta: { title: '月结对账' }
                },
                {
                    path: '/Announcement',
                    component: resolve => require(['../components/page/message/Announcement.vue'], resolve),
                    meta: { title: '通告信息查询' }
                },
                {
                    path: '/registerDown',
                    component: resolve => require(['../components/page/message/registerDown.vue'], resolve),
                    meta: { title: '登记信息查询下载' }
                },
                
                {
                    path: '/fileDown',
                    component: resolve => require(['../components/page/message/fileDown.vue'], resolve),
                    meta: { title: '费用明细信息查询下载' }
                },
                {
                    path: '/classDown',
                    component: resolve => require(['../components/page/message/classDown.vue'], resolve),
                    meta: { title: '费用分类信息查询下载' }
                },
                {
                    path: '/SettleDown',
                    component: resolve => require(['../components/page/message/SettleDown.vue'], resolve),
                    meta: { title: '结算信息查询' }
                },
                {
                    path: '/InsurPayment',
                    component: resolve => require(['../components/page/message/InsurPayment.vue'], resolve),
                    meta: { title: '医疗保险待遇支付明细表' }
                },
                {
                    path: '/Treatment',
                    component: resolve => require(['../components/page/message/Treatment.vue'], resolve),
                    meta: { title: '医疗保险待遇汇总表' }
                },
                
              


               
                //修改密码
                {
                    path: '/password',
                    component: resolve => require(['../components/page/user/password.vue'], resolve),
                    meta: { title: '修改密码' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/user/Login.vue'], resolve)
        },
        /* {
            path: '/hoslogin',
            component: resolve => require(['../components/page/user/hosLogin.vue'], resolve)
        } */

    ]
})
