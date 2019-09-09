<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"  :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.list">
                    <el-submenu :index="item.url" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.list">
                            <el-submenu v-if="subItem.list" :index="subItem.url" :key="subItem.index">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.list" :key="i" :index="threeItem.url">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.index">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

        <!-- <el-menu class="sidebar-el-menu" v-if ="menuShow == 1" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in hositems">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu> -->
    </div>
</template>

<script>
import bus from "../common/bus";
import axios from "axios";
export default {
  data() {
    return {
      collapse: false,
      limit: "",
      items:[],
      /*items: [
        {
          icon: "fa fa-home fa-lg",
          index: "home",
          title: "首页"
        },
        {
          icon: "fa fa-hospital-o fa-lg",
          // icon: "el-icon-share",
          index: "3",
          title: "住院管理",
          subs: [
            {
              index: "HospitalizationExamine",
              title: "住院登记"
            },
            {
              index: "examineCancel",
              title: "住院登记撤销"
            },
            {
              index: "HospitalizationInquiry",
              title: "住院明细上传"
            },
            {
              index: "inquiryCancel",
              title: "住院明细清除"
            },
            {
              index: "HospitalizationReexamine",
              title: "出院预结算"
            },
            {
              index: "hosRecord",
              title: "出院结算保存"
            },
            {
              index: "hosrecordCancel",
              title: "住院结算退费"
            },
            {
              index: "hospitalprint",
              title: "出院结算打印"
            }
          ]
        },
        {
          icon: "fa fa-stethoscope fa-lg",
          // icon: "el-icon-service",
          index: "4",
          title: "门诊管理",
          subs: [
            {
              index: "clinicExamine",
              title: "门诊结算保存"
            },
            {
              index: "clinicExamineCancel",
              title: "门诊结算退费"
            },
            {
              index: "clinicInquiry",
              title: "门诊结算打印"
            }
          ]
        }
      ], */

      // 测试目录
     /*  items: [
        {
          icon: "fa fa-hospital-o fa-lg",
          url: "2",
          name: "住院管理",
          list: [
            {
              url: "hosModify",
              name: "住院登记信息修改"
            },
            {
              url: "hosSecond",
              name: "二次住院备案"
            },
            {
              url: "setDeclar",
              name: "住院结算费用申报"
            }
          ]
        },
        {
          icon: "fa fa-cloud-download fa-lg",
          url: "4",
          name: "下载管理",
          list: [
            {
              url: "codeLoad",
              name: "代码表下载"
            },
            {
              url: "diseaseLoad",
              name: "病种信息下载"
            },
            {
              url: "medicalLoad",
              name: "医保药品目录下载"
            },
            {
              url: "treatLoad",
              name: "医保诊疗目录下载"
            },
            {
              url: "serviceLoad",
              name: "医保服务目录下载"
            }
          ]
        },
        {
          icon: "fa fa-print fa-lg",
          url: "6",
          name: "明细打印",
          list: [
            {
              url: "monthPrint",
              name: "医保月度结算打印"
            },
            {
              url: "birthPrint",
              name: "生育月度费用明细打印"
            },
            {
              url: "InsurPayment",
              name: "医疗保险待遇支付明细表"
            },
            {
              url: "Treatment",
              name: "医疗保险待遇汇总表"
            }
          ]
        },
        {
          icon: "fa fa-comment-o fa-lg",
          url: "7",
          name: "信息查询下载",
          list: [
            {
              url: "Announcement",
              name: "通告信息查询"
            },
            {
              url: "registerDown",
              name: "登记信息查询下载"
            },
            {
              url: "fileDown",
              name: "费用明细信息查询下载"
            },
            {
              url: "classDown",
              name: "费用分类信息查询下载"
            },
            {
              url: "SettleDown",
              name: "结算信息查询"
            }
          ]
        },
        {
          icon: "fa fa-list-ul fa-lg",
          url: "8",
          name: "月结对账",
          list: [
            {
              url: "monRecon",
              name: "月结对账"
            },
            {
              url: "Reconprint",
              name: "结算费用对账表打印"
            },
            {
              url: "summaryPrint",
              name: "结算费用汇总表打印"
            }
          ]
        }
      ] */
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    // 获取用户权限菜单
    getMenuList() {
      axios({
        method: "post",
        url: axios.PARK_API + "/sys-mgr/sys/menu/nav",
        params: {},
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.getItem("token")
        }
        /*  data: {
          userName: this.ruleForm.userName
        } */
      })
        .then(res => {
          // console.log(res)
          if (res.data.code == 0) {
            let urlObj = [];
            urlObj = res.data.menuList;
            for (let i = 0; i < urlObj.length; i++) {
              urlObj[i].url = i.toString();
              //to do....
            }
            let home = {
              icon: "fa fa-home fa-lg",
              url: "home",
              name: "首页"
            };
            urlObj.unshift(home);
            this.items = urlObj;
            // console.log(this.items)
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    this.getMenuList();
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  height: 100%;
  /* overflow-y: scroll; */
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
