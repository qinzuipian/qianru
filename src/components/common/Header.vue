<template>
    <div class="header">
       
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">嵌入式医保系统</div>
        <div class="header-right">
            <div class="header-user-con">
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
                <div class="user-avator"><img src="static/img/img.jpg"></div>
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
          var requestId= "000";
          var akb020= "SYYY0010";
          var aab034= "61100001";
          var bkb026= "888888";
          var uscode= "999999";
          var usname= "超级管理员";
          var s_ini = 
            "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
            "\n" + 
            "<transferinfo>\n" + 
            "  <headinfo>\n" + 
            "    <REQUESTID>"+requestId+"</REQUESTID>\n" + 
            "    <AKB020>"+akb020+"</AKB020>\n" + 
            "    <AAB034>"+aab034+"</AAB034>\n" + 
            "    <BKB026>"+bkb026+"</BKB026>\n" + 
            "    <USCODE>"+uscode+"</USCODE>\n" + 
            "    <USNAME>"+usname+"</USNAME>\n" + 
            "    <DATACOUNT>0</DATACOUNT>\n" + 
            "    <ROWCOUNT1>0</ROWCOUNT1>\n" + 
            "    <ROWCOUNT2>0</ROWCOUNT2>\n" + 
            "    <ROWCOUNT3>0</ROWCOUNT3>\n" + 
            "    <ROWCOUNT4>0</ROWCOUNT4>\n" + 
            "    <ERRCODE>0</ERRCODE>\n" + 
            "    <ERRMSG></ERRMSG>\n" + 
            "  </headinfo> 　　\n" + 
            "</transferinfo>";
              if(s_ini==null || s_ini==""){
                    this.$message.warning("请求信息不能为空")
                    // alert("请求信息不能为空");
              }
              else{ 
            // alert("初始化成功")
            // var dll = new ActiveXObject("pansky.medicareinterface"); 
            // var state = dll.medicareinterfaceinit(s);
                console.log(s_ini);
                var	state = WSCall.init(s_ini);
                console.log(state); 
            if (state==1) {
              this.$message.success("初始化成功")
              // alert("初始化成功");
            }else{
              this.$message.error("初始化失败")
              // alert("初始化成功");
            }
          }        
        },
    loginOut() {
      this.$router.push({ path: "/login" });
      axios({
        method: "post",
        url: axios.PARK_API + "/sys-mgr/sys/logout",
        /*   params: {
           token: localStorage.getItem("token")
        }, */
        /*  data: {
          token: localStorage.getItem("token")
        }, */
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
            token: localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            localStorage.removeItem("token");
            localStorage.removeItem("navList");
            localStorage.removeItem("limited");
            // this.$router.push({ path: "/login" });
            if (this.limit == "1") {
              this.$router.push({ path: "/login" });
            } else if (this.limit == "2") {
              this.$router.push({ path: "/hoslogin" });
            }
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
  margin-left: 16px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
