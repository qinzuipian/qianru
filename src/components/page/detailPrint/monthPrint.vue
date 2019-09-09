<template>
    <div class="content">
        <div class="top">
            <span>下载年月：</span>
            <el-date-picker
              v-model="datetime"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
             <span>参保地：</span>
					   <el-input v-model="address"  placeholder="请输入内容"></el-input>
            <el-button  type="success" icon="el-icon-printer" style="margin-left: 10px;" @click="monthClick">打印</el-button>
        </div>   
		   
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      address:"",
      datetime:"",
      hospitalxml: ""
    };
  },
  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  methods: {

    monthClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          STARTOUTDT: this.datetime,
          AAB034: this.address,
          requestId: "921",

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
    },

    hosPrint(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
      } else {
        this.$message.error("打印失败");
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.top {
  padding: 10px;
}
.top span {
  font-size: 14px;
}
.top .el-input {
  width: 20%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
  /* margin-left: 10px; */
}
.botMain .el-icon-school {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
  margin-left: 10px;
}
.botMain .fzstyle {
  margin-left: 10px;
  font-size: 14px;
  color: #409eff;
}
</style>
