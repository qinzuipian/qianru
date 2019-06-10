<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"  :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
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
export default {
  data() {
    return {
      collapse: false,
      limit: "",
      /* items: [
        {
          icon: "fa fa-home fa-lg",
          index: "home",
          title: "首页"
        },
        {
          icon: "fa fa-hospital-o fa-lg",
          // icon: "el-icon-share",
          index: "3",
          title: "住院系统",
          subs: [
            {
              index: "HospitalizationExamine",
              title: "住院审核"
            },
            {
              index: "HospitalizationInquiry",
              title: "住院质询"
            },
            {
              index: "HospitalizationReexamine",
              title: "住院复审"
            },
            {
              index: "hosRecord",
              title: "历史记录"
            },
            {
              index: "medicalBook",
              title: "药品说明书"
            }
          ]
        },
        {
          icon: "fa fa-bar-chart fa-lg",
          // icon: "el-icon-document",
          index: "icon",
          title: "住院报表",
          subs: [
            {
              index: "inquiryEnd",
              title: "住院结果分析"
            },
            {
              index: "foultrend",
              title: "违规趋势分析"
            },
            {
              index: "foul",
              title: "违规统计"
            },
            {
              index: "Comprehen",
              title: "综合分析"
            },
            {
              index: "payment",
              title: "扣款通知单"
            },
            {
              index: "medicDos",
              title: "药品用量情况分析"
            }
          ]
        },
        {
          icon: "fa fa-database fa-lg",
          // icon: "el-icon-edit-outline",
          index: "6",
          title: "数据统计",
          subs: [
            {
              index: "datacount",
              title: "诊断方案统计分析"
            }
          ]
        },
        {
          icon: "fa fa-stethoscope fa-lg",
          // icon: "el-icon-service",
          index: "4",
          title: "门诊系统",
          subs: [
            {
              index: "clinicExamine",
              title: "门诊审核"
            },
            {
              index: "clinicInquiry",
              title: "门诊质询"
            },
            {
              index: "clinicReexamine",
              title: "门诊复审"
            },
            {
              index: "hisRecord",
              title: "历史记录"
            }
          ]
        },
        {
          icon: "fa fa-area-chart fa-lg",
          // icon: "el-icon-tickets",
          index: "5",
          title: "门诊报表",
          subs: [
            {
              index: "cliInquiryEnd",
              title: "门诊结果分析"
            },
            {
              index: "cliFoultrend",
              title: "违规趋势分析"
            },
            {
              index: "cliFoul",
              title: "违规统计"
            },
            {
              index: "cliComprehen",
              title: "综合分析"
            }
          ]
        },

         //稽核管理
        {
          icon: "fa fa-hourglass-half fa-lg",
          // icon: "el-icon-view",
          index: "14",
          title: "稽核管理",
          subs: [
            {
              index: "DoubtMonitor",
              title: "问题监控"
            },
            {
              index: "issuelog",
              title: "疑点监控"
            },
            {
              index: "resultRegister",
              title: "结论登记"
            }
          ]
        },

        //诚信管理
        {
          icon: "fa fa-handshake-o fa-lg",
          // icon: "el-icon-view",
          index: "15",
          title: "诚信管理",
          subs: [
            {
              index: "treatGrade",
              title: "医疗机构评分"
            },
            {
              index: "insuredGrade",
              title: "参保人员评分"
            },
            {
              index: "operateGrade",
              title: "职业医师评分"
            }
          ]
        },
        //参合信息
        {
          icon: "fa fa-user-circle-o fa-lg",
          // icon: "el-icon-news",
          index: "7",
          title: "参合信息",
          subs: [
            {
              index: "person",
              title: "参合人员基本信息"
            },
            {
              index: "parSituation",
              title: "参合情况分析"
            }
          ]
        },
        //基金筹资
        {
          icon: "fa fa-yen fa-lg",
          // icon: "el-icon-goods",
          index: "8",
          title: "基金筹资",
          subs: [
            {
              index: "fundUse",
              title: "基金使用情况分析"
            }
          ]
        },
        //按地区补偿
        {
          icon: "fa fa-location-arrow fa-lg",
          // icon: "el-icon-location-outline",
          index: "9",
          title: "地区补偿情况",
          subs: [
            {
              index: "hosCompensation",
              title: "住院补偿情况"
            },
            {
              index: "cliCompensation",
              title: "门诊补偿情况"
            },
            {
              index: "slowCompensation",
              title: "慢病补偿情况"
            }
          ]
        },
        //病种统计
        {
          icon: "fa fa-medkit fa-lg",
          // icon: "el-icon-edit",
          index: "10",
          title: "病种统计",
          subs: [
            {
              index: "diseaseStatic",
              title: "病种统计分析"
            }
          ]
        },
        //按住院补偿
        {
          icon: "fa fa-ambulance fa-lg",
          // icon: "el-icon-star-off",
          index: "11",
          title: "医院补偿情况",
          subs: [
            {
              index: "hosStaitc",
              title: "住院补偿情况"
            },
            {
              index: "cliStatic",
              title: "门诊补偿情况"
            },
            {
              index: "slowStatic",
              title: "慢病补偿情况"
            }
          ]
        },
        //按年度补偿
        {
          icon: "fa fa-calendar fa-lg",
          // icon: "el-icon-date",
          index: "12",
          title: "年度补偿情况",
          subs: [
            {
              index: "hospitalYear",
              title: "住院补偿情况"
            },
            {
              index: "clinicYear",
              title: "门诊补偿情况"
            },
            {
              index: "slowYear",
              title: "慢病补偿情况"
            }
          ]
        },
        //按项目补偿
        {
          icon: "fa fa-folder-open fa-lg",
          // icon: "el-icon-view",
          index: "13",
          title: "项目补偿情况",
          subs: [
            {
              index: "hospitalItem",
              title: "住院补偿情况"
            },
            {
              index: "clinicItem",
              title: "门诊补偿情况"
            },
            {
              index: "slowItem",
              title: "慢病补偿情况"
            }
          ]
        },

       
      ], */
      items: [
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
        }],

    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
      
    }
  },
  methods: {
  
    getSlide() {
      this.limit = localStorage.getItem("limited");
      if (this.limit == "1") {
        this.menuShow = 0;
      } else if (this.limit == "2") {
        this.menuShow = 1;
      }
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    // this.getSlide();
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
