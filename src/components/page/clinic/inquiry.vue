<template>
    <div class="content">
      	<div class="top">
						<span>门诊号：</span>
						<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
            <!-- <el-button type="success" @click="gitHosave">门诊结算保存</el-button> -->
             <el-button type="primary" class="el-icon-printer" @click="gitHosave">打印</el-button>
				</div>
       
        <div id="print">
            <!-- <h3 style="text-align: center;">门诊费用支出结算表</h3> -->
            <p style="text-align: center;">入院登记信息表</p>
            <table class='printTable'  border="0" cellspacing="0" cellpadding="1" style="margin:0 auto;">
                <tr>
                  <td>就医流水号</td>
                  <td>{{hosdata.AKC190}}</td>
                  <td>就医类别</td>
                  <td>{{hosdata.AKA130}}</td>
                  <td>所属经办机构</td>
                  <td>{{hosdata.AAB034}}</td>
                  <td>险种</td>
                  <td>{{hosdata.AAE140}}</td>              
                </tr>
              
            </table>
            <!-- <p style="text-align: center;">费用明细表</p>
            <table class='printTable'  border="0" cellspacing="0" cellpadding="1" style="margin: auto">
                  <tr>
                    <td>患者:</td>
                    <td></td>
                    <td>就医流水号:</td>
                    <td></td>
                    <td>就医类别:</td>
                    <td></td>
                    <td>所属经办机构:</td>
                    <td></td>
                    <td>险种:</td>
                    <td></td>
                    
                  </tr>
                  <tr>
                    <td>就医流水号:</td>
                    <td></td>
                    <td>就医类别:</td>
                    <td></td>
                    <td>所属经办机构:</td>
                    <td></td>
                    <td>险种:</td>
                    <td></td>
                    <td>患者:</td>
                    <td></td>
                  </tr>

            </table> -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "inquiry",
  data() {
    return {
      hospitalNum: "",
      hosdata: {},
      hospitalxml: ""
    };
  },
  watch: {},
  filters: {},
  methods: {
    //请求list
    gitHospitlaMsg() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/settlementcostinfo/queryCostInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      }).then(res => {
        if (res.data.code == 0) {
          this.hosdata = res.data.data;

          /*this.AAB034 =hosdata.AAB034;
              this.AKC190 = hosdata.AKC190;
              this.AKA130 = hosdata.AKA130;
              this.AAE140 = hosdata.AAE140; */
        } else if (res.data.code == 203) {
          this.$message.warning(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    gitHosave() {
      /*   if(this.AKA130 == undefined) {
        this.AKA130 = "";
      } */
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AAB034: this.hosdata.AAB034,
          AKC190: this.hosdata.AKC190,
          AKA130: this.hosdata.AKA130,
          AAE140: this.hosdata.AAE140,
          requestId: "918",

          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.hospitalxml = res.data.data;
          this.hosPrint(this.hospitalxml);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
    },
    // 点击打印按钮调用打印函数
    hosPrint(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state)
      if (state == 1) {
        var res = WSCall.retbiz;
      } else {
        this.$message.error('门诊结算打印失败')
      }
    }
  },
  created() {},
  components: {}
};
</script>

<style scoped>
.top {
  padding: 10px;
}
.top .el-input {
  width: 20%;
}
.top span {
  font-size: 14px;
}
.content button {
  margin: 10px 0 0 10px;
}
#print {
  padding: 10px;
}
#print h3 {
  text-align: center;
  padding: 0;
  margin: 0;
  color: gray;
  font-size: 18px;
}
#print p {
  text-align: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: #eee;
}
#print .printTable {
  width: 100%;
  font-size: 14px;
}
#print .printTable tr td {
  text-align: center;
  width: 120px;
  height: 32px;
  border: 1px solid gray;
}
</style>

