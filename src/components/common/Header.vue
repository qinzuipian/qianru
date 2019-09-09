<template>
    <div class="header">
       
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">嵌入式医保系统</div>
        <div class="header-right">
            <div class="header-user-con">
               <!-- 医保IC卡下拉菜单 -->
                <div class="user-avator"><i class="el-icon-postcard"></i></div>
                <el-dropdown class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        医保IC卡<i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">          
                        <el-dropdown-item @click.native="peopleSearch">个人信息操作</el-dropdown-item>
                        <el-dropdown-item  @click.native="passReform">IC卡密码修改</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                 <!-- 初始化医保页面 -->
                <div class="collapse-btn" @click="pageInit">
                     <el-button type="success" class="el-icon-s-help" plain>嵌入式医保初始化</el-button>
                </div>
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.png"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">          
                        <el-dropdown-item @click.native="password">修改密码</el-dropdown-item>
                        <el-dropdown-item  @click.native="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from "../common/bus";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      collapse: true,
      fullscreen: false,
      name: "管理员",
      message: 2,
      limit: localStorage.getItem("limited")
    };
  },
  computed: {
    username() {
      // let username = localStorage.getItem("ms_username");
      let username = localStorage.getItem("hosName");
      return this.limit == "2" ? username : this.name;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    /*    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    }, */
    //页面初始化
    pageInit() {
      var requestId = "000";
      var akb020 = localStorage.getItem("akb020");
      var bkb026 = localStorage.getItem("bkb026");
      var aab034 = localStorage.getItem("aab034");
      var uscode = localStorage.getItem("uscode");
      var usname = localStorage.getItem("usname");
      var s_ini =
        '<?xml version="1.0" encoding="utf-8"?>\n' +
        "\n" +
        "<transferinfo>\n" +
        "  <headinfo>\n" +
        "    <REQUESTID>" +
        requestId +
        "</REQUESTID>\n" +
        "    <AKB020>" +
        akb020 +
        "</AKB020>\n" +
        "    <AAB034>" +
        aab034 +
        "</AAB034>\n" +
        "    <BKB026>" +
        bkb026 +
        "</BKB026>\n" +
        "    <USCODE>" +
        uscode +
        "</USCODE>\n" +
        "    <USNAME>" +
        usname +
        "</USNAME>\n" +
        "    <DATACOUNT>0</DATACOUNT>\n" +
        "    <ROWCOUNT1>0</ROWCOUNT1>\n" +
        "    <ROWCOUNT2>0</ROWCOUNT2>\n" +
        "    <ROWCOUNT3>0</ROWCOUNT3>\n" +
        "    <ROWCOUNT4>0</ROWCOUNT4>\n" +
        "    <ERRCODE>0</ERRCODE>\n" +
        "    <ERRMSG></ERRMSG>\n" +
        "  </headinfo> 　　\n" +
        "</transferinfo>";
      if (s_ini == null || s_ini == "") {
        this.$message.warning("请求信息不能为空");
        // alert("请求信息不能为空");
      } else {
        // alert("初始化成功")
        // var dll = new ActiveXObject("pansky.medicareinterface");
        // var state = dll.medicareinterfaceinit(s);
        console.log(s_ini);
        var state = WSCall.init(s_ini);
        console.log(state);
        if (state == 1) {
          this.$message.success("初始化成功");
          // alert("初始化成功");
        } else {
          this.$message.error("初始化失败");
          // alert("初始化成功");
        }
      }
    },
    loginOut() {
      axios({
        method: "post",
        url: axios.PARK_API + "/sys-mgr/sys/logout",
        /*  params: {
           token: localStorage.getItem("token")
        }, */
        /*  data: qs.stringify({
          token: localStorage.getItem("token")
        }), */
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            localStorage.removeItem("token");
            localStorage.removeItem("akb020");
            localStorage.removeItem("bkb026");
            localStorage.removeItem("aab034");
            localStorage.removeItem("uscode");
            localStorage.removeItem("usname");
            // localStorage.removeItem("navList");
            // localStorage.removeItem("limited");
            this.$router.push({ path: "/login" });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error('请检查网络');
        });
    },
    //跳转至修改密码页面
    password() {
      this.$router.push({ path: "/password" });
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },

    // 医保IC卡操作
    //   个人信息查询
    peopleSearch() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          requestId: "001",
          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hospitalDown(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    //医保IC卡密码修改
    passReform() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          requestId: "003",
          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hospitalDown(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        /* var state = 1;
        if (state == 1) {
          var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?><transferinfo>"+
          "  <headinfo>"+
          "    <REQUESTID>001</REQUESTID>"+
          "    <AKB020>SLYY0001</AKB020>"+
          "    <AAB034>61100001</AAB034>"+
          "    <BKB026>888888</BKB026>"+
          "    <USCODE>管理员</USCODE>"+
          "    <USNAME>管理员</USNAME>"+
          "    <DATACOUNT>1</DATACOUNT>"+
          "    <ROWCOUNT1>1</ROWCOUNT1>"+
          "    <ROWCOUNT2>0</ROWCOUNT2>"+
          "    <ROWCOUNT3>0</ROWCOUNT3>"+
          "    <ROWCOUNT4>0</ROWCOUNT4>"+
          "    <ERRCODE>1</ERRCODE>"+
          "    <ERRMSG></ERRMSG>"+
          "  </headinfo>"+
          "  <datas>"+
          "    <data1>"+
          "      <row>"+
          "        <AAC001>100000363505</AAC001>"+
          "        <AAB034>61100001</AAB034>"+
          "        <BAA001>61100024</BAA001>"+
          "        <AAB001>11000004170</AAB001>"+
          "        <AAB004>山阳县政策破产企业退休人员__酒厂</AAB004>"+
          "        <AAC002>612525195112090155</AAC002>"+
          "        <AAC003>詹凯朝</AAC003>"+
          "        <AAC004>1</AAC004>"+
          "        <AAC005>01</AAC005>"+
          "        <AAC006>1951-12-09</AAC006>"+
          "        <AKC020>sn170879636</AKC020>"+
          "        <AKC021>21</AKC021>"+
          "        <AKC401>1</AKC401>"+
          "        <BAC515>1</BAC515>"+
          "        <AAC008>2</AAC008>"+
          "        <BKC276>722.21</BKC276>"+
          "        <BKC255>null</BKC255>"+
          "        <BKC258>null</BKC258>"+
          "        <BKC058>null</BKC058>"+
          "        <BKA249>null</BKA249>"+
          "        <BKC299>0.00</BKC299>"+
          "        <BKC300>0.00</BKC300>"+
          "        <BKC240>0.00</BKC240>"+
          "        <AAE140>3</AAE140>"+
          "      </row>"+
          "    </data1>"+
          "  </datas>"+
          "</transferinfo>" */

        /*   var wordsContent = encodeURIComponent(res);
            // 将下载下来的数据保存到数据库
            axios({
              method: "post",
              url: axios.PARK_API + "/medical_reimbursement/personinfo/savePerInfo",
              data: {
                xml: wordsContent
              },
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }).then(res => {
              if (res.data.code == 0) {
                this.$message.success("查看成功");
              } else {
                this.$message.error(res.data.msg);
              }
            }); */
        this.$message.success("成功");
      } else {
        this.$message.warning("失败");
      }
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  /* width:250px; */
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.header-user-con .collapse-btn button {
  background-color: transparent;
  font-size: 14px;
  /* border: 1px solid #fff; */
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 4px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-avator .el-icon-postcard {
  color: #67c23a;
  font-size: 24px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
