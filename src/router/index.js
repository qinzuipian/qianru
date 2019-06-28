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
