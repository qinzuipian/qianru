<template>
    <div class="content">
        <div class="top">
            <!-- <el-input style="width:180px;" placeholder="请输入个人具体信息" v-model="message"></el-input> -->
            <el-button type="primary" icon="el-icon-search" @click="peopleSearch">个人信息查询</el-button>
        </div>
    <!--<el-table
            :data="peopleData"
            border
            style="width: 100%">
            <el-table-column
            prop="AAC001"
            label="个人编号">
            </el-table-column>
            <el-table-column
            prop="AAB034"
            label="经办机构代码">
            </el-table-column>
            <el-table-column
            prop="BAA001"
            label="数据分区编号">
            </el-table-column>
            <el-table-column
            prop="AAB001"
            label="单位编号">
            </el-table-column>
            <el-table-column
            prop="AAB004"
            label="单位名称">
            </el-table-column>
            <el-table-column
            prop="AAC002"
            label="公民身份号码">
            </el-table-column>
            <el-table-column
            prop="AAC003"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="AAC004"
            label="性别">
            </el-table-column>
            <el-table-column
            prop="AAC005"
            label="民族">
            </el-table-column>
            <el-table-column
            prop="AAC006"
            label="出生日期">
            </el-table-column>
            <el-table-column
            prop="AKC020"
            label="IC卡号">
            </el-table-column>
            <el-table-column
            prop="AKC021"
            label="医疗人员类别">
            </el-table-column>
            <el-table-column
            prop="AKC401"
            label="医疗照顾人员标志">
            </el-table-column>
            <el-table-column
            prop="BAC515"
            label="公务员类别">
            </el-table-column>
            <el-table-column
            prop="AAC008"
            label="人员状态">
            </el-table-column>
            <el-table-column
            prop="BKC276"
            label="帐户余额">
            </el-table-column>
            <el-table-column
            prop="BKC255"
            label="本年度累计住院次数">
            </el-table-column>
            <el-table-column
            prop="BKC258"
            label="本年度累计统筹支付">
            </el-table-column>
            <el-table-column
            prop="BKC058"
            label="本年大额慢性病余额">
            </el-table-column>
      </el-table> -->

        <table class="printTable" cellspacing="0" cellpadding="1" style="margin:0 auto;">
           
            <tr>
              <td>姓名</td>
              <td>{{peopleData.AAC003}}</td>
              <td>身份号码</td>
              <td>{{peopleData.AAC002}}</td>        
              <td>性别</td>
              <td>{{peopleData.AAC004}}</td>
              <td>民族</td>
              <td>{{peopleData.AAC005}}</td>
            </tr>
            <tr>
              <td>个人编码</td>
              <td>{{peopleData.AAC001}}</td>
              <td>经办机构代码</td>
              <td>{{peopleData.AAB034}}</td>
              <td>单位编号</td>
              <td>{{peopleData.AAB001}}</td>
              <td>单位名称</td>
              <td>{{peopleData.AAB004}}</td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{peopleData.AAC006}}</td>
              <td>IC卡号</td>
              <td>{{peopleData.AKC020}}</td>
              <td>医疗人员类别</td>
              <td>{{peopleData.AKC021}}</td>
              <td>医疗照顾人员标志</td>
              <td>{{peopleData.AKC401}}</td>
            </tr>
            <tr>
              <td>公务员类别</td>
              <td>{{peopleData.BAC515}}</td>
              <td>人员状态</td>
              <td>{{peopleData.AAC008}}</td>
              <td>帐户余额</td>
              <td>{{peopleData.BKC276}}</td>
              <td>累计住院次数</td>
              <td>{{peopleData.BKC255}}</td>
            </tr>
            <tr>
              <td>累计统筹支付</td>
              <td>{{peopleData.BKC258}}</td>
              <td>大额慢性病余额</td>
              <td>{{peopleData.BKC058}}</td>
              <td>数据分区编号</td>
              <td>{{peopleData.BAA001}}</td>
              <td></td>
              <td></td>
            </tr>
        </table>

    </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "",
      // peopleData: [],
      peopleData: {}
    };
  },
  methods: {
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

        var wordsContent = encodeURIComponent(res);
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
        });
      } else {
        this.$message.warning("查看失败");
      }
    }
  },
  created() {}
};
</script>



<style scoped>
.top {
  padding: 10px;
  width: 100%;
}
.printTable {
  width: 100%;
  font-size: 14px;
  padding: 16px;
}
.printTable tr td {
  text-align: center;
  height: 34px;
  border-bottom: 1px solid gray;
  border-right: 1px solid gray;
}
.printTable tr:nth-child(1) td {
  border-top: 1px solid gray;
}

.printTable tr td:nth-child(1) {
  border-left: 1px solid gray;
}
.printTable tr td:nth-child(1),
.printTable tr td:nth-child(3),
.printTable tr td:nth-child(5),
.printTable tr td:nth-child(7) {
  font-weight: 700;
  width: 120px;
  color: gray;
}
</style>

