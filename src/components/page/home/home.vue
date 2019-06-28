<template>
    <div class="main">
      <p>首页基本信息</p>
      <p>嵌入式医保管理系统</p>
      <p>欢迎！系统管理员</p>          
    </div>   
</template>


<script>
import axios from "axios";
// let echarts = require("echarts");
export default {
  data() {
    return {};
  },
  methods: {
    initConnection() {//嵌入式医保初始化
      //初始化连接所需参数
      var requestId= "000";
      var  akb020 = localStorage.getItem("akb020");
      var  bkb026 = localStorage.getItem("bkb026");
      var  aab034 = localStorage.getItem("aab034");
      var  uscode = localStorage.getItem("uscode");
      var  usname = localStorage.getItem("usname");
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
        if (state == 1) {
           this.$message.success("初始化成功")
          // alert("初始化成功");
        }else{
           this.$message.error("初始化失败")
          // alert("初始化成功");
        }
      }        
    }
  },
  mounted() {
   
  },
  created() {
    this.initConnection();
  }
};
</script>


<style scoped>
.main {
/*   width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #edf4f5; */
  text-align: center;
  margin-top:50px;
  font-size: 30px;
  color: aquamarine;
  width: 94%;
  height: 200px;
  margin: 30px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.main p:nth-child(1) {
    color: #999;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid #ccc;
    background-color: #F5F5F5;
    padding: 0;
    margin: 0;
    height:40px;
    line-height: 40px;
    border-radius: 8px 8px 0 0;
    padding-left: 10px;
}
.main p:nth-child(2) {
    font-size: 20px;
    color: #999;
}
::-webkit-scrollbar {
  display: none;
}
/* .main span {
  margin-left: 10px;
} */










</style>
